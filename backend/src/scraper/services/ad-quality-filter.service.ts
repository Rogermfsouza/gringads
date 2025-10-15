import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FacebookAdDto } from '../dto/facebook-ad.dto';
import { CreateAdDto } from '../../ads/dto/create-ad.dto';

interface QualityScore {
  score: number;
  tier: 'gold' | 'silver' | 'bronze';
  reasons: string[];
}

@Injectable()
export class AdQualityFilterService {
  constructor(private configService: ConfigService) {}

  calculateQualityScore(ad: FacebookAdDto, daysRunning: number): QualityScore {
    let score = 0;
    const reasons: string[] = [];

    if (daysRunning >= 7) {
      score += 30;
      reasons.push('Rodando há 7+ dias');
    } else if (daysRunning >= 5) {
      score += 20;
      reasons.push('Rodando há 5+ dias');
    } else if (daysRunning >= 4) {
      score += 10;
      reasons.push('Rodando há 4+ dias');
    }

    if (ad.ad_creative_bodies && ad.ad_creative_bodies.length > 0) {
      const body = ad.ad_creative_bodies[0];
      if (body.length >= 50 && body.length <= 1000) {
        score += 15;
        reasons.push('Texto bem elaborado');
      }
    }

    if (ad.ad_creative_link_titles && ad.ad_creative_link_titles.length > 0) {
      score += 10;
      reasons.push('Possui título');
    }

    if (ad.ad_creative_link_descriptions && ad.ad_creative_link_descriptions.length > 0) {
      score += 10;
      reasons.push('Possui descrição');
    }

    if (ad.media_type === 'video') {
      score += 20;
      reasons.push('Contém vídeo');
    } else if (ad.ad_snapshot_url) {
      score += 10;
      reasons.push('Contém imagem');
    }

    if (ad.publisher_platforms) {
      const platforms = ad.publisher_platforms.length;
      if (platforms >= 2) {
        score += 10;
        reasons.push(`Veiculado em ${platforms} plataformas`);
      }
    }

    if (ad.spend) {
      const avgSpend = this.getAverageSpend(ad.spend);
      if (avgSpend && avgSpend >= 100) {
        score += 15;
        reasons.push('Gasto alto estimado');
      } else if (avgSpend && avgSpend >= 50) {
        score += 10;
        reasons.push('Gasto médio estimado');
      }
    }

    if (ad.impressions) {
      const avgImpressions = this.getAverageImpressions(ad.impressions);
      if (avgImpressions && avgImpressions >= 10000) {
        score += 10;
        reasons.push('Alto número de impressões');
      }
    }

    const goldThreshold = this.configService.get<number>('GOLD_SCORE_THRESHOLD', 80);
    const silverThreshold = this.configService.get<number>('SILVER_SCORE_THRESHOLD', 60);

    let tier: 'gold' | 'silver' | 'bronze' = 'bronze';
    if (score >= goldThreshold) {
      tier = 'gold';
    } else if (score >= silverThreshold) {
      tier = 'silver';
    }

    return { score, tier, reasons };
  }

  filterQualityAds(ads: FacebookAdDto[]): FacebookAdDto[] {
    const minDaysRunning = this.configService.get<number>('MIN_DAYS_RUNNING', 4);

    return ads.filter((ad) => {
      const daysRunning = this.calculateDaysRunning(ad);
      
      if (daysRunning < minDaysRunning) {
        return false;
      }

      if (!ad.ad_creative_bodies || ad.ad_creative_bodies.length === 0) {
        return false;
      }

      if (!ad.ad_snapshot_url) {
        return false;
      }

      return true;
    });
  }

