# 🚀 CÓDIGO PRONTO - CONFIGURAÇÃO COMPLETA

## 📁 ARQUIVO: `src/config/supabase.config.ts`

```typescript
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
```

**Explicação:**
- **`private supabaseClient`**: Guarda a conexão (só acessível dentro da classe)
- **`constructor`**: Roda ao criar a classe, configura tudo
- **`getClient()`**: Retorna o cliente para usar em outros lugares
- **`testConnection()`**: Método bonus para testar se conectou

---

## 📁 ARQUIVO: `src/config/facebook.config.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface FacebookConfig {
  accessToken: string;
  appId: string;
  appSecret: string;
  requestsPerHour: number;
  scraperDelayMs: number;
  apiVersion: string;
  baseUrl: string;
}

@Injectable()
export class FacebookConfigService {
  private config: FacebookConfig;

  constructor(private configService: ConfigService) {
    const accessToken = this.configService.get<string>(
      'FACEBOOK_ACCESS_TOKEN',
    );
    const appId = this.configService.get<string>('FACEBOOK_APP_ID');
    const appSecret = this.configService.get<string>('FACEBOOK_APP_SECRET');

    if (!accessToken || !appId || !appSecret) {
      throw new Error(
        '❌ Variáveis do Facebook (ACCESS_TOKEN, APP_ID, APP_SECRET) devem estar no .env',
      );
    }

    this.config = {
      accessToken,
      appId,
      appSecret,
      requestsPerHour: this.configService.get<number>(
        'FACEBOOK_REQUESTS_PER_HOUR',
        200,
      ),
      scraperDelayMs: this.configService.get<number>('SCRAPER_DELAY_MS', 3000),
      apiVersion: 'v18.0',
      baseUrl: 'https://graph.facebook.com',
    };

    console.log('✅ Facebook config carregado!');
    console.log(`   → Limite: ${this.config.requestsPerHour} req/hora`);
    console.log(`   → Delay: ${this.config.scraperDelayMs}ms entre requests`);
  }

  getConfig(): FacebookConfig {
    return this.config;
  }

  getAccessToken(): string {
    return this.config.accessToken;
  }

  getApiUrl(): string {
    return `${this.config.baseUrl}/${this.config.apiVersion}`;
  }

  getRateLimit(): {
    requestsPerHour: number;
    delayMs: number;
    delaySeconds: number;
  } {
    return {
      requestsPerHour: this.config.requestsPerHour,
      delayMs: this.config.scraperDelayMs,
      delaySeconds: this.config.scraperDelayMs / 1000,
    };
  }
}
```

**Explicação:**
- **`interface FacebookConfig`**: Define estrutura dos dados
- **`private config`**: Guarda todas configurações
- **`getApiUrl()`**: Retorna URL completa da API
- **`getRateLimit()`**: Retorna info sobre limites

---

## 📁 ARQUIVO: `src/app.module.ts` (ATUALIZADO)

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseConfigService } from './config/supabase.config';
import { FacebookConfigService } from './config/facebook.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseConfigService, FacebookConfigService],
  exports: [SupabaseConfigService, FacebookConfigService],
})
export class AppModule {}
```

**Explicação:**
- **`imports: [ConfigModule...]`**: Carrega módulo de configuração
- **`providers: [...]`**: Registra os serviços de config
- **`exports: [...]`**: Permite usar em outros módulos

---

## 📁 ARQUIVO: `.env.example`

```env
# ========================================
# CONFIGURAÇÕES DO SUPABASE
# ========================================
# Pegar em: https://supabase.com/dashboard/project/_/settings/api
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-publica-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-chave-admin-aqui

# ========================================
# CONFIGURAÇÕES DO FACEBOOK ADS LIBRARY
# ========================================
# Pegar em: https://developers.facebook.com
FACEBOOK_ACCESS_TOKEN=seu-token-aqui
FACEBOOK_APP_ID=seu-app-id
FACEBOOK_APP_SECRET=seu-app-secret

# ========================================
# RATE LIMITING (Controle de Requisições)
# ========================================
# Quantas requisições por hora (Facebook limita em 200)
FACEBOOK_REQUESTS_PER_HOUR=200

# Delay em milissegundos entre cada requisição (3000 = 3 segundos)
SCRAPER_DELAY_MS=3000

# ========================================
# CONFIGURAÇÕES DA APLICAÇÃO
# ========================================
# Porta onde o servidor vai rodar
PORT=3000

# Ambiente: development ou production
NODE_ENV=development
```

---

## 📁 ARQUIVO: `.gitignore` (ADICIONAR)

```gitignore
# Dependências
node_modules/

# Arquivos de ambiente (IMPORTANTE!)
.env
.env.local
.env.*.local

# Build
dist/
build/

# Logs
*.log
npm-debug.log*

# Editor
.vscode/
.idea/

# Sistema
.DS_Store
Thumbs.db
```

**⚠️ IMPORTANTE:** O `.env` NUNCA pode ir pro GitHub! Sempre adicione no `.gitignore`!

---

## 🧪 EXEMPLO DE USO: `src/app.service.ts`

