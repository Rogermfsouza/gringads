import { Injectable } from '@nestjs/common';
import { FacebookApiService } from './facebook-api.service';
import { AdQualityFilterService } from './ad-quality-filter.service';
import { AdsRepository } from '../../ads/repositories/ads.repository';
import { SearchParamsDto } from '../dto/facebook-ad.dto';
import { ALL_COUNTRIES_EXCEPT_BR } from '../../common/constants';

export interface ScraperResult {
  success: boolean;
  adsFound: number;
  adsProcessed: number;
  adsSaved: number;
  errors: string[];
}

@Injectable()
export class ScraperService {
  constructor(
    private facebookApiService: FacebookApiService,
    private qualityFilterService: AdQualityFilterService,
    private adsRepository: AdsRepository,
  ) {}

  async scrapeAds(searchTerms?: string, countries?: string[]): Promise<ScraperResult> {
    const result: ScraperResult = {
      success: false,
      adsFound: 0,
      adsProcessed: 0,
      adsSaved: 0,
      errors: [],
    };

    try {
      console.log('🚀 Iniciando scraping de anúncios...');

      const searchParams: SearchParamsDto = {
        ad_active_status: 'ACTIVE',
        ad_reached_countries: countries || ALL_COUNTRIES_EXCEPT_BR,
        search_terms: searchTerms,
        limit: 100,
      };

      const facebookAds = await this.facebookApiService.searchAdsWithPagination(
        searchParams,
        3,
      );

      result.adsFound = facebookAds.length;
      console.log(`📊 Total de anúncios encontrados: ${facebookAds.length}`);

      const filteredAds = this.qualityFilterService.filterQualityAds(facebookAds);
      console.log(`✅ Anúncios após filtro de qualidade: ${filteredAds.length}`);

      for (const facebookAd of filteredAds) {
        try {
          const createAdDto = this.qualityFilterService.transformToCreateAdDto(facebookAd);

          await this.adsRepository.upsert(createAdDto);
          result.adsSaved++;
          result.adsProcessed++;

          if (result.adsProcessed % 10 === 0) {
            console.log(`💾 Processados: ${result.adsProcessed}/${filteredAds.length}`);
          }
        } catch (error) {
          result.errors.push(`Erro ao salvar anúncio ${facebookAd.id}: ${error.message}`);
          console.error(`❌ Erro ao processar anúncio ${facebookAd.id}:`, error.message);
        }
      }

      result.success = true;
      console.log('✅ Scraping concluído com sucesso!');
      console.log(`📊 Resumo: ${result.adsSaved} anúncios salvos de ${result.adsFound} encontrados`);

      return result;
    } catch (error) {
      result.success = false;
      result.errors.push(error.message);
      console.error('❌ Erro no scraping:', error);
      return result;
    }
  }

  async scrapeAdsByCountries(countries: string[]): Promise<ScraperResult> {
    return this.scrapeAds(undefined, countries);
  }

  async scrapeAdsBySearchTerm(searchTerm: string): Promise<ScraperResult> {
    return this.scrapeAds(searchTerm);
  }

  getRateLimitStatus() {
    return this.facebookApiService.getRateLimitStatus();
  }
}

