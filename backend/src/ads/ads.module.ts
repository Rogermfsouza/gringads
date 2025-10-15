import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { AdsRepository } from './repositories/ads.repository';
import { SupabaseConfigService } from '../config/supabase.config';

@Module({
  controllers: [AdsController],
  providers: [AdsService, AdsRepository, SupabaseConfigService],
  exports: [AdsService, AdsRepository],
})
export class AdsModule {}

