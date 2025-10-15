# 🎯 PLANO COMPLETO - FASE 1: BACKEND (Scraping Facebook Ads Library)

## 📋 VISÃO GERAL

Plataforma para capturar e exibir anúncios escalados do Facebook Ads Library, focando apenas nos melhores anúncios que estão vendendo há pelo menos 5 dias, excluindo anúncios do Brasil.

## 🏗️ SETUP ATUAL

**Tecnologias já instaladas:**
- ✅ NestJS
- ✅ Supabase client
- ✅ Axios (requisições HTTP)
- ✅ Puppeteer (scraping)
- ✅ Class-validator/transformer
- ✅ Schema do banco completo
- ✅ Pastas vazias prontas: ads, auth, scraper, subscriptions

---

## 📋 ETAPAS PRINCIPAIS

### **FASE 1: Setup & Configuração (Base)**
**Prioridade:** 🔴 CRÍTICA

<!-- #### 1.1 Configuração do Ambiente
- [ ] Criar arquivo `.env` com variáveis:
  ```env
  # Supabase
  SUPABASE_URL=sua-url
  SUPABASE_KEY=sua-key
  SUPABASE_SERVICE_ROLE_KEY=key-admin
  
  # Facebook Graph API
  FACEBOOK_ACCESS_TOKEN=seu-token
  FACEBOOK_APP_ID=seu-app-id
  FACEBOOK_APP_SECRET=seu-secret
  
  # Rate Limiting
  FACEBOOK_REQUESTS_PER_HOUR=200
  SCRAPER_DELAY_MS=3000
  
  # App
  PORT=3000
  NODE_ENV=development
  ```

- [✔️ ] Criar arquivo `.env.example` (sem valores sensíveis) -->

#### 1.2 Obter Credenciais Facebook
**⚠️ SUPER IMPORTANTE - LEIA A DOCUMENTAÇÃO**

1. **Criar App no Facebook Developers:**
   - Acesse: https://developers.facebook.com
   - Crie um app tipo "Business"
   - Ative o produto "Marketing API"
   
2. **Gerar Access Token:**
   - Use o Graph API Explorer
   - Permissões necessárias: `ads_read`, `pages_read_engagement`
   - **IMPORTANTE:** Token de usuário expira! Você precisa de um token de longa duração ou usar App Access Token
   
3. **Entender Rate Limits:**
   - **200 chamadas por hora** por access token (padrão)
   - Usar headers `X-App-Usage` e `X-Business-Use-Case-Usage` para monitorar
   - Implementar retry com exponential backoff

#### 1.3 Configurar Supabase Module
- [ ] Criar `src/config/supabase.config.ts`
- [ ] Criar `src/config/facebook.config.ts`
- [ ] Configurar `@nestjs/config` no AppModule

---

### **FASE 2: Módulo de Scraping (Core)**
**Prioridade:** 🔴 CRÍTICA

#### 2.1 Estrutura do Módulo Scraper
```
src/scraper/
├── scraper.module.ts
├── scraper.service.ts
├── scraper.controller.ts (admin apenas)
├── facebook-api/
│   ├── facebook-api.service.ts (chamadas à API)
│   ├── facebook-rate-limiter.service.ts
│   └── dto/
│       ├── facebook-ad.dto.ts
│       └── search-params.dto.ts
├── filters/
│   └── ad-quality-filter.service.ts
└── queue/
    └── scraper-queue.service.ts (opcional, para BullMQ)
```

#### 2.2 Facebook API Service (O CORAÇÃO)
**Responsabilidades:**
- ✅ Fazer chamadas à Facebook Ads Library API
- ✅ Gerenciar rate limiting
- ✅ Retry automático com exponential backoff
- ✅ Parsear e transformar dados
- ✅ Lidar com paginação

**Endpoints da API que vamos usar:**
```
GET /ads_archive
```

**Parâmetros principais que você vai usar:**
```typescript
{
  ad_reached_countries: ['US', 'ES', 'MX', ...], // TODOS EXCETO BR
  ad_active_status: 'ACTIVE',
  ad_delivery_date_min: '5 days ago', // Mínimo 5 dias rodando
  search_terms: '', // Opcional
  fields: [
    'id',
    'ad_creation_time',
    'ad_delivery_start_time',
    'ad_delivery_stop_time',
    'ad_creative_bodies',
    'ad_creative_link_captions',
    'ad_creative_link_descriptions',
    'ad_creative_link_titles',
    'ad_snapshot_url',
    'page_id',
    'page_name',
    'publisher_platforms',
    'languages'
  ],
  limit: 100 // Máximo por página
}
```

