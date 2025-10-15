import { Injectable, OnModuleInit } from '@nestjs/common';
import { SupabaseConfigService } from './config/supabase.config';
import { FacebookConfigService } from './config/facebook.config';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private supabaseConfig: SupabaseConfigService,
    private facebookConfig: FacebookConfigService,
  ) {}

  async onModuleInit() {
    console.log('\n🚀 Iniciando aplicação Gringads...\n');

    await this.testSupabase();
    this.testFacebook();
  }

  async testSupabase() {
    console.log('📊 Testando conexão Supabase...');
    const isConnected = await this.supabaseConfig.testConnection();

    if (isConnected) {
      console.log('✅ Supabase OK!\n');
    }
  }

  testFacebook() {
    console.log('📱 Testando config Facebook...');
    const config = this.facebookConfig.getConfig();
    const rateLimit = this.facebookConfig.getRateLimit();

    console.log('✅ Facebook OK!');
    console.log(`   URL API: ${this.facebookConfig.getApiUrl()}`);
    console.log(`   Rate Limit: ${rateLimit.requestsPerHour} req/hora`);
    console.log(`   Delay: ${rateLimit.delaySeconds}s\n`);
  }

  getHello(): string {
    return '🎉 API Gringads funcionando! Backend para anúncios escalados do Facebook Ads.';
  }
}
