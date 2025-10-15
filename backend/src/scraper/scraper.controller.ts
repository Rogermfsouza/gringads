import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ScraperService, ScraperResult } from './services/scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Post('run')
  async runScraper(
    @Body('searchTerms') searchTerms?: string,
    @Body('countries') countries?: string[],
  ): Promise<ScraperResult> {
    return this.scraperService.scrapeAds(searchTerms, countries);
  }

  @Post('run-by-country')
  async runScraperByCountry(@Body('countries') countries: string[]): Promise<ScraperResult> {
    return this.scraperService.scrapeAdsByCountries(countries);
  }

  @Post('run-by-search')
  async runScraperBySearch(@Query('term') searchTerm: string): Promise<ScraperResult> {
    return this.scraperService.scrapeAdsBySearchTerm(searchTerm);
  }

  @Get('status')
  async getStatus() {
    return {
      success: true,
      rateLimit: this.scraperService.getRateLimitStatus(),
    };
  }
}