#### 2.3 Sistema de Filtros (FILTRO DE QUALIDADE)
**Critérios para anúncios "escalados":**

1. **Tempo Mínimo:** ≥ 5 dias rodando
2. **Estimativa de Gasto:** Calcular com base no tempo
3. **Qualidade do Criativo:**
   - Tem imagem/vídeo?
   - Tem CTA?
   - Tem texto descente (não spam)?
4. **Performance Score:** Criar algoritmo de pontuação

**Algoritmo de Pontuação (Sugestão):**
```typescript
score = (days_running * 10) + 
        (has_video ? 20 : 10) + 
        (has_good_cta ? 15 : 0) +
        (text_quality_score * 5)
```

#### 2.4 Rate Limiter Service
**Implementação OBRIGATÓRIA:**
- Token bucket algorithm
- Monitorar headers da resposta do Facebook
- Pausar automaticamente se próximo do limite
- Logs detalhados

---

### **FASE 3: Módulo de Anúncios (Database)**
**Prioridade:** 🟡 ALTA

#### 3.1 Estrutura do Módulo Ads
```
src/ads/
├── ads.module.ts
├── ads.service.ts
├── ads.controller.ts (público - requer assinatura)
├── entities/
│   └── ad.entity.ts (type-safe com seu schema)
├── dto/
│   ├── create-ad.dto.ts
│   ├── update-ad.dto.ts
│   ├── filter-ads.dto.ts
│   └── ad-response.dto.ts
└── repositories/
    └── ads.repository.ts (Supabase queries)
```

#### 3.2 Ads Repository
**Métodos principais:**
- `create(ad)` - Inserir anúncio
- `findAll(filters)` - Buscar com filtros
- `findByQuality(tier)` - Gold/Silver/Bronze
- `findTrending()` - Mais visualizados
- `updateMetrics(id, metrics)` - Atualizar contadores
- `validateAd(id, userId)` - Marcar como validado

#### 3.3 Integração Scraper → Database
**Fluxo:**
1. Scraper busca anúncios do Facebook
2. Aplica filtros de qualidade
3. Transforma para formato do DB
4. Salva no Supabase (verifica duplicatas por `facebook_ad_id`)
5. Atualiza métricas se já existe

---

### **FASE 4: Sistema de Filas (Opcional mas recomendado)**
**Prioridade:** 🟢 MÉDIA

**Por quê?**
- Scraping é demorado
- Rate limits exigem delays
- Processar em background

**Opções:**
1. **BullMQ** (recomendado) - Redis required
2. **Cron jobs simples** com `@nestjs/schedule`

#### 4.1 Se usar BullMQ:
```bash
npm install @nestjs/bull bull
npm install @types/bull -D
```

**Jobs:**
- `scrape-facebook-ads` - Roda a cada X horas
- `process-ad-quality` - Analisa qualidade
- `update-ad-metrics` - Atualiza scores

---

### **FASE 5: Autenticação & Assinatura (Hotmart)**
**Prioridade:** 🟡 ALTA (mas pode implementar depois)

#### 5.1 Auth Module
```
src/auth/
├── auth.module.ts
├── auth.service.ts
├── auth.controller.ts
├── guards/
│   ├── jwt-auth.guard.ts
│   └── subscription.guard.ts
└── strategies/
    └── jwt.strategy.ts
```

#### 5.2 Subscription Module
```
src/subscriptions/
├── subscriptions.module.ts
├── subscriptions.service.ts
├── subscriptions.controller.ts
└── hotmart-webhook.controller.ts
```

**Webhook Hotmart:**
- Receber eventos: `PURCHASE_COMPLETE`, `SUBSCRIPTION_CANCELED`, etc.
- Atualizar tabela `subscriptions`
- Validar signature do Hotmart

---

### **FASE 6: Endpoints Públicos (API REST)**
**Prioridade:** 🟡 ALTA

