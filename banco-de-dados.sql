-- ============================================
-- SCRIPT COMPLETO DO BANCO DE DADOS
-- Site de Anúncios Escalados do Facebook Ads
-- ============================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. TABELA DE USUÁRIOS
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- 2. TABELA DE ASSINATURAS (HOTMART)
-- ============================================
CREATE TYPE subscription_status AS ENUM ('active', 'inactive', 'cancelled', 'delayed', 'refunded');

CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    hotmart_transaction_id TEXT UNIQUE,
    hotmart_subscriber_code TEXT,
    status subscription_status DEFAULT 'inactive',
    plan_name TEXT,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    last_webhook_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para buscar assinatura ativa do usuário rapidamente
CREATE INDEX idx_subscriptions_user_status ON subscriptions(user_id, status);
CREATE INDEX idx_subscriptions_hotmart_transaction ON subscriptions(hotmart_transaction_id);

-- ============================================
-- 3. TABELA DE CATEGORIAS
-- ============================================
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. TABELA DE NICHOS
-- ============================================
CREATE TABLE niches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. TABELA DE ANÚNCIOS (CORE DA PLATAFORMA)
-- ============================================
CREATE TYPE ad_media_type AS ENUM ('image', 'video', 'carousel');
CREATE TYPE ad_quality_tier AS ENUM ('gold', 'silver', 'bronze');

CREATE TABLE ads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    facebook_ad_id TEXT UNIQUE NOT NULL,
    
    -- Informações básicas
    title TEXT NOT NULL,
    description TEXT,
    headline TEXT,
    call_to_action TEXT,
    
    -- Mídia
    media_type ad_media_type DEFAULT 'image',
    image_url TEXT,
    video_url TEXT,
    thumbnail_url TEXT,
    
    -- URLs
    landing_page_url TEXT,
    landing_page_domain TEXT,
    
    -- Categorização
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    niche_id UUID REFERENCES niches(id) ON DELETE SET NULL,
    
    -- Localização e Idioma (IMPORTANTE!)
    country_code TEXT NOT NULL, -- 'BR', 'US', 'ES', 'MX', etc
    country_name TEXT, -- 'Brasil', 'Estados Unidos', etc
    language_code TEXT, -- 'pt-BR', 'en-US', 'es-ES'
    
    -- Métricas de Validação (OURO!)
    estimated_daily_spend DECIMAL(10,2), -- Gasto diário estimado
    days_running INTEGER, -- Há quantos dias está rodando
    estimated_total_spend DECIMAL(12,2), -- Gasto total estimado
    performance_score INTEGER CHECK (performance_score BETWEEN 1 AND 100),
    engagement_rate DECIMAL(5,2), -- Taxa de engajamento estimada
    quality_tier ad_quality_tier DEFAULT 'bronze',
    
    -- Validação manual/automática
    is_validated BOOLEAN DEFAULT false,
    validated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    validated_at TIMESTAMP WITH TIME ZONE,
    validation_notes TEXT,
    
    -- Controle
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false, -- Anúncios em destaque
    views_count INTEGER DEFAULT 0,
    favorites_count INTEGER DEFAULT 0,
    
    -- Datas
    first_seen_date DATE, -- Primeira vez que vimos o anúncio
    last_seen_date DATE, -- Última vez ativo
    scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices importantes para performance
CREATE INDEX idx_ads_country ON ads(country_code);
CREATE INDEX idx_ads_quality_tier ON ads(quality_tier);
CREATE INDEX idx_ads_active ON ads(is_active);
CREATE INDEX idx_ads_category ON ads(category_id);
CREATE INDEX idx_ads_niche ON ads(niche_id);
CREATE INDEX idx_ads_performance ON ads(performance_score DESC);
CREATE INDEX idx_ads_days_running ON ads(days_running DESC);
CREATE INDEX idx_ads_validated ON ads(is_validated, quality_tier);

-- ============================================
-- 6. TABELA DE TAGS
-- ============================================
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE ad_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ad_id UUID NOT NULL REFERENCES ads(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(ad_id, tag_id)
);

