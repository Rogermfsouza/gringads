import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseConfigService {
  private supabaseClient: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        '❌ SUPABASE_URL e SUPABASE_KEY devem estar definidos no .env',
      );
    }

    this.supabaseClient = createClient(supabaseUrl, supabaseKey);

    console.log('✅ Supabase conectado com sucesso!');
  }

  getClient(): SupabaseClient {
    return this.supabaseClient;
  }

  async testConnection(): Promise<boolean> {
    try {
      const { error } = await this.supabaseClient
        .from('users')
        .select('count')
        .limit(1);

      if (error) {
        console.error('❌ Erro ao conectar Supabase:', error.message);
        return false;
      }

      console.log('✅ Conexão Supabase testada com sucesso!');
      return true;
    } catch (error) {
      console.error('❌ Erro ao testar conexão:', error);
      return false;
    }
  }
}