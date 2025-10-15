export type AdMediaType = 'image' | 'video' | 'carousel';
export type AdQualityTier = 'gold' | 'silver' | 'bronze';

export interface Ad {
  id: string;
  facebook_ad_id: string;
  title: string;
  description?: string;
  headline?: string;
  call_to_action?: string;
  media_type: AdMediaType;
  image_url?: string;
  video_url?: string;
  thumbnail_url?: string;
  landing_page_url?: string;
  landing_page_domain?: string;
  category_id?: string;
  niche_id?: string;
  country_code: string;
  country_name?: string;
  language_code?: string;
  estimated_daily_spend?: number;
  days_running?: number;
  estimated_total_spend?: number;
  performance_score?: number;
  engagement_rate?: number;
  quality_tier: AdQualityTier;
  is_validated: boolean;
  validated_by?: string;
  validated_at?: Date;
  validation_notes?: string;
  is_active: boolean;
  is_featured: boolean;
  views_count: number;
  favorites_count: number;
  first_seen_date?: Date;
  last_seen_date?: Date;
  scraped_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface AdWithRelations extends Ad {
  category_name?: string;
  niche_name?: string;
  flag_emoji?: string;
}

