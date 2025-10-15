# ⚡ QUICK START - GRINGADS BACKEND

## 1️⃣ Setup Rápido (5 minutos)

### Passo 1: Clonar e instalar
```bash
cd backend
npm install
```

### Passo 2: Configurar .env
```bash
cp .env.example .env
```

Edite `.env` e preencha:
```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-aqui
FACEBOOK_ACCESS_TOKEN=seu-token-aqui
FACEBOOK_APP_ID=seu-app-id
FACEBOOK_APP_SECRET=seu-secret
```

### Passo 3: Executar banco
No Supabase SQL Editor, execute: `banco-de-dados.sql`

### Passo 4: Rodar
```bash
npm run start:dev
```

---

## 2️⃣ Primeiro Scraping

### Via Terminal
```bash
curl -X POST http://localhost:3000/scraper/run \
  -H "Content-Type: application/json" \
  -d '{"countries": ["US"]}'
```

### Via código (teste rápido)
Adicione em `app.controller.ts`:
```typescript
@Get('test-scraping')
async testScraping() {
  return 'Vá em POST /scraper/run para executar';
}
```

---

## 3️⃣ Endpoints Principais

### Listar anúncios
```
GET /ads?limit=10&quality_tier=gold
```

### Anúncios Gold
```
GET /ads/gold
```

### Status do scraper
```
GET /scraper/status
```

### Executar scraping
```
POST /scraper/run
Body: { "countries": ["US", "GB"] }
```

---

## 4️⃣ Estrutura Criada

```
backend/src/
├── config/              # Configurações (Supabase + Facebook)
├── ads/                 # Módulo de anúncios (CRUD completo)
├── scraper/            # Módulo de scraping (Facebook API)
└── common/             # Constantes e utils
```

**Principais arquivos:**
- `app.module.ts` - Módulo raiz (tudo configurado)
- `ads/ads.controller.ts` - Endpoints de anúncios
- `scraper/scraper.controller.ts` - Endpoints de scraping
- `scraper/services/facebook-api.service.ts` - API do Facebook
- `scraper/services/ad-quality-filter.service.ts` - Filtros

---

## 5️⃣ O Que Foi Implementado

✅ **Configurações base** (Supabase + Facebook)  
✅ **Módulo Ads** (repository, service, controller)  
✅ **Módulo Scraper** (API + rate limiter + filtros)  
✅ **Sistema de qualidade** (Gold/Silver/Bronze)  
✅ **Rate limiting** (200 req/hora, delay 3s)  
✅ **Cron jobs** (scraping automático a cada 6h)  
✅ **DTOs e validações** (class-validator)  
✅ **Endpoints REST** (filtros, paginação, busca)  

---

## 6️⃣ Fluxo Completo

```
1. App inicia → Testa Supabase + Facebook
2. Cron job roda a cada 6h (ou manual via POST /scraper/run)
3. FacebookApiService busca anúncios (respeitando rate limit)
4. AdQualityFilterService filtra (só anúncios com 4+ dias)
5. AdQualityFilterService calcula score (Gold/Silver/Bronze)
6. AdsRepository salva no Supabase (upsert para evitar duplicatas)
7. Frontend consulta via GET /ads
```

---

## 7️⃣ Algoritmo de Qualidade

**Pontuação (0-100):**
- 🕐 Dias rodando: até 30 pontos
- 📝 Qualidade do texto: 15 pontos
- 🎯 Título + descrição: 20 pontos
- 🎬 Vídeo/Imagem: 20 pontos
- 📱 Múltiplas plataformas: 10 pontos
- 💰 Gasto estimado: 15 pontos
- 👀 Impressões: 10 pontos

**Classificação:**
- 🥇 Gold: 80+ pontos
- 🥈 Silver: 60-79 pontos
- 🥉 Bronze: < 60 pontos

---

## 8️⃣ Checklist de Verificação

Antes de usar em produção:

- [ ] Arquivo `.env` configurado
- [ ] Supabase com tabelas criadas (executou `banco-de-dados.sql`)
- [ ] Access token do Facebook válido (não expirou)
- [ ] Permissões do Facebook: `ads_read`, `pages_read_engagement`
- [ ] Token de longa duração (não expira em 24h)
- [ ] App rodando: `npm run start:dev`
- [ ] Teste: `curl http://localhost:3000`
- [ ] Primeiro scraping executado com sucesso

---

## 9️⃣ Troubleshooting Rápido

**Erro ao conectar Supabase?**
→ Verifique URL e KEY no `.env`

**Erro ao conectar Facebook?**
→ Verifique se token não expirou

**Nenhum anúncio encontrado?**
→ Normal se país/termo muito específico. Teste com `countries: ["US"]` sem `searchTerms`

**Rate limit atingido?**
→ Aguarde 1 hora ou ajuste `FACEBOOK_REQUESTS_PER_HOUR=150`

---

## 🔟 Próximos Passos

### Agora você pode:
1. ✅ Fazer scraping manual: `POST /scraper/run`
2. ✅ Consultar anúncios: `GET /ads`
3. ✅ Filtrar por qualidade: `GET /ads/gold`
4. ✅ Monitorar rate limit: `GET /scraper/status`

### Implementar depois (opcional):
- Auth com Supabase (módulo `auth/`)
- Webhooks Hotmart (módulo `subscriptions/`)
- Frontend Next.js

---

## 📚 Documentação Completa

Consulte: `SETUP_GUIDE.md` para documentação detalhada.

---

**Pronto! Backend completo e funcionando.** 🚀

Qualquer dúvida, verifique os logs da aplicação ou consulte os arquivos de documentação:
- `SETUP_GUIDE.md` - Guia completo
- `ENTENDENDO_FLUXO_VISUAL.md` - Como funciona o NestJS
- `PLANO_IMPLEMENTACAO.md` - Plano original
- `EXEMPLOS_CODIGO_PRONTO.md` - Exemplos de código

