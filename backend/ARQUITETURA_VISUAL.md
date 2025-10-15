# 🏗️ ARQUITETURA VISUAL - GRINGADS BACKEND

## 📊 DIAGRAMA DE MÓDULOS

```
┌─────────────────────────────────────────────────────────────────┐
│                         APP MODULE                               │
│                     (Módulo Raiz)                               │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                    CONFIG MODULE                          │ │
│  │  • Carrega .env                                          │ │
│  │  • Disponibiliza ConfigService                           │ │
│  │  • Global para toda aplicação                            │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                   SCHEDULE MODULE                         │ │
│  │  • Gerencia cron jobs                                    │ │
│  │  • Permite decorators @Cron()                            │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌─────────────────────────┐  ┌──────────────────────────────┐ │
│  │      ADS MODULE         │  │     SCRAPER MODULE           │ │
│  │  (Gerencia anúncios)    │  │  (Busca anúncios FB)        │ │
│  └─────────────────────────┘  └──────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 FLUXO DE SCRAPING

```
┌──────────────────────────────────────────────────────────────────┐
│  1. CRON JOB (a cada 6 horas) ou MANUAL (POST /scraper/run)    │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│  2. SCRAPER SERVICE                                              │
│     • Define países (todos exceto BR)                           │
│     • Define parâmetros de busca                                │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│  3. FACEBOOK API SERVICE                                         │
│     • Aguarda rate limiter ⏳                                    │
│     • Faz request para Facebook Ads Library                     │
│     • Coleta múltiplas páginas (paginação)                      │
│     • Retry automático em erro                                  │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│  4. FACEBOOK RATE LIMITER                                        │
│     ✅ Verifica se pode fazer request                           │
│     ✅ Delay de 3 segundos                                       │
│     ✅ Máximo 200 requests/hora                                  │
│     ✅ Tracking de headers                                       │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│  5. AD QUALITY FILTER SERVICE                                    │
│     • Filtra anúncios (mínimo 4 dias)                           │
│     • Calcula score (0-100)                                     │
│     • Classifica (Gold/Silver/Bronze)                           │
│     • Transforma para CreateAdDto                               │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│  6. ADS REPOSITORY                                               │
│     • Upsert no banco (evita duplicatas)                        │
│     • Verifica por facebook_ad_id                               │
│     • Atualiza se já existe                                     │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│  7. SUPABASE (PostgreSQL)                                        │
│     💾 Anúncio salvo na tabela 'ads'                            │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🌐 FLUXO DE REQUEST HTTP

```
┌──────────────────────────────────────────────────────────────────┐
│  USER faz request                                                │
│  GET http://localhost:3000/ads?quality_tier=gold&limit=10       │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│  ADS CONTROLLER                                                  │
│  • Recebe request                                               │
│  • Valida query params (FilterAdsDto)                           │
│  • Chama AdsService                                             │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│  ADS SERVICE                                                     │
│  • Lógica de negócio                                            │
│  • Chama AdsRepository                                          │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│  ADS REPOSITORY                                                  │
│  • Monta query Supabase                                         │
│  • Aplica filtros                                               │
│  • Ordena resultados                                            │
│  • Pagina resultados                                            │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│  SUPABASE CONFIG SERVICE                                         │
│  • Fornece cliente Supabase                                     │
│  • getClient()                                                  │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│  SUPABASE (PostgreSQL)                                           │
│  • Executa SELECT com JOINs                                     │
│  • Retorna dados                                                │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│  RESPONSE para USER                                              │
│  {                                                               │
│    "success": true,                                             │
│    "data": [...],                                               │
│    "pagination": { ... }                                        │
│  }                                                               │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🧩 DEPENDENCY INJECTION (DI)

```
┌─────────────────────────────────────────────────────────────────┐
│                      NESTJS DI CONTAINER                         │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  ConfigService                                           │  │
│  │  • Injetado em: SupabaseConfig, FacebookConfig          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                          ↓ injeta em                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  SupabaseConfigService                                   │  │
│  │  • Injetado em: AdsRepository, AppService                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                          ↓ injeta em                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  AdsRepository                                           │  │
│  │  • Injetado em: AdsService, ScraperService               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                          ↓ injeta em                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  AdsService                                              │  │
│  │  • Injetado em: AdsController                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  FacebookConfigService                                   │  │
│  │  • Injetado em: FacebookApiService, AppService           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                          ↓ injeta em                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  FacebookApiService                                      │  │
│  │  • Injetado em: ScraperService                           │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 ESTRUTURA DE ARQUIVOS (Visual)

