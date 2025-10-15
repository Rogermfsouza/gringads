# 🚀 GUIA DE SETUP - BACKEND GRINGADS

## ✅ O QUE FOI IMPLEMENTADO

### 1. Configurações Base
- ✅ `SupabaseConfigService` - Conexão com banco de dados
- ✅ `FacebookConfigService` - Configurações da API do Facebook
- ✅ Sistema de validação de variáveis de ambiente
- ✅ Testes de conexão automáticos

### 2. Módulo de Anúncios (Ads)
- ✅ **Entities** - Tipos e interfaces para anúncios
- ✅ **DTOs** - CreateAdDto, FilterAdsDto, AdResponseDto
- ✅ **Repository** - Operações no banco (Supabase)
- ✅ **Service** - Lógica de negócio
- ✅ **Controller** - Endpoints REST

### 3. Módulo de Scraper
- ✅ **FacebookApiService** - Chamadas à Facebook Ads Library API
- ✅ **FacebookRateLimiterService** - Controle de rate limiting (200 req/hora)
- ✅ **AdQualityFilterService** - Filtros e algoritmo de qualidade
- ✅ **ScraperService** - Orquestração do scraping
- ✅ **ScraperSchedulerService** - Cron jobs automáticos
- ✅ **ScraperController** - Endpoints admin

### 4. Sistema de Qualidade
Algoritmo de pontuação que classifica anúncios em:
- 🥇 **Gold** (80+ pontos) - Melhores anúncios
- 🥈 **Silver** (60-79 pontos) - Anúncios bons
- 🥉 **Bronze** (< 60 pontos) - Anúncios básicos

**Critérios de pontuação:**
- Dias rodando (até 30 pontos)
- Qualidade do texto (15 pontos)
- Título e descrição (20 pontos)
- Tipo de mídia (20 pontos)
- Múltiplas plataformas (10 pontos)
- Gasto estimado (15 pontos)
- Impressões (10 pontos)

### 5. Rate Limiting & Segurança
- ✅ Limite de 200 requisições por hora
- ✅ Delay de 3 segundos entre requisições
- ✅ Retry automático em caso de erro
- ✅ Exponential backoff
- ✅ Monitoramento de headers do Facebook

### 6. Cron Jobs Automáticos
- ✅ Scraping a cada 6 horas (todos os países exceto BR)
- ✅ Scraping diário às 2h (países principais)

---

## 📦 INSTALAÇÃO

### 1. Instalar dependências
```bash
cd backend
npm install
```

### 2. Criar arquivo .env
Copie o `.env.example` e preencha com suas credenciais:

```bash
cp .env.example .env
```

**Variáveis obrigatórias:**
```env
# Supabase (pegar em: https://supabase.com/dashboard)
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-aqui

# Facebook (pegar em: https://developers.facebook.com)
FACEBOOK_ACCESS_TOKEN=seu-token-aqui
FACEBOOK_APP_ID=seu-app-id
FACEBOOK_APP_SECRET=seu-secret

# Configurações
PORT=3000
NODE_ENV=development
MIN_DAYS_RUNNING=4
GOLD_SCORE_THRESHOLD=80
SILVER_SCORE_THRESHOLD=60
FACEBOOK_REQUESTS_PER_HOUR=200
SCRAPER_DELAY_MS=3000
```

### 3. Executar banco de dados
Execute o script SQL no seu Supabase:
```sql
-- Executar o arquivo banco-de-dados.sql no Supabase SQL Editor
```

### 4. Rodar aplicação
```bash
# Desenvolvimento (com watch)
npm run start:dev

# Produção
npm run build
npm run start:prod
```

---

## 🔑 COMO OBTER CREDENCIAIS

### Supabase
1. Acesse: https://supabase.com/dashboard
2. Crie um projeto (ou use existente)
3. Vá em **Settings → API**
4. Copie:
   - `URL` → `SUPABASE_URL`
   - `anon public` → `SUPABASE_KEY`

### Facebook Ads Library
1. Acesse: https://developers.facebook.com
2. Crie um app tipo "Business"
3. Adicione produto "Marketing API"
4. Vá em **Tools → Graph API Explorer**
5. Selecione seu app e gere token com permissões:
   - `ads_read`
   - `pages_read_engagement`