#### 6.1 Rotas Principais
```typescript
// Público (requer autenticação + assinatura ativa)
GET  /api/ads                 // Listar anúncios com filtros
GET  /api/ads/:id             // Detalhes do anúncio
GET  /api/ads/gold            // Anúncios Gold
GET  /api/ads/trending        // Trending
POST /api/ads/:id/favorite    // Favoritar
POST /api/ads/:id/view        // Registrar visualização

// Admin (protegido)
POST /api/scraper/run         // Iniciar scraping manual
GET  /api/scraper/status      // Status do scraping
POST /api/ads/:id/validate    // Validar anúncio manualmente
```

---

## 🚨 PONTOS CRÍTICOS DE ATENÇÃO

### 1. **Rate Limiting do Facebook**
```typescript
// Exemplo de implementação
class FacebookRateLimiter {
  private requests: number = 0;
  private resetTime: Date;
  
  async checkLimit() {
    if (this.requests >= 200) {
      const waitTime = this.resetTime.getTime() - Date.now();
      await this.sleep(waitTime);
      this.requests = 0;
    }
  }
  
  trackRequest(headers) {
    const usage = JSON.parse(headers['x-app-usage'] || '{}');
    this.requests = usage.call_count || 0;
    // Implementar lógica completa
  }
}
```

### 2. **Não Tomar Ban**
- ✅ Sempre respeitar rate limits
- ✅ Usar delays entre requests (mínimo 1-2s)
- ✅ Não fazer requests paralelos demais
- ✅ Implementar exponential backoff em erros
- ✅ Logar tudo para debug

### 3. **Duplicatas**
- Sempre verificar `facebook_ad_id` antes de inserir
- Usar `ON CONFLICT` do Postgres ou verificar antes

### 4. **Países**
Você quer TODOS exceto Brasil:
```typescript
const ALL_COUNTRIES_EXCEPT_BR = [
  'US', 'IN', 'GB', 'CA', 'AR', 'AU', 'AT', 'BE', 'CL', 'CN', 
  'CO', 'HR', 'DK', 'DO', 'EG', 'FI', 'FR', 'DE', 'GR', 'HK',
  'ID', 'IE', 'IL', 'IT', 'JP', 'JO', 'KW', 'LB', 'MY', 'MX',
  'NL', 'NZ', 'NG', 'NO', 'PK', 'PA', 'PE', 'PH', 'PL', 'RU',
  'SA', 'RS', 'SG', 'ZA', 'KR', 'ES', 'SE', 'CH', 'TW', 'TH',
  'TR', 'AE', 'VE', 'PT', 'LU', 'BG', 'CZ', 'SI', 'IS', 'SK',
  'LT', 'TT', 'BD', 'LK', 'KE', 'HU', 'MA', 'CY', 'JM', 'EC',
  'RO', 'BO', 'GT', 'CR', 'QA', 'SV', 'HN', 'NI', 'PY', 'UY',
  'PR', 'BA', 'PS', 'TN', 'BH', 'VN', 'GH', 'MU', 'UA', 'MT',
  'BS', 'MV', 'OM', 'MK', 'LV', 'EE', 'IQ', 'DZ', 'AL', 'NP',
  'MO', 'ME', 'SN', 'GE', 'BN', 'UG', 'GP', 'BB', 'AZ', 'TZ',
  'LY', 'MQ', 'CM', 'BW', 'ET', 'KZ', 'NA', 'MG', 'NC', 'MD',
  'FJ', 'BY', 'JE', 'GU', 'YE', 'ZM', 'IM', 'HT', 'KH', 'AW',
  'PF', 'AF', 'BM', 'GY', 'AM', 'MW', 'AG', 'RW', 'GG', 'GM',
  'FO', 'LC', 'KY', 'BJ', 'AD', 'GD', 'VI', 'BZ', 'VC', 'MN',
  'MZ', 'ML', 'AO', 'GF', 'UZ', 'DJ', 'BF', 'MC', 'TG', 'GL',
  'GA', 'GI', 'CD', 'KG', 'PG', 'BT', 'KN', 'SZ', 'LS', 'LA',
  'LI', 'MP', 'SR', 'SC', 'VG', 'TC', 'DM', 'MR', 'AX', 'SM',
  'SL', 'NE', 'CG', 'AI', 'YT', 'CV', 'GN', 'TM', 'BI', 'TJ',
  'VU', 'SB', 'ER', 'WS', 'AS', 'FK', 'GQ', 'TO', 'KM', 'PW',
  'FM', 'CF', 'SO', 'MH', 'VA', 'TD', 'KI', 'ST', 'TV', 'NR',
  'RE', 'LR', 'ZW', 'CI', 'MM', 'AN', 'AQ', 'BQ', 'BV', 'IO',
  'CX', 'CC', 'CK', 'CW', 'TF', 'GW', 'HM', 'XK', 'MS', 'NU',
  'NF', 'PN', 'BL', 'SH', 'MF', 'PM', 'SX', 'GS', 'SS', 'SJ',
  'TL', 'TK', 'UM', 'WF', 'EH'
];
```

