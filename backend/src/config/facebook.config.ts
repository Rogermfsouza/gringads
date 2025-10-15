import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface FacebookConfig {
  accessToken: string;
  appId: string;
  appSecret: string;
  requestsPerHour: number;
  scraperDelayMs: number;
  apiVersion: string;
  baseUrl: string;
}

@Injectable()
export class FacebookConfigService {
  private config: FacebookConfig;

  constructor(private configService: ConfigService) {
    const accessToken = this.configService.get<string>(
      'FACEBOOK_ACCESS_TOKEN',
    );
    const appId = this.configService.get<string>('FACEBOOK_APP_ID');
    const appSecret = this.configService.get<string>('FACEBOOK_APP_SECRET');

    if (!accessToken || !appId || !appSecret) {
      throw new Error(
        '❌ Variáveis do Facebook (ACCESS_TOKEN, APP_ID, APP_SECRET) devem estar no .env',
      );
    }

    this.config = {
      accessToken,
      appId,
      appSecret,
      requestsPerHour: this.configService.get<number>(
        'FACEBOOK_REQUESTS_PER_HOUR',
        200,
      ),
      scraperDelayMs: this.configService.get<number>('SCRAPER_DELAY_MS', 3000),
      apiVersion: 'v21.0',
      baseUrl: 'https://graph.facebook.com',
    };

    console.log('✅ Facebook config carregado!');
    console.log(`   → Limite: ${this.config.requestsPerHour} req/hora`);
    console.log(`   → Delay: ${this.config.scraperDelayMs}ms entre requests`);
  }

  getConfig(): FacebookConfig {
    return this.config;
  }

  getAccessToken(): string {
    return this.config.accessToken;
  }

  getApiUrl(): string {
    return `${this.config.baseUrl}/${this.config.apiVersion}`;
  }

  getRateLimit(): {
    requestsPerHour: number;
    delayMs: number;
    delaySeconds: number;
  } {
    return {
      requestsPerHour: this.config.requestsPerHour,
      delayMs: this.config.scraperDelayMs,
      delaySeconds: this.config.scraperDelayMs / 1000,
    };
  }
}

