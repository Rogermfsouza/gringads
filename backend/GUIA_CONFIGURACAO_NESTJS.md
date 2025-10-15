# 📚 GUIA COMPLETO: CONFIGURAÇÃO NO NESTJS

## 🎯 O QUE SÃO ARQUIVOS DE CONFIGURAÇÃO?

### Conceito Básico
Imagina que você tem um app que precisa se conectar ao banco de dados. Você poderia escrever assim:

```typescript
// ❌ RUIM - Código fixo (hardcoded)
const url = 'https://meusupabase.supabase.co';
const key = '12345-chave-secreta';
```

**Problemas:**
1. Se você mudar de banco, tem que mudar o código
2. Se subir pro GitHub, sua senha fica exposta
3. No desenvolvimento usa um banco, na produção usa outro
4. Tem que recompilar o código toda vez que mudar algo

### Solução: Arquivos de Configuração
```typescript
// ✅ BOM - Configuração externa
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;
```

**Vantagens:**
1. ✅ Muda configuração sem mexer no código
2. ✅ Senhas ficam em arquivo `.env` (não vai pro GitHub)
3. ✅ Dev usa `.env.development`, produção usa `.env.production`
4. ✅ Mais seguro e profissional

---

## 📁 ESTRUTURA DE CONFIGURAÇÃO NO NESTJS

```
backend/
├── .env                          # Variáveis de ambiente (NUNCA commitar)
├── .env.example                   # Exemplo sem valores reais (pode commitar)
└── src/
    └── config/
        ├── supabase.config.ts    # Configuração do Supabase
        └── facebook.config.ts    # Configuração do Facebook
```

---

## 🔐 ARQUIVO .env (VARIÁVEIS DE AMBIENTE)

### O que é?
Um arquivo que guarda informações sensíveis e configurações do seu app.

### Como funciona?
```env
# Comentários começam com #
NOME_DA_VARIAVEL=valor

# Supabase
SUPABASE_URL=https://abc.supabase.co
SUPABASE_KEY=eyJhbGci...
```

### Explicação linha por linha do SEU .env:

```env
# Supabase
# ⬇️ URL da API do Supabase (onde seu banco tá hospedado)
SUPABASE_URL=sua-url

# ⬇️ Chave pública do Supabase (usada no frontend/backend básico)
SUPABASE_KEY=sua-key

# ⬇️ Chave de administrador (tem SUPER poderes, só backend)
SUPABASE_SERVICE_ROLE_KEY=key-admin

# Facebook Graph API
# ⬇️ Token de acesso para usar a API do Facebook
FACEBOOK_ACCESS_TOKEN=EAAQNyds1DGY...

# ⬇️ ID do seu app criado no Facebook Developers
FACEBOOK_APP_ID=1141060524117094

# ⬇️ Senha secreta do app (NUNCA compartilhar)
FACEBOOK_APP_SECRET=e686661062108df2c33bc732bfb85281

# Rate Limiting (Controle de requisições)
# ⬇️ Quantas requisições pode fazer por hora no Facebook (200 é o limite)
FACEBOOK_REQUESTS_PER_HOUR=200

# ⬇️ Delay em milissegundos entre cada requisição (3000 = 3 segundos)
SCRAPER_DELAY_MS=3000

# App (Configurações gerais)
# ⬇️ Porta onde o servidor vai rodar (http://localhost:3000)
PORT=3000

# ⬇️ Ambiente: development (dev) ou production (produção)
NODE_ENV=development
```

### Como o Node.js lê isso?
```typescript
// O Node.js transforma em um objeto:
process.env = {
  SUPABASE_URL: 'sua-url',
  SUPABASE_KEY: 'sua-key',
  PORT: '3000',
  // ... resto
}
```

---

## 📄 ARQUIVO .env.example

### Para que serve?
Um **modelo** do `.env` sem valores secretos, para outros devs saberem quais variáveis precisam.

```env
# .env.example (pode commitar no GitHub)

# Supabase
SUPABASE_URL=
SUPABASE_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Facebook
FACEBOOK_ACCESS_TOKEN=
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
```

