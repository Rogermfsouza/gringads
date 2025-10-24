# GringADS - Frontend

Landing page completa para o GringADS, a maior plataforma de swipe de ofertas gringas escaladas.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Framework CSS utilitário
- **Lucide React** - Ícones modernos
- **Geist Font** - Tipografia otimizada

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Layout principal com SEO
│   ├── page.tsx           # Página inicial
│   └── globals.css        # Estilos globais
├── components/
│   ├── Header.tsx         # Cabeçalho com navegação
│   ├── HeroSection.tsx    # Seção principal
│   ├── HowItWorksSection.tsx # Como funciona
│   ├── MarketsSection.tsx # Seção dos mercados
│   ├── BenefitsSection.tsx # Benefícios
│   ├── FeaturedProductsSection.tsx # Produtos em destaque
│   └── Footer.tsx         # Rodapé
```

## 🎨 Seções da Landing Page

1. **Header** - Navegação responsiva com logo e CTAs
2. **Hero Section** - Proposta principal com headline impactante
3. **Como Funciona** - 3 passos: Copie, Cole, Escale
4. **Mercados** - Latam, Americano e Europeu
5. **Benefícios** - Vantagens do GringADS
6. **Produtos em Destaque** - Grid de produtos populares
7. **Footer** - Links importantes e contato

## 🖼️ Imagens Necessárias

Para completar a implementação, você precisará adicionar as seguintes imagens na pasta `public/`:

### Imagens Obrigatórias:
- `og-image.jpg` (1200x630px) - Imagem para Open Graph
- `logo.png` - Logo do GringADS (opcional, usando ícone por enquanto)

### Imagens dos Produtos:
- `products/curso-marketing.jpg` (300x200px)
- `products/sistema-dropshipping.jpg` (300x200px)
- `products/estrategias-vendas.jpg` (300x200px)
- `products/automacao-marketing.jpg` (300x200px)

### Imagens dos Mercados:
- `markets/latam.jpg` (400x300px)
- `markets/americano.jpg` (400x300px)
- `markets/europeu.jpg` (400x300px)

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar build de produção
npm start
```

Acesse [http://localhost:3000](http://localhost:3000) para ver o resultado.

## 📱 Responsividade

A landing page é totalmente responsiva e otimizada para:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## ⚡ Performance

- **SEO Otimizado** - Meta tags completas, Open Graph, Twitter Cards
- **Core Web Vitals** - Otimizado para velocidade e experiência
- **Imagens Otimizadas** - WebP e AVIF suportados
- **Compressão** - Gzip habilitado
- **Cache Headers** - Headers de segurança configurados

## 🎯 Conversão

A landing page foi desenvolvida com foco em conversão:
- **CTAs Estratégicos** - Botões de ação bem posicionados
- **Prova Social** - Estatísticas e depoimentos
- **Urgência** - Elementos que criam senso de urgência
- **Benefícios Claros** - Valor proposição bem definida
- **Design Limpo** - Interface moderna e profissional

## 🔧 Personalização

Para personalizar cores, textos ou layout, edite os componentes em `src/components/` e os estilos em `src/app/globals.css`.

## 📈 Analytics

Configure Google Analytics ou outras ferramentas de tracking nos componentes conforme necessário.
