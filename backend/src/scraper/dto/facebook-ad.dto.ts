export interface FacebookAdDto {
  id: string;
  ad_creation_time?: string;
  ad_creative_bodies?: string[];
  ad_creative_link_captions?: string[];
  ad_creative_link_descriptions?: string[];
  ad_creative_link_titles?: string[];
  ad_delivery_start_time?: string;
  ad_delivery_stop_time?: string;
  ad_snapshot_url?: string;
  page_id?: string;
  page_name?: string;
  publisher_platforms?: string[];
  languages?: string[];
  media_type?: string;
  currency?: string;
  spend?: {
    lower_bound?: string;
    upper_bound?: string;
  };
  impressions?: {
    lower_bound?: string;
    upper_bound?: string;
  };
}

export interface FacebookApiResponse {
  data: FacebookAdDto[];
  paging?: {
    cursors?: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

export interface SearchParamsDto {
  ad_active_status?: 'ACTIVE' | 'ALL' | 'INACTIVE';
  ad_delivery_date_min?: string;
  ad_delivery_date_max?: string;
  ad_reached_countries: string[];
  search_terms?: string;
  media_type?: 'ALL' | 'IMAGE' | 'VIDEO' | 'MEME' | 'NONE';
  publisher_platforms?: string[];
  languages?: string[];
  limit?: number;
  after?: string;
}