**Como usar:**
1. Outro dev clona seu projeto
2. Copia `.env.example` → `.env`
3. Preenche com os valores reais dele

---

## ⚙️ ARQUIVO DE CONFIGURAÇÃO: supabase.config.ts

### O que é?
Uma **classe** que centraliza toda a configuração do Supabase no seu app.

### Estrutura Completa:

```typescript
// ===================================
// 1️⃣ IMPORTS (importações)
// ===================================

import { Injectable } from '@nestjs/common';
// ⬆️ Injectable: Decorator que transforma a classe em um "serviço"
//    que pode ser injetado em outras classes (Dependency Injection)

import { ConfigService } from '@nestjs/config';
// ⬆️ ConfigService: Serviço do NestJS que lê o arquivo .env
//    de forma tipada e segura

import { createClient, SupabaseClient } from '@supabase/supabase-js';
// ⬆️ createClient: Função que cria conexão com Supabase
// ⬆️ SupabaseClient: Tipo TypeScript do cliente Supabase

// ===================================
// 2️⃣ DECORATOR @Injectable()
// ===================================

@Injectable()
// ⬆️ Isso marca a classe como um "Provider" (provedor)
//    Permite que o NestJS injete essa classe em outras

// ===================================
// 3️⃣ CLASSE DE CONFIGURAÇÃO
// ===================================

export class SupabaseConfigService {
  // ⬆️ "export" permite usar em outros arquivos
  // ⬆️ "SupabaseConfigService" é o nome da classe (padrão: XXXService)

  // -----------------------------------
  // 3.1 PROPRIEDADES PRIVADAS
  // -----------------------------------
  
  private supabaseClient: SupabaseClient;
  // ⬆️ "private" = só pode ser acessado dentro da classe
  // ⬆️ "supabaseClient" = variável que guarda a conexão
  // ⬆️ ": SupabaseClient" = tipo TypeScript (garante que é do Supabase)

  // -----------------------------------
  // 3.2 CONSTRUTOR (roda quando cria a classe)
  // -----------------------------------
  
  constructor(private configService: ConfigService) {
    // ⬆️ "constructor" = método especial que roda ao criar a instância
    // ⬆️ "private configService: ConfigService" = injeta o ConfigService
    //    E já cria uma propriedade privada "this.configService"

    // Pega as variáveis do .env
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    // ⬆️ "this.configService.get" = lê variável do .env
    // ⬆️ "<string>" = tipo TypeScript (retorna uma string)
    // ⬆️ "'SUPABASE_URL'" = nome da variável no .env

    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');
    // ⬆️ Mesma coisa, pega a chave do Supabase

    // Valida se as variáveis existem
    if (!supabaseUrl || !supabaseKey) {
      // ⬆️ Se não tiver URL ou KEY, lança erro
      throw new Error(
        'SUPABASE_URL e SUPABASE_KEY devem estar definidos no .env',
      );
    }

    // Cria a conexão com Supabase
    this.supabaseClient = createClient(supabaseUrl, supabaseKey);
    // ⬆️ "createClient" = função do Supabase que cria conexão
    // ⬆️ Passa URL e KEY como parâmetros
    // ⬆️ Guarda na propriedade "this.supabaseClient"
  }

  // -----------------------------------
  // 3.3 MÉTODO GETTER (pega o cliente)
  // -----------------------------------
  
  getClient(): SupabaseClient {
    // ⬆️ Método público que retorna o cliente
    // ⬆️ ": SupabaseClient" = tipo de retorno
    
    return this.supabaseClient;
    // ⬆️ Retorna a conexão criada no construtor
  }
}
```

### Como funciona na prática?

```typescript
// Em outro arquivo (ex: ads.service.ts)
import { Injectable } from '@nestjs/common';
import { SupabaseConfigService } from './config/supabase.config';

@Injectable()
export class AdsService {
  constructor(private supabaseConfig: SupabaseConfigService) {}
  // ⬆️ NestJS injeta automaticamente o SupabaseConfigService

  async buscarAnuncios() {
    const supabase = this.supabaseConfig.getClient();
    // ⬆️ Pega o cliente do Supabase
    
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .limit(10);
    // ⬆️ Faz query no banco
    
    return data;
  }
}
```