```
backend/
├── 📄 .env                          (⚠️ NÃO commitar!)
├── 📄 .env.example                  (Exemplo versionado)
├── 📄 package.json
│
├── 📚 Documentação
│   ├── SETUP_GUIDE.md               (Guia completo)
│   ├── QUICK_START.md               (Início rápido)
│   ├── IMPLEMENTACAO_COMPLETA.md    (Resumo implementação)
│   └── ARQUITETURA_VISUAL.md        (Este arquivo)
│
└── src/
    │
    ├── 🔧 config/                   (Configurações)
    │   ├── supabase.config.ts       (Conexão Supabase)
    │   └── facebook.config.ts       (Config Facebook API)
    │
    ├── 📊 common/                   (Utilitários)
    │   └── constants.ts             (Constantes)
    │
    ├── 📢 ads/                      (Módulo de Anúncios)
    │   │
    │   ├── 📦 entities/
    │   │   └── ad.entity.ts         (Types)
    │   │
    │   ├── 📝 dto/
    │   │   ├── create-ad.dto.ts     (Criar anúncio)
    │   │   ├── filter-ads.dto.ts    (Filtros)
    │   │   └── ad-response.dto.ts   (Responses)
    │   │
    │   ├── 🗄️ repositories/
    │   │   └── ads.repository.ts    (Queries Supabase)
    │   │
    │   ├── ⚙️ ads.service.ts         (Lógica de negócio)
    │   ├── 🌐 ads.controller.ts      (Endpoints)
    │   └── 📦 ads.module.ts          (Módulo)
    │
    ├── 🔍 scraper/                  (Módulo de Scraping)
    │   │
    │   ├── 📝 dto/
    │   │   └── facebook-ad.dto.ts   (DTOs Facebook)
    │   │
    │   ├── ⚙️ services/
    │   │   ├── facebook-api.service.ts           (API Facebook)
    │   │   ├── facebook-rate-limiter.service.ts  (Rate limit)
    │   │   ├── ad-quality-filter.service.ts      (Filtros)
    │   │   ├── scraper.service.ts                (Orquestrador)
    │   │   └── scraper-scheduler.service.ts      (Cron jobs)
    │   │
    │   ├── 🌐 scraper.controller.ts  (Endpoints)
    │   └── 📦 scraper.module.ts      (Módulo)
    │
    ├── 📦 app.module.ts              (Módulo raiz)
    ├── ⚙️ app.service.ts             (Service principal)
    ├── 🌐 app.controller.ts          (Controller principal)
    └── 🚀 main.ts                    (Entry point)
```

---

## 🎯 ENDPOINTS DISPONÍVEIS

### 📢 Anúncios (Públicos)

```
┌────────────────────────────────────────────────────────────────┐
│  GET /ads                                                      │
│  • Listar anúncios com filtros                                │
│  • Query params: search, country_code, quality_tier, etc      │
│  • Paginação e ordenação                                      │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│  GET /ads/gold                                                 │
│  • Listar apenas anúncios Gold (80+ pontos)                   │
│  • Usa view do banco otimizada                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│  GET /ads/trending                                             │
│  • Anúncios mais visualizados                                 │
│  • Top 50                                                      │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│  GET /ads/metrics                                              │
│  • Métricas gerais (total, gold, silver, bronze)             │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│  GET /ads/:id                                                  │
│  • Buscar anúncio por ID                                      │
│  • Retorna com joins (categoria, nicho, país)                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│  POST /ads/:id/view                                            │
│  • Registrar visualização                                     │
│  • Incrementa contador                                        │
└────────────────────────────────────────────────────────────────┘
```

### 🔍 Scraper (Admin)

```
┌────────────────────────────────────────────────────────────────┐
│  POST /scraper/run                                             │
│  • Executar scraping manual                                   │
│  • Body: { searchTerms?, countries? }                         │
│  • Retorna resultado (adsFound, adsSaved, errors)            │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│  POST /scraper/run-by-country                                  │
│  • Scraping focado em países específicos                      │
│  • Body: { countries: ["US", "GB"] }                          │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│  GET /scraper/status                                           │
│  • Status do rate limiter                                     │
│  • Requests restantes, tempo de reset                         │
└────────────────────────────────────────────────────────────────┘
```

---

## ⚡ SISTEMA DE QUALIDADE (Visual)

