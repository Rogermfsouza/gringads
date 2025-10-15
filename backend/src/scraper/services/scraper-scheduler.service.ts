import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { ScraperService } from './scraper.service';
import { ALL_COUNTRIES_EXCEPT_BR } from '../../common/constants';

@Injectable()
export class ScraperSchedulerService {
  private isRunning = false;
  private enableAutoCron: boolean;

  constructor(
    private scraperService: ScraperService,
    private configService: ConfigService,
  ) {
    this.enableAutoCron = this.configService.get<string>('ENABLE_AUTO_SCRAPING', 'false') === 'true';
    
    if (this.enableAutoCron) {
      console.log('✅ Cron jobs de scraping automático ATIVADOS');
    } else {
      console.log('⏸️  Cron jobs de scraping automático DESATIVADOS');
      console.log('   Para ativar, adicione ENABLE_AUTO_SCRAPING=true no .env');
    }
  }

  @Cron(CronExpression.EVERY_6_HOURS)
  async handleScrapingCron() {
    if (!this.enableAutoCron) {
      return;
    }
    if (this.isRunning) {
      console.log('⏭️ Scraping já está em execução. Pulando...');
      return;
    }

    this.isRunning = true;
    console.log('⏰ Iniciando scraping automático (a cada 6 horas)...');

    try {
      const result = await this.scraperService.scrapeAds(undefined, ALL_COUNTRIES_EXCEPT_BR);
      
      console.log('✅ Scraping automático concluído:');
      console.log(`   - Anúncios encontrados: ${result.adsFound}`);
      console.log(`   - Anúncios salvos: ${result.adsSaved}`);
      console.log(`   - Erros: ${result.errors.length}`);
    } catch (error) {
      console.error('❌ Erro no scraping automático:', error);
    } finally {
      this.isRunning = false;
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async handleDailyTopCountriesScraping() {
    if (!this.enableAutoCron) {
      return;
    }

    if (this.isRunning) {
      console.log('⏭️ Scraping já está em execução. Pulando...');
      return;
    }

    this.isRunning = true;
    console.log('⏰ Scraping diário dos principais países (2h da manhã)...');

    const topCountries = ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'ES', 'MX', 'IT', 'NL'];

    try {
      const result = await this.scraperService.scrapeAdsByCountries(topCountries);
      
      console.log('✅ Scraping diário concluído:');
      console.log(`   - Anúncios encontrados: ${result.adsFound}`);
      console.log(`   - Anúncios salvos: ${result.adsSaved}`);
    } catch (error) {
      console.error('❌ Erro no scraping diário:', error);
    } finally {
      this.isRunning = false;
    }
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      rateLimitStatus: this.scraperService.getRateLimitStatus(),
    };
  }
}

