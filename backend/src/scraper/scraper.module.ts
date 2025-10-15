import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScraperController } from './scraper.controller';
import { ScraperService } from './services/scraper.service';
import { FacebookApiService } from './services/facebook-api.service';
import { AdQualityFilterService } from './services/ad-quality-filter.service';
import { ScraperSchedulerService } from './services/scraper-scheduler.service';
import { FacebookConfigService } from '../config/facebook.config';
import { AdsRepository } from '../ads/repositories/ads.repository';
import { SupabaseConfigService } from '../config/supabase.config';

@Module({
  imports: [ConfigModule],
  controllers: [ScraperController],
  providers: [
    ScraperService,
    FacebookApiService,
    AdQualityFilterService,
    ScraperSchedulerService,
    FacebookConfigService,
    AdsRepository,
    SupabaseConfigService,
  ],
  exports: [ScraperService],
})
export class ScraperModule {}

