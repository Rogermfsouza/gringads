import { IsString, IsOptional, IsEnum, IsNumber, IsBoolean, IsUrl, Min, Max } from 'class-validator';

export class CreateAdDto {
  @IsString()
  facebook_ad_id: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  headline?: string;

  @IsOptional()
  @IsString()
  call_to_action?: string;

  @IsEnum(['image', 'video', 'carousel'])
  media_type: 'image' | 'video' | 'carousel';

  @IsOptional()
  @IsUrl()
  image_url?: string;

  @IsOptional()
  @IsUrl()
  video_url?: string;

  @IsOptional()
  @IsUrl()
  thumbnail_url?: string;

  @IsOptional()
  @IsUrl()
  landing_page_url?: string;

  @IsOptional()
  @IsString()
  landing_page_domain?: string;

  @IsOptional()
  @IsString()
  category_id?: string;

  @IsOptional()
  @IsString()
  niche_id?: string;

  @IsString()
  country_code: string;

  @IsOptional()
  @IsString()
  country_name?: string;

  @IsOptional()
  @IsString()
  language_code?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  estimated_daily_spend?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  days_running?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  estimated_total_spend?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  performance_score?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  engagement_rate?: number;

  @IsEnum(['gold', 'silver', 'bronze'])
  quality_tier: 'gold' | 'silver' | 'bronze';

  @IsOptional()
  @IsBoolean()
  is_validated?: boolean;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  first_seen_date?: Date;

  @IsOptional()
  last_seen_date?: Date;
}

