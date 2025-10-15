import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseConfigService } from './config/supabase.config';
import { FacebookConfigService } from './config/facebook.config';
import { AdsModule } from './ads/ads.module';
import { ScraperModule } from './scraper/scraper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),
    ScheduleModule.forRoot(),
    AdsModule,
    ScraperModule,
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseConfigService, FacebookConfigService],
  exports: [SupabaseConfigService, FacebookConfigService],
})
export class AppModule {}