---

## ⚙️ ARQUIVO DE CONFIGURAÇÃO: facebook.config.ts

### Estrutura Completa:

```typescript
// ===================================
// 1️⃣ IMPORTS
// ===================================

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ===================================
// 2️⃣ INTERFACE (Tipo de dados)
// ===================================

export interface FacebookConfig {
  // ⬆️ "interface" = contrato TypeScript que define estrutura
  
  accessToken: string;
  // ⬆️ Token de acesso do Facebook
  
  appId: string;
  // ⬆️ ID do app
  
  appSecret: string;
  // ⬆️ Senha secreta
  
  requestsPerHour: number;
  // ⬆️ Limite de requisições (número)
  
  scraperDelayMs: number;
  // ⬆️ Delay entre requests
}

// ===================================
// 3️⃣ CLASSE DE CONFIGURAÇÃO
// ===================================

@Injectable()
export class FacebookConfigService {
  
  constructor(private configService: ConfigService) {}
  // ⬆️ Injeta ConfigService

  // -----------------------------------
  // 3.1 MÉTODO QUE RETORNA CONFIGURAÇÕES
  // -----------------------------------
  
  getConfig(): FacebookConfig {
    // ⬆️ Retorna objeto com todas configs do Facebook
    
    const accessToken = this.configService.get<string>(
      'FACEBOOK_ACCESS_TOKEN',
    );
    const appId = this.configService.get<string>('FACEBOOK_APP_ID');
    const appSecret = this.configService.get<string>('FACEBOOK_APP_SECRET');
    
    // Pega números (com valores padrão)
    const requestsPerHour = this.configService.get<number>(
      'FACEBOOK_REQUESTS_PER_HOUR',
      200, // ⬅️ Valor padrão se não existir no .env
    );
    
    const scraperDelayMs = this.configService.get<number>(
      'SCRAPER_DELAY_MS',
      3000, // ⬅️ Padrão: 3 segundos
    );

    // Valida se variáveis obrigatórias existem
    if (!accessToken || !appId || !appSecret) {
      throw new Error(
        'Variáveis do Facebook não configuradas no .env',
      );
    }

    // Retorna objeto tipado
    return {
      accessToken,
      appId,
      appSecret,
      requestsPerHour,
      scraperDelayMs,
    };
  }

  // -----------------------------------
  // 3.2 MÉTODOS AUXILIARES (opcional)
  // -----------------------------------
  
  getAccessToken(): string {
    return this.getConfig().accessToken;
  }

  getRateLimit(): number {
    return this.getConfig().requestsPerHour;
  }
}
```

---

## 🔧 CONFIGURAR NO AppModule

### O que é AppModule?
O **módulo raiz** da aplicação. É onde você registra tudo.

### Configuração Completa:

```typescript
import { Module } from '@nestjs/common';
// ⬆️ Decorator para criar módulos

import { ConfigModule } from '@nestjs/config';
// ⬆️ Módulo oficial do NestJS para ler .env

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseConfigService } from './config/supabase.config';
import { FacebookConfigService } from './config/facebook.config';

@Module({
  // ⬆️ Decorator que marca a classe como módulo
  
  imports: [
    // ⬆️ "imports" = outros módulos que você quer usar
    
    ConfigModule.forRoot({
      // ⬆️ ConfigModule = módulo que lê .env
      // ⬆️ ".forRoot()" = configura para toda aplicação
      
      isGlobal: true,
      // ⬆️ "isGlobal: true" = disponível em TODOS os módulos
      //    Não precisa importar em cada módulo separado
      
      envFilePath: '.env',
      // ⬆️ Caminho do arquivo .env (pode ter múltiplos)
      //    Ex: ['.env.development', '.env']
      
      cache: true,
      // ⬆️ "cache: true" = guarda na memória (mais rápido)
    }),
  ],
  
  controllers: [AppController],
  // ⬆️ Controllers = classes que recebem requisições HTTP
  
  providers: [
    AppService,
    SupabaseConfigService,
    FacebookConfigService,
  ],
  // ⬆️ "providers" = services/configs que podem ser injetados
  //    Lista todas as classes @Injectable() que você criou
})
export class AppModule {}
```

