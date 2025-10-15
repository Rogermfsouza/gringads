import { Injectable } from '@nestjs/common';
import { AdsRepository } from './repositories/ads.repository';
import { CreateAdDto } from './dto/create-ad.dto';
import { FilterAdsDto } from './dto/filter-ads.dto';
import { AdWithRelations } from './entities/ad.entity';
import { AdsListResponseDto, AdResponseDto, AdMetricsDto } from './dto/ad-response.dto';

@Injectable()
export class AdsService {
  constructor(private adsRepository: AdsRepository) {}

  async create(createAdDto: CreateAdDto): Promise<AdResponseDto> {
    try {
      const ad = await this.adsRepository.create(createAdDto);
      return {
        success: true,
        data: ad as AdWithRelations,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async upsert(createAdDto: CreateAdDto): Promise<AdResponseDto> {
    try {
      const ad = await this.adsRepository.upsert(createAdDto);
      return {
        success: true,
        data: ad as AdWithRelations,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async findAll(filters: FilterAdsDto): Promise<AdsListResponseDto> {
    try {
      const { data, total } = await this.adsRepository.findAll(filters);
      
      const limit = filters.limit || 20;
      const page = filters.page || 1;
      const totalPages = Math.ceil(total / limit);

      return {
        success: true,
        data,
        pagination: {
          total,
          page,
          limit,
          totalPages,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async findById(id: string): Promise<AdResponseDto> {
    try {
      const ad = await this.adsRepository.findById(id);
      
      if (!ad) {
        return {
          success: false,
          error: 'Anúncio não encontrado',
        };
      }

      return {
        success: true,
        data: ad,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async findGold(limit?: number): Promise<AdsListResponseDto> {
    try {
      const data = await this.adsRepository.findGold(limit);
      
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async findTrending(limit?: number): Promise<AdsListResponseDto> {
    try {
      const data = await this.adsRepository.findTrending(limit);
      
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async registerView(adId: string, userId: string): Promise<{ success: boolean; message?: string }> {
    try {
      await this.adsRepository.incrementViews(adId);
      
      return {
        success: true,
        message: 'Visualização registrada',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async validateAd(id: string, userId: string, notes?: string): Promise<AdResponseDto> {
    try {
      const ad = await this.adsRepository.validateAd(id, userId, notes);
      
      if (!ad) {
        return {
          success: false,
          error: 'Erro ao validar anúncio',
        };
      }

      return {
        success: true,
        data: ad as AdWithRelations,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getMetrics(): Promise<{ success: boolean; data?: AdMetricsDto; error?: string }> {
    try {
      const metrics = await this.adsRepository.getMetrics();
      
      return {
        success: true,
        data: metrics,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async deleteById(id: string): Promise<{ success: boolean; message?: string }> {
    try {
      const deleted = await this.adsRepository.deleteById(id);
      
      if (!deleted) {
        return {
          success: false,
          message: 'Erro ao deletar anúncio',
        };
      }

      return {
        success: true,
        message: 'Anúncio deletado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

