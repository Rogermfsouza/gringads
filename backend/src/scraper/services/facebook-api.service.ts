import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosError } from 'axios';
import { FacebookConfigService } from '../../config/facebook.config';
import { FacebookRateLimiterService } from './facebook-rate-limiter.service';
import { FacebookApiResponse, FacebookAdDto, SearchParamsDto } from '../dto/facebook-ad.dto';

@Injectable()
export class FacebookApiService {
  private axiosInstance: AxiosInstance;
  private rateLimiter: FacebookRateLimiterService;
  private readonly apiUrl: string;
  private readonly accessToken: string;

  constructor(
    private facebookConfig: FacebookConfigService,
    private configService: ConfigService,
  ) {
    const config = this.facebookConfig.getConfig();
    this.apiUrl = this.facebookConfig.getApiUrl();
    this.accessToken = config.accessToken;

    this.rateLimiter = new FacebookRateLimiterService(
      config.requestsPerHour,
      config.scraperDelayMs,
    );

    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      timeout: 30000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.response.use(
      (response) => {
        this.rateLimiter.trackResponse(response.headers);
        return response;
      },
      async (error: AxiosError) => {
        const config = error.config as any;
        config.retryCount = config.retryCount || 0;

        console.error('❌ Erro na API do Facebook:', {
          status: error.response?.status,
          message: error.response?.data || error.message,
          url: error.config?.url,
        });

        if (error.response?.status === 429 && config.retryCount < 2) {
          console.error('❌ Rate limit excedido! Aguardando 1 minuto...');
          config.retryCount++;
          await this.sleep(60000);
          return this.axiosInstance.request(config);
        }

        if ((error.response?.status === 500 || error.response?.status === 503) && config.retryCount < 3) {
          console.warn(`⚠️ Erro do servidor Facebook. Tentativa ${config.retryCount + 1}/3...`);
          config.retryCount++;
          await this.sleep(5000);
          return this.axiosInstance.request(config);
        }

        if (error.response?.status === 400 || error.response?.status === 401 || error.response?.status === 403) {
          console.error('❌ ERRO DE AUTENTICAÇÃO/PERMISSÃO:');
          console.error('   Status:', error.response?.status);
          console.error('   Mensagem:', error.response?.data);
          console.error('   💡 Verifique se o FACEBOOK_ACCESS_TOKEN é válido e tem permissões: ads_read');
        }

        throw error;
      },
    );
  }

  async searchAds(params: SearchParamsDto): Promise<FacebookAdDto[]> {
    await this.rateLimiter.checkAndWait();

    const minDate = params.ad_delivery_date_min || this.getDateDaysAgo(
      this.configService.get<number>('MIN_DAYS_RUNNING', 4),
    );

    const queryParams = {
      access_token: this.accessToken,
      ad_active_status: params.ad_active_status || 'ACTIVE',
      ad_delivery_date_min: minDate,
      ad_reached_countries: JSON.stringify(params.ad_reached_countries),
      fields: [
        'id',
        'ad_creation_time',
        'ad_creative_bodies',
        'ad_creative_link_captions',
        'ad_creative_link_descriptions',
        'ad_creative_link_titles',
        'ad_delivery_start_time',
        'ad_delivery_stop_time',
        'ad_snapshot_url',
        'page_id',
        'page_name',
        'publisher_platforms',
        'languages',
        'spend',
        'impressions',
      ].join(','),
      limit: params.limit || 100,
    };

    if (params.search_terms) {
      queryParams['search_terms'] = params.search_terms;
    }

    if (params.media_type) {
      queryParams['media_type'] = params.media_type;
    }

    if (params.publisher_platforms) {
      queryParams['publisher_platforms'] = JSON.stringify(params.publisher_platforms);
    }

    if (params.languages) {
      queryParams['languages'] = JSON.stringify(params.languages);
    }

    if (params.after) {
      queryParams['after'] = params.after;
    }

    try {
      console.log('🔍 Buscando anúncios no Facebook Ads Library...');
      
      const response = await this.axiosInstance.get<FacebookApiResponse>('/ads_archive', {
        params: queryParams,
      });

      console.log(`✅ Encontrados ${response.data.data?.length || 0} anúncios`);

      return response.data.data || [];
    } catch (error) {
      console.error('❌ Erro ao buscar anúncios:', this.getErrorMessage(error));
      throw error;
    }
  }

  async searchAdsWithPagination(
    params: SearchParamsDto,
    maxPages: number = 5,
  ): Promise<FacebookAdDto[]> {
    const allAds: FacebookAdDto[] = [];
    let currentPage = 0;
    let nextCursor: string | undefined = undefined;

    while (currentPage < maxPages) {
      try {
        const searchParams = { ...params };
        if (nextCursor) {
          searchParams.after = nextCursor;
        }

        await this.rateLimiter.checkAndWait();

        const response = await this.axiosInstance.get<FacebookApiResponse>('/ads_archive', {
          params: this.buildQueryParams(searchParams),
        });

        const ads = response.data.data || [];
        allAds.push(...ads);

        console.log(`📄 Página ${currentPage + 1}: ${ads.length} anúncios`);

        if (!response.data.paging?.next || !response.data.paging?.cursors?.after) {
          console.log('✅ Última página alcançada');
          break;
        }

        nextCursor = response.data.paging.cursors.after;
        currentPage++;
      } catch (error) {
        console.error(`❌ Erro na página ${currentPage + 1}:`, this.getErrorMessage(error));
        break;
      }
    }

    console.log(`✅ Total de anúncios coletados: ${allAds.length}`);
    return allAds;
  }

  private buildQueryParams(params: SearchParamsDto): any {
    const minDate = params.ad_delivery_date_min || this.getDateDaysAgo(
      this.configService.get<number>('MIN_DAYS_RUNNING', 4),
    );

    const queryParams: any = {
      access_token: this.accessToken,
      ad_active_status: params.ad_active_status || 'ACTIVE',
      ad_delivery_date_min: minDate,
      ad_reached_countries: JSON.stringify(params.ad_reached_countries),
      fields: [
        'id',
        'ad_creation_time',
        'ad_creative_bodies',
        'ad_creative_link_captions',
        'ad_creative_link_descriptions',
        'ad_creative_link_titles',
        'ad_delivery_start_time',
        'ad_delivery_stop_time',
        'ad_snapshot_url',
        'page_id',
        'page_name',
        'publisher_platforms',
        'languages',
        'spend',
        'impressions',
      ].join(','),
      limit: params.limit || 100,
    };

    if (params.search_terms) {
      queryParams.search_terms = params.search_terms;
    }

    if (params.media_type) {
      queryParams.media_type = params.media_type;
    }

    if (params.publisher_platforms) {
      queryParams.publisher_platforms = JSON.stringify(params.publisher_platforms);
    }

    if (params.languages) {
      queryParams.languages = JSON.stringify(params.languages);
    }

    if (params.after) {
      queryParams.after = params.after;
    }

    return queryParams;
  }

  getRateLimitStatus() {
    return this.rateLimiter.getStatus();
  }

  private getDateDaysAgo(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  }

  private getErrorMessage(error: any): string {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.error?.message || error.message;
    }
    return error.message || 'Erro desconhecido';
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

