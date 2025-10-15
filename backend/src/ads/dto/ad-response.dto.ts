import { Ad, AdWithRelations } from '../entities/ad.entity';

export class AdResponseDto {
  success: boolean;
  data?: AdWithRelations;
  error?: string;
}

export class AdsListResponseDto {
  success: boolean;
  data?: AdWithRelations[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  error?: string;
}

export class AdMetricsDto {
  total_ads: number;
  gold_ads: number;
  silver_ads: number;
  bronze_ads: number;
  total_views: number;
  total_favorites: number;
  countries_count: number;
  categories_count: number;
}