CREATE INDEX idx_ad_tags_ad ON ad_tags(ad_id);
CREATE INDEX idx_ad_tags_tag ON ad_tags(tag_id);

-- ============================================
-- 7. TABELA DE FAVORITOS
-- ============================================
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ad_id UUID NOT NULL REFERENCES ads(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, ad_id)
);

CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_ad ON favorites(ad_id);

-- ============================================
-- 8. TABELA DE VISUALIZAÇÕES
-- ============================================
CREATE TABLE ad_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ad_id UUID NOT NULL REFERENCES ads(id) ON DELETE CASCADE,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    duration_seconds INTEGER,
    device_type TEXT,
    ip_address INET
);

CREATE INDEX idx_ad_views_user ON ad_views(user_id);
CREATE INDEX idx_ad_views_ad ON ad_views(ad_id);
CREATE INDEX idx_ad_views_date ON ad_views(viewed_at DESC);

-- ============================================
-- 9. TABELA DE LOGS DA HOTMART (WEBHOOKS)
-- ============================================
CREATE TABLE webhook_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type TEXT NOT NULL,
    payload JSONB NOT NULL,
    processed BOOLEAN DEFAULT false,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_webhook_logs_processed ON webhook_logs(processed, created_at);
CREATE INDEX idx_webhook_logs_event_type ON webhook_logs(event_type);