6. **IMPORTANTE:** Token de usuário expira! Use token de longa duração:
   ```
   https://graph.facebook.com/v21.0/oauth/access_token?
   grant_type=fb_exchange_token&
   client_id=SEU_APP_ID&
   client_secret=SEU_APP_SECRET&
   fb_exchange_token=SEU_TOKEN_CURTO
   ```

---

## 📡 ENDPOINTS DA API

### Anúncios (Públicos)

#### Listar anúncios com filtros
```http
GET /ads?country_code=US&quality_tier=gold&limit=20&page=1
```

**Query params:**
- `search` - Busca por texto
- `country_code` - Filtrar por país
- `category_id` - Filtrar por categoria
- `quality_tier` - gold, silver ou bronze
- `media_type` - image, video ou carousel
- `is_featured` - true/false
- `min_days_running` - Dias mínimos rodando
- `sort_by` - views, favorites, performance, days_running
- `sort_order` - asc ou desc
- `limit` - Resultados por página (1-100)
- `page` - Número da página

#### Buscar por ID
```http
GET /ads/:id
```

#### Anúncios Gold (melhores)
```http
GET /ads/gold?limit=50
```

#### Anúncios em Trending
```http
GET /ads/trending?limit=50
```

#### Métricas gerais
```http
GET /ads/metrics
```

#### Registrar visualização
```http
POST /ads/:id/view
Body: { "userId": "uuid" }
```

### Scraper (Admin)

#### Executar scraping manual
```http
POST /scraper/run
Body: {
  "searchTerms": "fitness",
  "countries": ["US", "GB", "CA"]
}
```

#### Scraping por países
```http
POST /scraper/run-by-country
Body: {
  "countries": ["US", "ES", "MX"]
}
```

#### Status do scraper
```http
GET /scraper/status
```

**Response:**
```json
{
  "success": true,
  "rateLimit": {
    "requestCount": 45,
    "maxRequests": 200,
    "resetTime": "2024-01-15T14:00:00.000Z",
    "remainingRequests": 155
  }
}
```

---

## 🧪 TESTANDO A APLICAÇÃO

### 1. Testar conexões
Ao iniciar, você verá:
```
🚀 Iniciando aplicação Gringads...

📊 Testando conexão Supabase...
✅ Supabase conectado com sucesso!
✅ Conexão Supabase testada com sucesso!
✅ Supabase OK!

📱 Testando config Facebook...
✅ Facebook config carregado!
   → Limite: 200 req/hora
   → Delay: 3000ms entre requests
✅ Facebook OK!
   URL API: https://graph.facebook.com/v21.0
   Rate Limit: 200 req/hora
   Delay: 3s
```

### 2. Testar API básica
```bash
curl http://localhost:3000
```

Resposta:
```json
"🎉 API Gringads funcionando! Backend para anúncios escalados do Facebook Ads."
```

### 3. Executar scraping de teste
```bash
curl -X POST http://localhost:3000/scraper/run \
  -H "Content-Type: application/json" \
  -d '{
    "countries": ["US"],
    "searchTerms": ""
  }'
```

### 4. Listar anúncios
```bash
curl http://localhost:3000/ads?limit=10
```

---

## 🔄 CRON JOBS AUTOMÁTICOS

### Scraping a cada 6 horas
Busca anúncios de todos os países (exceto BR) automaticamente.

### Scraping diário às 2h
Busca anúncios dos países principais:
- US, GB, CA, AU, DE, FR, ES, MX, IT, NL

**Para desabilitar:** Remova ou comente os decorators `@Cron()` em:
```typescript
// backend/src/scraper/services/scraper-scheduler.service.ts
```

---

## 📊 MONITORAMENTO

### Rate Limit Status
```bash
curl http://localhost:3000/scraper/status
```

### Logs importantes
- ✅ Conexões estabelecidas
- 🔍 Scraping iniciado
- 📊 Anúncios encontrados/salvos
- ⏳ Rate limit atingido
- ⚠️ Avisos de rate limit próximo do limite
- ❌ Erros

---

## 🛡️ SEGURANÇA & BOAS PRÁTICAS

### Rate Limiting
- **200 requisições/hora** por access token
- **Delay de 3 segundos** entre requests
- Monitoramento de headers `X-App-Usage`
- Pausa automática ao atingir limite

