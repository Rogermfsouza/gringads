import { Injectable } from '@nestjs/common';
import { SupabaseConfigService } from '../../config/supabase.config';
import { Ad, AdWithRelations } from '../entities/ad.entity';
import { CreateAdDto } from '../dto/create-ad.dto';
import { FilterAdsDto } from '../dto/filter-ads.dto';

@Injectable()
export class AdsRepository {
  constructor(private supabaseConfig: SupabaseConfigService) {}

  async create(createAdDto: CreateAdDto): Promise<Ad | null> {
    const supabase = this.supabaseConfig.getClient();

    const { data, error } = await supabase
      .from('ads')
      .insert([createAdDto])
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao criar anúncio:', error);
      throw new Error(`Erro ao criar anúncio: ${error.message}`);
    }

    return data;
  }

  async upsert(createAdDto: CreateAdDto): Promise<Ad | null> {
    const supabase = this.supabaseConfig.getClient();

    const { data, error } = await supabase
      .from('ads')
      .upsert(
        [createAdDto],
        {
          onConflict: 'facebook_ad_id',
          ignoreDuplicates: false,
        },
      )
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao fazer upsert do anúncio:', error);
      throw new Error(`Erro ao fazer upsert: ${error.message}`);
    }

    return data;
  }

  async findAll(filters: FilterAdsDto): Promise<{ data: AdWithRelations[]; total: number }> {
    const supabase = this.supabaseConfig.getClient();
    
    const limit = filters.limit || 20;
    const page = filters.page || 1;
    const offset = filters.offset ?? (page - 1) * limit;

    let query = supabase
      .from('ads')
      .select(`
        *,
        categories(name),
        niches(name),
        countries(name, flag_emoji)
      `, { count: 'exact' })
      .eq('is_active', true);

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,headline.ilike.%${filters.search}%`);
    }

    if (filters.country_code) {
      query = query.eq('country_code', filters.country_code);
    }

    if (filters.category_id) {
      query = query.eq('category_id', filters.category_id);
    }

    if (filters.niche_id) {
      query = query.eq('niche_id', filters.niche_id);
    }

    if (filters.quality_tier) {
      query = query.eq('quality_tier', filters.quality_tier);
    }

    if (filters.media_type) {
      query = query.eq('media_type', filters.media_type);
    }

    if (filters.is_featured !== undefined) {
      query = query.eq('is_featured', filters.is_featured);
    }

    if (filters.is_validated !== undefined) {
      query = query.eq('is_validated', filters.is_validated);
    }

    if (filters.min_days_running !== undefined) {
      query = query.gte('days_running', filters.min_days_running);
    }

    if (filters.min_performance_score !== undefined) {
      query = query.gte('performance_score', filters.min_performance_score);
    }

    const sortBy = filters.sort_by || 'created_at';
    const sortOrder = filters.sort_order || 'desc';
    
    const sortMap: { [key: string]: string } = {
      views: 'views_count',
      favorites: 'favorites_count',
      performance: 'performance_score',
      days_running: 'days_running',
      created_at: 'created_at',
    };

    query = query.order(sortMap[sortBy], { ascending: sortOrder === 'asc' });
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('❌ Erro ao buscar anúncios:', error);
      throw new Error(`Erro ao buscar anúncios: ${error.message}`);
    }

    const formattedData = data?.map(ad => ({
      ...ad,
      category_name: ad.categories?.name,
      niche_name: ad.niches?.name,
      country_name: ad.countries?.name,
      flag_emoji: ad.countries?.flag_emoji,
    })) || [];

    return {
      data: formattedData,
      total: count || 0,
    };
  }

  async findById(id: string): Promise<AdWithRelations | null> {
    const supabase = this.supabaseConfig.getClient();

    const { data, error } = await supabase
      .from('ads')
      .select(`
        *,
        categories(name),
        niches(name),
        countries(name, flag_emoji)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('❌ Erro ao buscar anúncio:', error);
      return null;
    }

    return {
      ...data,
      category_name: data.categories?.name,
      niche_name: data.niches?.name,
      country_name: data.countries?.name,
      flag_emoji: data.countries?.flag_emoji,
    };
  }

  async findByFacebookId(facebookAdId: string): Promise<Ad | null> {
    const supabase = this.supabaseConfig.getClient();

    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .eq('facebook_ad_id', facebookAdId)
      .single();

    if (error) {
      return null;
    }

    return data;
  }

  async findGold(limit: number = 50): Promise<AdWithRelations[]> {
    const supabase = this.supabaseConfig.getClient();

    const { data, error } = await supabase
      .from('ads_gold')
      .select('*')
      .limit(limit);

    if (error) {
      console.error('❌ Erro ao buscar anúncios gold:', error);
      return [];
    }

    return data || [];
  }

  async findTrending(limit: number = 50): Promise<AdWithRelations[]> {
    const supabase = this.supabaseConfig.getClient();

    const { data, error } = await supabase
      .from('ads_trending')
      .select('*')
      .limit(limit);

    if (error) {
      console.error('❌ Erro ao buscar trending:', error);
      return [];
    }

    return data || [];
  }

  async updateMetrics(id: string, metrics: Partial<Ad>): Promise<Ad | null> {
    const supabase = this.supabaseConfig.getClient();

    const { data, error } = await supabase
      .from('ads')
      .update(metrics)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao atualizar métricas:', error);
      return null;
    }

    return data;
  }

  async incrementViews(adId: string): Promise<void> {
    const supabase = this.supabaseConfig.getClient();

    const { error } = await supabase.rpc('increment_ad_views', { ad_id: adId });

    if (error) {
      console.error('❌ Erro ao incrementar views:', error);
    }
  }

  async validateAd(id: string, userId: string, notes?: string): Promise<Ad | null> {
    const supabase = this.supabaseConfig.getClient();

    const { data, error } = await supabase
      .from('ads')
      .update({
        is_validated: true,
        validated_by: userId,
        validated_at: new Date().toISOString(),
        validation_notes: notes,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao validar anúncio:', error);
      return null;
    }

    return data;
  }

  async getMetrics(): Promise<any> {
    const supabase = this.supabaseConfig.getClient();

    const [totalAds, goldAds, silverAds, bronzeAds] = await Promise.all([
      supabase.from('ads').select('id', { count: 'exact', head: true }),
      supabase.from('ads').select('id', { count: 'exact', head: true }).eq('quality_tier', 'gold'),
      supabase.from('ads').select('id', { count: 'exact', head: true }).eq('quality_tier', 'silver'),
      supabase.from('ads').select('id', { count: 'exact', head: true }).eq('quality_tier', 'bronze'),
    ]);

    return {
      total_ads: totalAds.count || 0,
      gold_ads: goldAds.count || 0,
      silver_ads: silverAds.count || 0,
      bronze_ads: bronzeAds.count || 0,
    };
  }

  async deleteById(id: string): Promise<boolean> {
    const supabase = this.supabaseConfig.getClient();

    const { error } = await supabase
      .from('ads')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('❌ Erro ao deletar anúncio:', error);
      return false;
    }

    return true;
  }
}