  transformToCreateAdDto(facebookAd: FacebookAdDto): CreateAdDto {
    const daysRunning = this.calculateDaysRunning(facebookAd);
    const qualityScore = this.calculateQualityScore(facebookAd, daysRunning);
    
    const title = this.extractTitle(facebookAd);
    const description = this.extractDescription(facebookAd);
    const headline = facebookAd.ad_creative_link_titles?.[0] || '';
    
    const countryCode = this.extractCountryCode(facebookAd);
    const languageCode = facebookAd.languages?.[0] || 'en';
    
    const mediaType = this.determineMediaType(facebookAd);
    
    const estimatedDailySpend = this.getAverageSpend(facebookAd.spend);
    const estimatedTotalSpend = estimatedDailySpend ? estimatedDailySpend * daysRunning : undefined;

    return {
      facebook_ad_id: facebookAd.id,
      title,
      description,
      headline,
      call_to_action: this.extractCallToAction(facebookAd),
      media_type: mediaType,
      image_url: mediaType === 'image' ? facebookAd.ad_snapshot_url : undefined,
      video_url: mediaType === 'video' ? facebookAd.ad_snapshot_url : undefined,
      thumbnail_url: facebookAd.ad_snapshot_url,
      landing_page_url: this.extractLandingPageUrl(facebookAd),
      landing_page_domain: undefined,
      country_code: countryCode,
      country_name: undefined,
      language_code: languageCode,
      estimated_daily_spend: estimatedDailySpend,
      days_running: daysRunning,
      estimated_total_spend: estimatedTotalSpend,
      performance_score: qualityScore.score,
      engagement_rate: undefined,
      quality_tier: qualityScore.tier,
      is_validated: false,
      is_active: true,
      first_seen_date: facebookAd.ad_delivery_start_time
        ? new Date(facebookAd.ad_delivery_start_time)
        : new Date(),
      last_seen_date: new Date(),
    };
  }

  private calculateDaysRunning(ad: FacebookAdDto): number {
    if (!ad.ad_delivery_start_time) {
      return 0;
    }

    const startDate = new Date(ad.ad_delivery_start_time);
    const endDate = ad.ad_delivery_stop_time
      ? new Date(ad.ad_delivery_stop_time)
      : new Date();

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  private extractTitle(ad: FacebookAdDto): string {
    if (ad.ad_creative_link_titles && ad.ad_creative_link_titles.length > 0) {
      return ad.ad_creative_link_titles[0].substring(0, 200);
    }
    
    if (ad.ad_creative_bodies && ad.ad_creative_bodies.length > 0) {
      return ad.ad_creative_bodies[0].substring(0, 200);
    }
    
    return `Anúncio ${ad.page_name || ad.id}`;
  }

  private extractDescription(ad: FacebookAdDto): string | undefined {
    if (ad.ad_creative_bodies && ad.ad_creative_bodies.length > 0) {
      return ad.ad_creative_bodies[0];
    }
    
    if (ad.ad_creative_link_descriptions && ad.ad_creative_link_descriptions.length > 0) {
      return ad.ad_creative_link_descriptions[0];
    }
    
    return undefined;
  }

  private extractCallToAction(ad: FacebookAdDto): string | undefined {
    if (ad.ad_creative_link_captions && ad.ad_creative_link_captions.length > 0) {
      return ad.ad_creative_link_captions[0];
    }
    return undefined;
  }

  private extractLandingPageUrl(ad: FacebookAdDto): string | undefined {
    return ad.ad_snapshot_url;
  }

  private extractCountryCode(ad: FacebookAdDto): string {
    return 'US';
  }

  private determineMediaType(ad: FacebookAdDto): 'image' | 'video' | 'carousel' {
    if (ad.media_type?.toLowerCase().includes('video')) {
      return 'video';
    }
    return 'image';
  }

  private getAverageSpend(spend?: { lower_bound?: string; upper_bound?: string }): number | undefined {
    if (!spend || !spend.lower_bound || !spend.upper_bound) {
      return undefined;
    }

    const lower = parseFloat(spend.lower_bound);
    const upper = parseFloat(spend.upper_bound);

    if (isNaN(lower) || isNaN(upper)) {
      return undefined;
    }

    return (lower + upper) / 2;
  }

  private getAverageImpressions(impressions?: { lower_bound?: string; upper_bound?: string }): number | undefined {
    if (!impressions || !impressions.lower_bound || !impressions.upper_bound) {
      return undefined;
    }

    const lower = parseFloat(impressions.lower_bound);
    const upper = parseFloat(impressions.upper_bound);

    if (isNaN(lower) || isNaN(upper)) {
      return undefined;
    }

    return (lower + upper) / 2;
  }
}