---

## 📝 ORDEM DE IMPLEMENTAÇÃO SUGERIDA

### **SPRINT 1** (Setup Base)
1. ✅ Configurar `.env`
2. ✅ Criar Supabase module
3. ✅ Criar Facebook config
4. ✅ Testar conexão Supabase
5. ✅ Testar API do Facebook (request simples)

### **SPRINT 2** (Core Scraping)
1. ✅ Implementar `FacebookApiService`
2. ✅ Implementar `RateLimiterService`
3. ✅ Criar DTOs para anúncios
4. ✅ Fazer primeira busca de teste
5. ✅ Logs detalhados

### **SPRINT 3** (Database Integration)
1. ✅ Criar `AdsRepository`
2. ✅ Mapear DTOs → Database
3. ✅ Implementar salvamento
4. ✅ Testar duplicatas
5. ✅ Queries de busca

### **SPRINT 4** (Filtros de Qualidade)
1. ✅ Implementar algoritmo de score
2. ✅ Filtrar por dias rodando
3. ✅ Classificar Gold/Silver/Bronze
4. ✅ Testes com dados reais

### **SPRINT 5** (API REST)
1. ✅ Endpoints públicos
2. ✅ Filtros e paginação
3. ✅ Documentação (Swagger opcional)

### **SPRINT 6** (Auth & Webhooks Hotmart)
1. ✅ Auth com Supabase
2. ✅ Guards de assinatura
3. ✅ Webhook Hotmart

---

## 🛠️ PRÓXIMOS PASSOS IMEDIATOS

### **Configuração Base (Fazer AGORA)**
1. **Arquivo de configuração** (`.env.example`, configs)
2. **FacebookApiService** (core do scraping)
3. **RateLimiterService** (proteção anti-ban)
4. **AdsRepository** (integração Supabase)
5. **Estrutura completa dos módulos**

---

## 📚 DOCUMENTAÇÃO FACEBOOK ADS LIBRARY

### **Parâmetros de Pesquisa**
- `ad_active_status`: `ACTIVE` (só anúncios ativos)
- `ad_delivery_date_min`: Data mínima (5 dias atrás)
- `ad_reached_countries`: Array de países (todos exceto BR)
- `search_terms`: Termos de busca (opcional)
- `fields`: Campos que queremos retornar

### **Campos Importantes**
- `id`: ID único do anúncio
- `ad_creation_time`: Quando foi criado
- `ad_delivery_start_time`: Quando começou a rodar
- `ad_delivery_stop_time`: Quando parou (se parou)
- `ad_creative_bodies`: Texto do anúncio
- `ad_creative_link_titles`: Títulos dos links
- `ad_snapshot_url`: URL da imagem/vídeo
- `page_name`: Nome da página
- `publisher_platforms`: Onde aparece (FB, IG, etc)

### **Rate Limits**
- **200 requests por hora** por access token
- Headers importantes: `X-App-Usage`, `X-Business-Use-Case-Usage`
- Implementar retry com exponential backoff

---

## 🎯 OBJETIVO FINAL

Criar uma plataforma que:
1. ✅ Captura anúncios escalados do Facebook (≥5 dias rodando)
2. ✅ Filtra apenas os melhores (algoritmo de qualidade)
3. ✅ Exclui anúncios do Brasil
4. ✅ Salva no Supabase com métricas
5. ✅ API REST para frontend consumir
6. ✅ Sistema de assinatura Hotmart
7. ✅ Rate limiting para não tomar ban

**Resultado:** Site com apenas a "nata" dos anúncios do Facebook, validados e escalados! 🚀