```typescript
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
    console.log('\n🚀 Iniciando aplicação...\n');
    
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
    
    console.log(`✅ Facebook OK!`);
    console.log(`   URL API: ${this.facebookConfig.getApiUrl()}`);
    console.log(`   Rate Limit: ${rateLimit.requestsPerHour} req/hora`);
    console.log(`   Delay: ${rateLimit.delaySeconds}s\n`);
  }

  getHello(): string {
    return '🎉 API funcionando!';
  }

  async getSupabaseData() {
    const supabase = this.supabaseConfig.getClient();
    
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .limit(5);
    
    if (error) {
      throw new Error(`Erro ao buscar dados: ${error.message}`);
    }
    
    return data;
  }
}
```

**Explicação:**
- **`OnModuleInit`**: Interface que roda código quando módulo inicia
- **`constructor(...)`**: NestJS injeta automaticamente os configs
- **`onModuleInit()`**: Testa conexões ao iniciar app
- **`getSupabaseData()`**: Exemplo de query no banco

---

## 🎯 EXEMPLO COMPLETO: Buscar Anúncios do Facebook

```typescript
import { Injectable } from '@nestjs/common';
import { FacebookConfigService } from '../config/facebook.config';
import axios from 'axios';

@Injectable()
export class FacebookApiService {
  constructor(private facebookConfig: FacebookConfigService) {}

  async searchAds(searchTerm: string) {
    const config = this.facebookConfig.getConfig();
    const apiUrl = this.facebookConfig.getApiUrl();
    
    const url = `${apiUrl}/ads_archive`;
    
    const params = {
      access_token: config.accessToken,
      ad_reached_countries: ['US', 'ES', 'MX'],
      ad_active_status: 'ACTIVE',
      search_terms: searchTerm,
      fields: [
        'id',
        'ad_creative_bodies',
        'ad_snapshot_url',
        'page_name',
      ].join(','),
      limit: 10,
    };

    try {
      console.log(`🔍 Buscando anúncios: "${searchTerm}"`);
      
      const response = await axios.get(url, { params });
      
      console.log(`✅ Encontrados: ${response.data.data.length} anúncios`);
      
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao buscar anúncios:', error.message);
      throw error;
    }
  }

  async getAdDetails(adId: string) {
    const apiUrl = this.facebookConfig.getApiUrl();
    const token = this.facebookConfig.getAccessToken();
    
    const url = `${apiUrl}/${adId}`;
    
    try {
      const response = await axios.get(url, {
        params: {
          access_token: token,
          fields: 'id,ad_creative_bodies,page_name',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao buscar anúncio ${adId}:`, error.message);
      throw error;
    }
  }
}
```

---

## 🧪 TESTANDO TUDO

### 1. Verificar se variáveis estão no .env
```bash
# Windows PowerShell
Get-Content .env
```

### 2. Rodar aplicação
```bash
npm run start:dev
```

### 3. O que você deve ver:
```
🚀 Iniciando aplicação...

📊 Testando conexão Supabase...
✅ Supabase conectado com sucesso!
✅ Conexão Supabase testada com sucesso!
✅ Supabase OK!

📱 Testando config Facebook...
✅ Facebook config carregado!
   → Limite: 200 req/hora
   → Delay: 3000ms entre requests
✅ Facebook OK!
   URL API: https://graph.facebook.com/v18.0
   Rate Limit: 200 req/hora
   Delay: 3s

🎉 Aplicação rodando em: http://localhost:3000
```

---

## 🐛 PROBLEMAS COMUNS

### Erro: "Cannot find module '@nestjs/config'"
**Solução:**
```bash
npm install @nestjs/config
```

### Erro: "SUPABASE_URL deve estar definido"
**Solução:**
- Verifique se o `.env` existe
- Verifique se não tem espaços: `SUPABASE_URL=valor` ✅
- Errado: `SUPABASE_URL = valor` ❌

### Erro: "Cannot read property 'get' of undefined"
**Solução:**
- Verifique se `ConfigModule` está no `imports` do `AppModule`
- Verifique se `isGlobal: true` está configurado

---

## ✅ CHECKLIST FINAL

- [ ] Criar `.env` com valores reais
- [ ] Criar `.env.example` sem valores
- [ ] Adicionar `.env` no `.gitignore`
- [ ] Criar `src/config/supabase.config.ts`
- [ ] Criar `src/config/facebook.config.ts`
- [ ] Atualizar `src/app.module.ts`
- [ ] Instalar: `npm install @nestjs/config`
- [ ] Testar: `npm run start:dev`
- [ ] Ver logs de sucesso ✅

---

## 🎓 RESUMO DO QUE APRENDEMOS

1. **`.env`**: Guarda configurações secretas
2. **ConfigModule**: Lê o `.env` de forma segura
3. **ConfigService**: Acessa variáveis do `.env`
4. **@Injectable()**: Marca classe como injetável
5. **Constructor**: Recebe dependências automaticamente
6. **Providers**: Lista de services no módulo
7. **DI (Dependency Injection)**: NestJS injeta automaticamente

---

## 🚀 PRÓXIMOS PASSOS

Agora que você tem as configurações prontas, pode:
1. Criar o `FacebookApiService` completo
2. Implementar Rate Limiter
3. Criar Repository do Supabase
4. Fazer scraping dos anúncios

Quer que eu crie algum desses agora? 🎯