### Prevenção de Ban
- ✅ Retry com exponential backoff
- ✅ Tratamento de erros 429 (rate limit)
- ✅ Tratamento de erros 500/503 (servidor)
- ✅ Logs detalhados
- ✅ Não fazer requests paralelos

### Duplicatas
- Verificação por `facebook_ad_id` (unique)
- Uso de `upsert` para atualizar existentes
- Não inserir anúncios repetidos

---

## 🐛 TROUBLESHOOTING

### Erro: "Cannot find module"
```bash
cd backend
npm install
```

### Erro: "SUPABASE_URL deve estar definido"
Verifique se:
- O arquivo `.env` existe
- Não há espaços: `SUPABASE_URL=valor` ✅ (não `SUPABASE_URL = valor` ❌)
- O arquivo está na raiz do `/backend`

### Erro: "Rate limit exceeded"
Aguarde 1 hora ou ajuste em `.env`:
```env
FACEBOOK_REQUESTS_PER_HOUR=150
SCRAPER_DELAY_MS=5000
```

### Erro ao conectar Facebook
Verifique se:
- Access token é válido (não expirou)
- App tem permissões `ads_read`
- Token é de longa duração

### Nenhum anúncio encontrado
Possíveis causas:
- Países/termos de busca muito específicos
- Filtros muito restritivos (dias mínimos)
- Horário sem anúncios ativos

---

## 📈 PRÓXIMOS PASSOS

### Autenticação (Fase 2)
- [ ] Módulo Auth com Supabase Auth
- [ ] Guards de proteção de rotas
- [ ] Sistema de roles (admin/user)

### Assinaturas Hotmart (Fase 2)
- [ ] Webhook Hotmart
- [ ] Validação de assinatura ativa
- [ ] RLS no Supabase

### Frontend (Fase 3)
- [ ] Next.js com TailwindCSS
- [ ] Dashboard com filtros
- [ ] Página de detalhes do anúncio
- [ ] Sistema de favoritos

---

## 📚 ARQUITETURA

```
backend/
├── src/
│   ├── config/
│   │   ├── supabase.config.ts       # Conexão Supabase
│   │   └── facebook.config.ts       # Config Facebook
│   │
│   ├── ads/                          # Módulo de Anúncios
│   │   ├── entities/
│   │   │   └── ad.entity.ts         # Tipos
│   │   ├── dto/
│   │   │   ├── create-ad.dto.ts
│   │   │   ├── filter-ads.dto.ts
│   │   │   └── ad-response.dto.ts
│   │   ├── repositories/
│   │   │   └── ads.repository.ts    # Queries Supabase
│   │   ├── ads.service.ts           # Lógica de negócio
│   │   ├── ads.controller.ts        # Endpoints
│   │   └── ads.module.ts
│   │
│   ├── scraper/                      # Módulo de Scraping
│   │   ├── dto/
│   │   │   └── facebook-ad.dto.ts
│   │   ├── services/
│   │   │   ├── facebook-api.service.ts
│   │   │   ├── facebook-rate-limiter.service.ts
│   │   │   ├── ad-quality-filter.service.ts
│   │   │   ├── scraper.service.ts
│   │   │   └── scraper-scheduler.service.ts
│   │   ├── scraper.controller.ts
│   │   └── scraper.module.ts
│   │
│   ├── app.module.ts                 # Módulo raiz
│   ├── app.service.ts
│   └── main.ts                       # Entry point
│
├── .env                              # Variáveis (não commitar!)
├── .env.example                      # Exemplo
└── package.json
```

---

## 🎯 CONCLUSÃO

Você agora tem um backend completo e robusto para:
- ✅ Buscar anúncios escalados do Facebook Ads Library
- ✅ Filtrar apenas os melhores (Gold/Silver/Bronze)
- ✅ Salvar no Supabase com todas as métricas
- ✅ API REST completa com filtros e paginação
- ✅ Rate limiting para evitar ban
- ✅ Scraping automático com cron jobs

**Pronto para produção!** 🚀

Agora é só:
1. Configurar `.env` com suas credenciais
2. Executar `npm run start:dev`
3. Fazer primeiro scraping: `POST /scraper/run`
4. Consultar anúncios: `GET /ads`

**Dúvidas?** Consulte a documentação ou verifique os logs da aplicação.