---

## 🎓 CONCEITOS IMPORTANTES

### 1️⃣ Dependency Injection (Injeção de Dependência)

**Problema sem DI:**
```typescript
// ❌ Ruim - cria manualmente
class AdsService {
  private config = new FacebookConfigService();
  // Tem que criar manualmente, difícil de testar
}
```

**Com DI (NestJS):**
```typescript
// ✅ Bom - NestJS injeta automaticamente
class AdsService {
  constructor(private config: FacebookConfigService) {}
  // NestJS cria e passa automaticamente
}
```

**Vantagens:**
- ✅ Código mais limpo
- ✅ Fácil de testar (mock das dependências)
- ✅ Fácil de trocar implementações

---

### 2️⃣ @Injectable() Decorator

```typescript
@Injectable()
export class MinhaClasse {
  // Isso faz:
  // 1. Marca como "Provider"
  // 2. Permite injetar em outras classes
  // 3. NestJS gerencia o ciclo de vida
}
```

---

### 3️⃣ ConfigService

```typescript
constructor(private configService: ConfigService) {
  // Pega string
  const url = this.configService.get<string>('SUPABASE_URL');
  
  // Pega número
  const port = this.configService.get<number>('PORT');
  
  // Com valor padrão
  const delay = this.configService.get<number>('DELAY', 1000);
  
  // Obrigatório (lança erro se não existir)
  const key = this.configService.getOrThrow<string>('API_KEY');
}
```

---

## 🚀 FLUXO COMPLETO NA PRÁTICA

### 1. App inicia
```
main.ts
  ↓
AppModule carrega
  ↓
ConfigModule lê .env
  ↓
Cria SupabaseConfigService
  ↓
Injeta ConfigService no constructor
  ↓
Constructor roda e cria conexão
```

### 2. Fazendo requisição
```
HTTP Request chega
  ↓
Controller recebe
  ↓
Controller chama Service
  ↓
Service usa SupabaseConfigService
  ↓
Pega cliente: getClient()
  ↓
Faz query no banco
  ↓
Retorna resposta
```

---

## 📝 RESUMO VISUAL

```
┌─────────────────────────────────────────────────────┐
│                    .env (arquivo)                    │
│  SUPABASE_URL=...                                    │
│  FACEBOOK_ACCESS_TOKEN=...                           │
└─────────────────────────────────────────────────────┘
                        ↓ (lido por)
┌─────────────────────────────────────────────────────┐
│              ConfigModule (@nestjs/config)           │
│  - Lê .env                                           │
│  - Disponibiliza ConfigService                       │
└─────────────────────────────────────────────────────┘
                        ↓ (usado por)
┌─────────────────────────────────────────────────────┐
│         SupabaseConfigService / FacebookConfigService│
│  - Recebe ConfigService via constructor              │
│  - Valida variáveis                                  │
│  - Cria conexões/configs                             │
└─────────────────────────────────────────────────────┘
                        ↓ (injetado em)
┌─────────────────────────────────────────────────────┐
│              Services (AdsService, etc)              │
│  - Usa as configs para fazer operações              │
└─────────────────────────────────────────────────────┘
```

---

## ✅ CHECKLIST PARA VOCÊ

- [ ] Criar `.env` com todas variáveis
- [ ] Criar `.env.example` (sem valores)
- [ ] Adicionar `.env` no `.gitignore`
- [ ] Criar `src/config/supabase.config.ts`
- [ ] Criar `src/config/facebook.config.ts`
- [ ] Importar `ConfigModule` no `AppModule`
- [ ] Adicionar configs nos `providers` do `AppModule`
- [ ] Testar se tá funcionando

---

## 🎯 EXEMPLO PRÁTICO COMPLETO

Vou criar os arquivos prontos na próxima mensagem! 🚀
