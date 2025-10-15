import { Controller, Get, Post, Delete, Param, Query, Body, ValidationPipe } from '@nestjs/common';
import { AdsService } from './ads.service';
import { FilterAdsDto } from './dto/filter-ads.dto';
import { CreateAdDto } from './dto/create-ad.dto';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Get()
  async findAll(@Query(ValidationPipe) filters: FilterAdsDto) {
    return this.adsService.findAll(filters);
  }

  @Get('gold')
  async findGold(@Query('limit') limit?: number) {
    return this.adsService.findGold(limit);
  }

  @Get('trending')
  async findTrending(@Query('limit') limit?: number) {
    return this.adsService.findTrending(limit);
  }

  @Get('metrics')
  async getMetrics() {
    return this.adsService.getMetrics();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.adsService.findById(id);
  }

  @Post()
  async create(@Body(ValidationPipe) createAdDto: CreateAdDto) {
    return this.adsService.create(createAdDto);
  }

  @Post('upsert')
  async upsert(@Body(ValidationPipe) createAdDto: CreateAdDto) {
    return this.adsService.upsert(createAdDto);
  }

  @Post(':id/view')
  async registerView(@Param('id') id: string, @Body('userId') userId: string) {
    return this.adsService.registerView(id, userId);
  }

  @Post(':id/validate')
  async validateAd(
    @Param('id') id: string,
    @Body('userId') userId: string,
    @Body('notes') notes?: string,
  ) {
    return this.adsService.validateAd(id, userId, notes);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.adsService.deleteById(id);
  }
}