-- ============================================
-- 10. TABELA DE PAÍSES (REFERÊNCIA)
-- ============================================
CREATE TABLE countries (
    code TEXT PRIMARY KEY, -- 'BR', 'US', 'ES'
    name TEXT NOT NULL, -- 'Brasil', 'Estados Unidos'
    flag_emoji TEXT, -- 🇧🇷, 🇺🇸
    language_code TEXT, -- 'pt-BR', 'en-US'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir países principais
INSERT INTO countries (code, name, flag_emoji, language_code) VALUES
('BR', 'Brasil', '🇧🇷', 'pt-BR'),
('US', 'Estados Unidos', '🇺🇸', 'en-US'),
('ES', 'Espanha', '🇪🇸', 'es-ES'),
('MX', 'México', '🇲🇽', 'es-MX'),
('AR', 'Argentina', '🇦🇷', 'es-AR'),
('PT', 'Portugal', '🇵🇹', 'pt-PT'),
('GB', 'Reino Unido', '🇬🇧', 'en-GB'),
('CA', 'Canadá', '🇨🇦', 'en-CA'),
('AU', 'Austrália', '🇦🇺', 'en-AU'),
('FR', 'França', '🇫🇷', 'fr-FR'),
('DE', 'Alemanha', '🇩🇪', 'de-DE'),
('IT', 'Itália', '🇮🇹', 'it-IT');

-- ============================================
-- FUNÇÕES E TRIGGERS
-- ============================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ads_updated_at BEFORE UPDATE ON ads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para incrementar contador de visualizações
CREATE OR REPLACE FUNCTION increment_ad_views()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE ads SET views_count = views_count + 1 WHERE id = NEW.ad_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_views AFTER INSERT ON ad_views
    FOR EACH ROW EXECUTE FUNCTION increment_ad_views();

-- Função para incrementar contador de favoritos
CREATE OR REPLACE FUNCTION increment_favorites()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE ads SET favorites_count = favorites_count + 1 WHERE id = NEW.ad_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_favorites AFTER INSERT ON favorites
    FOR EACH ROW EXECUTE FUNCTION increment_favorites();

-- Função para decrementar favoritos ao remover
CREATE OR REPLACE FUNCTION decrement_favorites()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE ads SET favorites_count = favorites_count - 1 WHERE id = OLD.ad_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_decrement_favorites AFTER DELETE ON favorites
    FOR EACH ROW EXECUTE FUNCTION decrement_favorites();

-- ============================================
-- FUNCTION: Verificar se usuário tem assinatura ativa
-- ============================================
CREATE OR REPLACE FUNCTION user_has_active_subscription(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM subscriptions 
        WHERE user_id = user_uuid 
        AND status = 'active'
        AND (end_date IS NULL OR end_date > NOW())
    );
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Ativar RLS nas tabelas principais
ALTER TABLE ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Política: Usuários só veem anúncios se tiverem assinatura ativa
CREATE POLICY "Usuários com assinatura ativa podem ver anúncios"
    ON ads FOR SELECT
    USING (
        is_active = true 
        AND user_has_active_subscription(auth.uid())
    );

-- Política: Usuários podem ver apenas seus próprios favoritos
CREATE POLICY "Usuários veem apenas seus favoritos"
    ON favorites FOR ALL
    USING (user_id = auth.uid());

-- Política: Usuários veem apenas suas visualizações
CREATE POLICY "Usuários veem apenas suas visualizações"
    ON ad_views FOR ALL
    USING (user_id = auth.uid());

-- Política: Usuários veem apenas suas assinaturas
CREATE POLICY "Usuários veem apenas suas assinaturas"
    ON subscriptions FOR SELECT
    USING (user_id = auth.uid());

-- ============================================
-- VIEWS (VISÕES) ÚTEIS
-- ============================================

-- View: Anúncios Gold (Ouro) - Os melhores!
CREATE VIEW ads_gold AS
SELECT 
    a.*,
    c.name as category_name,
    n.name as niche_name,
    co.name as country_name,
    co.flag_emoji
FROM ads a
LEFT JOIN categories c ON a.category_id = c.id
LEFT JOIN niches n ON a.niche_id = n.id
LEFT JOIN countries co ON a.country_code = co.code
WHERE 
    a.quality_tier = 'gold'
    AND a.is_validated = true
    AND a.is_active = true
ORDER BY a.performance_score DESC, a.days_running DESC;

-- View: Anúncios mais visualizados
CREATE VIEW ads_trending AS
SELECT 
    a.*,
    c.name as category_name,
    n.name as niche_name,
    co.name as country_name
FROM ads a
LEFT JOIN categories c ON a.category_id = c.id
LEFT JOIN niches n ON a.niche_id = n.id
LEFT JOIN countries co ON a.country_code = co.code
WHERE a.is_active = true
ORDER BY a.views_count DESC, a.created_at DESC
LIMIT 50;

-- ============================================
-- DADOS INICIAIS (CATEGORIAS EXEMPLO)
-- ============================================
INSERT INTO categories (name, slug, description, icon) VALUES
('E-commerce', 'ecommerce', 'Lojas virtuais e vendas online', '🛒'),
('Infoprodutos', 'infoprodutos', 'Cursos e produtos digitais', '📚'),
('SaaS', 'saas', 'Software como serviço', '💻'),
('Serviços', 'servicos', 'Prestação de serviços', '🔧'),
('Imóveis', 'imoveis', 'Venda e locação de imóveis', '🏠'),
('Saúde', 'saude', 'Saúde e bem-estar', '🏥'),
('Beleza', 'beleza', 'Produtos de beleza e estética', '💄'),
('Fitness', 'fitness', 'Academia e exercícios', '💪'),
('Alimentação', 'alimentacao', 'Restaurantes e delivery', '🍔'),
('Educação', 'educacao', 'Escolas e cursos', '🎓');

-- ============================================
-- COMENTÁRIOS FINAIS
-- ============================================
COMMENT ON TABLE ads IS 'Tabela principal de anúncios escalados do Facebook Ads';
COMMENT ON COLUMN ads.quality_tier IS 'Nível de qualidade: gold (ouro), silver (prata), bronze';
COMMENT ON COLUMN ads.estimated_daily_spend IS 'Estimativa de quanto o anunciante gasta por dia';
COMMENT ON COLUMN ads.days_running IS 'Há quantos dias o anúncio está ativo (indica sucesso)';
COMMENT ON TABLE subscriptions IS 'Controle de assinaturas Hotmart';
COMMENT ON FUNCTION user_has_active_subscription IS 'Verifica se usuário pode acessar a plataforma';

-- ============================================
-- FIM DO SCRIPT
-- ============================================