```
┌─────────────────────────────────────────────────────────────────┐
│                    ANÚNCIO DO FACEBOOK                          │
│  • ad_delivery_start_time: 2024-01-01                          │
│  • ad_creative_bodies: "Texto completo..."                     │
│  • ad_snapshot_url: "https://..."                              │
│  • spend: { lower: 100, upper: 200 }                           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│           AD QUALITY FILTER SERVICE                             │
│                                                                  │
│  1️⃣ Calcula dias rodando                                        │
│     • Hoje - ad_delivery_start_time = 15 dias                  │
│     • Pontos: 30 (7+ dias)                          ✅         │
│                                                                  │
│  2️⃣ Analisa texto                                               │
│     • Texto tem 150 caracteres                                 │
│     • Pontos: 15 (50-1000 chars)                   ✅         │
│                                                                  │
│  3️⃣ Verifica título e descrição                                │
│     • Possui título                                            │
│     • Pontos: 10                                   ✅         │
│     • Possui descrição                                         │
│     • Pontos: 10                                   ✅         │
│                                                                  │
│  4️⃣ Analisa mídia                                               │
│     • Contém vídeo                                             │
│     • Pontos: 20                                   ✅         │
│                                                                  │
│  5️⃣ Gasto estimado                                              │
│     • Média: (100 + 200) / 2 = $150/dia                        │
│     • Pontos: 15 (≥$100)                           ✅         │
│                                                                  │
│  📊 SCORE TOTAL: 100 pontos                                     │
│  🏆 CLASSIFICAÇÃO: GOLD                                         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  SALVO NO BANCO                                 │
│  • quality_tier: 'gold'                                         │
│  • performance_score: 100                                       │
│  • days_running: 15                                             │
│  • estimated_daily_spend: 150                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛡️ RATE LIMITING (Visual)

```
┌─────────────────────────────────────────────────────────────────┐
│              FACEBOOK RATE LIMITER                              │
│                                                                  │
│  Estado Atual:                                                  │
│  • Requests feitos: 45/200                                     │
│  • Reset em: 45 minutos                                        │
│  • Delay próximo request: 3 segundos                           │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Request #1                                             │  │
│  │  ✅ Permitido (45/200)                                   │  │
│  │  ⏳ Delay: 3s                                            │  │
│  └─────────────────────────────────────────────────────────┘  │
│            ↓ aguarda 3 segundos                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Request #2                                             │  │
│  │  ✅ Permitido (46/200)                                   │  │
│  │  ⏳ Delay: 3s                                            │  │
│  └─────────────────────────────────────────────────────────┘  │
│            ↓ aguarda 3 segundos                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Request #200                                           │  │
│  │  ✅ Permitido (200/200)                                  │  │
│  │  ⚠️  LIMITE ATINGIDO!                                    │  │
│  └─────────────────────────────────────────────────────────┘  │
│            ↓ pausa automática                                  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  ⏸️  PAUSADO                                             │  │
│  │  Aguardando reset (45 minutos)                          │  │
│  └─────────────────────────────────────────────────────────┘  │
│            ↓ após 45 minutos                                   │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  ✅ RESETADO                                             │  │
│  │  Requests: 0/200                                        │  │
│  │  Pode continuar                                         │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 CRON JOBS (Timeline)

```
00:00  ────────────────────────────────────────────
       │
02:00  ├──● SCRAPING DIÁRIO (Top países)
       │   └─ US, GB, CA, AU, DE, FR, ES, MX, IT, NL
       │
06:00  ├──● SCRAPING AUTOMÁTICO (Todos exceto BR)
       │   └─ ~240 países
       │
08:00  ────────────────────────────────────────────
       │
12:00  ├──● SCRAPING AUTOMÁTICO (Todos exceto BR)
       │
14:00  ────────────────────────────────────────────
       │
18:00  ├──● SCRAPING AUTOMÁTICO (Todos exceto BR)
       │
20:00  ────────────────────────────────────────────
       │
00:00  ├──● SCRAPING AUTOMÁTICO (Todos exceto BR)
       │
       └─── Ciclo se repete...
```

---

## 🎯 RESUMO VISUAL

```
┌─────────────────────────────────────────────────────────────────┐
│                    GRINGADS BACKEND                             │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   CONFIG     │  │     ADS      │  │   SCRAPER    │         │
│  │              │  │              │  │              │         │
│  │ • Supabase   │  │ • CRUD       │  │ • Facebook   │         │
│  │ • Facebook   │  │ • Filtros    │  │ • Rate Limit │         │
│  │ • .env       │  │ • Paginação  │  │ • Qualidade  │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
│  Features:                                                      │
│  ✅ Scraping automático (Facebook Ads Library)                  │
│  ✅ Filtro de qualidade (Gold/Silver/Bronze)                    │
│  ✅ Rate limiting (200 req/hora)                                │
│  ✅ API REST completa                                           │
│  ✅ Cron jobs (6h + diário)                                     │
│  ✅ Logging e monitoramento                                     │
│                                                                  │
│  Stack:                                                         │
│  • NestJS + TypeScript                                         │
│  • Supabase (PostgreSQL)                                       │
│  • Facebook Ads Library API                                    │
│  • class-validator                                             │
│  • @nestjs/schedule                                            │
└─────────────────────────────────────────────────────────────────┘
```

**Tudo implementado e funcionando! 🚀**

