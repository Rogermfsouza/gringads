# 🔑 COMO OBTER TOKEN VÁLIDO DO FACEBOOK

## ⚠️ PROBLEMA COMUM

Se você está vendo este erro:
```
⚠️ Erro do servidor Facebook. Tentando novamente...
❌ ERRO DE AUTENTICAÇÃO/PERMISSÃO
```

Significa que seu **FACEBOOK_ACCESS_TOKEN está inválido ou expirado**.

---

## 📝 PASSO A PASSO COMPLETO

### 1️⃣ Acessar Facebook Developers

Vá em: https://developers.facebook.com/apps

**Se não tem app criado:**
- Clique em "Create App"
- Escolha tipo: **"Business"**
- Preencha nome do app
- Crie o app

### 2️⃣ Adicionar Produto "Marketing API"

1. No painel do app, vá em **"Add Product"**
2. Procure **"Marketing API"**
3. Clique em **"Set Up"**

### 3️⃣ Gerar Access Token

Opção A - **Graph API Explorer (Rápido, mas expira):**

1. Vá em: https://developers.facebook.com/tools/explorer
2. Selecione seu app no dropdown
3. Em "Permissions", adicione:
   - `ads_read`
   - `pages_read_engagement`
4. Clique em "Generate Access Token"
5. Copie o token

**⚠️ PROBLEMA:** Este token **expira em 1-2 horas!**

---

Opção B - **Token de Longa Duração (Recomendado):**

#### Passo 1: Gerar Token Curto
- Siga Opção A acima para gerar token curto

#### Passo 2: Trocar por Token Longo
Rode este comando (substitua os valores):

```bash
# Windows PowerShell
$appId = "SEU_APP_ID"
$appSecret = "SEU_APP_SECRET"
$tokenCurto = "TOKEN_CURTO_DO_GRAPH_EXPLORER"

$url = "https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=$appId&client_secret=$appSecret&fb_exchange_token=$tokenCurto"

Invoke-RestMethod -Uri $url
```

**Resultado:**
```json
{
  "access_token": "TOKEN_LONGO_AQUI",
  "token_type": "bearer",
  "expires_in": 5183944
}
```

Este token dura **~60 dias**! 🎉

#### Passo 3: Usar Token Longo
Copie o `access_token` do resultado e cole no `.env`:

```env
FACEBOOK_ACCESS_TOKEN=TOKEN_LONGO_AQUI
```

---

### 4️⃣ Verificar Permissões

Vá em: https://developers.facebook.com/tools/debug/accesstoken/

Cole seu token e verifique:
- ✅ Permissão `ads_read` está presente
- ✅ Token não está expirado
- ✅ Válido para seu app

---

## 🔧 ALTERNATIVA: System User Token (Para Produção)

**Vantagem:** Token que **NUNCA expira**!

### Passo 1: Criar Business Manager
1. Acesse: https://business.facebook.com
2. Crie um Business Manager (se não tem)

### Passo 2: Criar System User
1. No Business Manager, vá em **"Business Settings"**
2. Clique em **"Users" → "System Users"**
3. Clique em **"Add"**
4. Nome: "Gringads API"
5. Role: **Admin**

### Passo 3: Gerar Token Permanente
1. Clique no System User criado
2. Clique em **"Generate New Token"**
3. Selecione seu app
4. Marque permissões:
   - `ads_read`
   - `pages_read_engagement`
5. Duração: **"Never Expire"** (60 dias renováveis automaticamente)
6. Clique em **"Generate Token"**
7. **COPIE E SALVE O TOKEN!** (não vai mostrar de novo)

### Passo 4: Atribuir Permissões de Ads Account
1. No Business Settings, vá em **"Accounts" → "Ad Accounts"**
2. Selecione sua conta de anúncios
3. Clique em **"Add People"**
4. Adicione o System User
5. Permissão: **"View performance"** ou **"Standard access"**

Pronto! Token que nunca expira! 🎉

---

## ✅ TESTAR TOKEN

Depois de configurar, teste assim:

```powershell
# Windows PowerShell
$token = "SEU_TOKEN_AQUI"

$url = "https://graph.facebook.com/v21.0/ads_archive?access_token=$token&ad_reached_countries=['US']&ad_active_status=ACTIVE&search_terms=&fields=id,page_name&limit=5"

Invoke-RestMethod -Uri $url
```

**Resposta esperada:**
```json
{
  "data": [
    { "id": "123...", "page_name": "..." },
    ...
  ]
}
```

Se retornar dados = Token funciona! ✅

Se retornar erro = Token inválido ❌

---

## 🚀 DEPOIS DE OBTER TOKEN VÁLIDO

### 1. Atualizar .env
```env
FACEBOOK_ACCESS_TOKEN=seu-token-longo-aqui
```

### 2. Reiniciar aplicação
```bash
# Parar (Ctrl+C se estiver rodando)

# Rodar novamente
npm run start:dev
```

### 3. Testar scraping manual
```powershell
$body = @{ countries = @("US") } | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/scraper/run" -Method POST -Body $body -ContentType "application/json"
```

### 4. Ativar scraping automático (opcional)
Só depois que o manual funcionar:

```env
# .env
ENABLE_AUTO_SCRAPING=true
```

---

## 🐛 PROBLEMAS COMUNS

### Erro: "Invalid OAuth access token"
- Token expirado ou inválido
- Gere novo token de longa duração

### Erro: "Permissions error"
- Token não tem permissão `ads_read`
- Gere novo token com permissões corretas

### Erro: "Application does not have permission"
- App não tem Marketing API ativado
- Vá em App → Add Product → Marketing API

### Erro: "Rate limit exceeded"
- Fez muitas requisições
- Aguarde 1 hora ou use outro token

---

## 📚 LINKS ÚTEIS

- **Facebook Developers:** https://developers.facebook.com
- **Graph API Explorer:** https://developers.facebook.com/tools/explorer
- **Token Debugger:** https://developers.facebook.com/tools/debug/accesstoken
- **Business Manager:** https://business.facebook.com
- **Ads Library API Docs:** https://developers.facebook.com/docs/marketing-api/ad-library-api

---

## 💡 DICA PRO

Para desenvolvimento, use **token de longa duração** (60 dias).

Para produção, use **System User token** (nunca expira).

**Lembre-se:** Nunca commite o token no Git! Use sempre `.env`

