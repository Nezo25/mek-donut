-- ==============================================================
-- MEK DONUTS • BANCO DE DADOS, STORAGE E POLÍTICAS RLS (SUPABASE)
-- Execute este script no SQL Editor do seu painel Supabase
-- ==============================================================

-- 1. EXTENSÕES
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================
-- 2. TABELA DE PRODUTOS (products)
-- ==============================================================
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    categoria TEXT NOT NULL CHECK (categoria IN ('Halloween', 'Exclusivos', 'Combos', 'Bebidas')),
    preco NUMERIC(10, 2) NOT NULL,
    preco_promocional NUMERIC(10, 2),
    descricao TEXT NOT NULL,
    imagem_url TEXT NOT NULL,
    disponivel BOOLEAN DEFAULT true NOT NULL,
    destaque BOOLEAN DEFAULT false NOT NULL,
    ordem INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trigger para atualizar automaticamente o updated_at
CREATE OR REPLACE FUNCTION update_products_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_products_updated_at ON public.products;
CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION update_products_updated_at();

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_products_categoria ON public.products (categoria);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products (slug);
CREATE INDEX IF NOT EXISTS idx_products_disponivel ON public.products (disponivel);
CREATE INDEX IF NOT EXISTS idx_products_ordem ON public.products (ordem ASC, created_at DESC);

-- ==============================================================
-- 3. ROW LEVEL SECURITY (RLS) - TABELA PRODUCTS
-- ==============================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Leitura pública para todos os visitantes (anônimos e autenticados)
DROP POLICY IF EXISTS "Leitura pública de produtos" ON public.products;
CREATE POLICY "Leitura pública de produtos"
ON public.products
FOR SELECT
TO anon, authenticated
USING (true);

-- Inserção estritamente limitada a usuários autenticados (administradores)
DROP POLICY IF EXISTS "Inserção de produtos apenas autenticados" ON public.products;
CREATE POLICY "Inserção de produtos apenas autenticados"
ON public.products
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Atualização estritamente limitada a usuários autenticados (administradores)
DROP POLICY IF EXISTS "Atualização de produtos apenas autenticados" ON public.products;
CREATE POLICY "Atualização de produtos apenas autenticados"
ON public.products
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Exclusão estritamente limitada a usuários autenticados (administradores)
DROP POLICY IF EXISTS "Deleção de produtos apenas autenticados" ON public.products;
CREATE POLICY "Deleção de produtos apenas autenticados"
ON public.products
FOR DELETE
TO authenticated
USING (true);

-- ==============================================================
-- 4. STORAGE BUCKET (produtos) & POLÍTICAS RLS DE STORAGE
-- ==============================================================
-- Criação do bucket 'produtos' com acesso público de leitura
INSERT INTO storage.buckets (id, name, public)
VALUES ('produtos', 'produtos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Leitura pública das imagens dos produtos no bucket 'produtos'
DROP POLICY IF EXISTS "Acesso público de leitura no bucket produtos" ON storage.objects;
CREATE POLICY "Acesso público de leitura no bucket produtos"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'produtos');

-- Upload permitido exclusivamente a usuários autenticados (admin)
DROP POLICY IF EXISTS "Upload no bucket produtos apenas autenticados" ON storage.objects;
CREATE POLICY "Upload no bucket produtos apenas autenticados"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'produtos');

-- Atualização de imagens permitida exclusivamente a usuários autenticados
DROP POLICY IF EXISTS "Atualização no bucket produtos apenas autenticados" ON storage.objects;
CREATE POLICY "Atualização no bucket produtos apenas autenticados"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'produtos');

-- Deleção de imagens permitida exclusivamente a usuários autenticados
DROP POLICY IF EXISTS "Deleção no bucket produtos apenas autenticados" ON storage.objects;
CREATE POLICY "Deleção no bucket produtos apenas autenticados"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'produtos');

-- ==============================================================
-- 5. TABELA DE PEDIDOS (pedidos) & POLÍTICAS RLS
-- ==============================================================
CREATE TABLE IF NOT EXISTS public.pedidos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    nome_cliente TEXT NOT NULL,
    telefone_cliente TEXT NOT NULL,
    modo_entrega TEXT NOT NULL CHECK (modo_entrega IN ('delivery', 'retirada')),
    bairro TEXT,
    taxa_entrega NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
    is_encomenda BOOLEAN DEFAULT false NOT NULL,
    data_encomenda DATE,
    hora_encomenda TIME WITHOUT TIME ZONE,
    observacoes TEXT,
    subtotal NUMERIC(10, 2) NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    status TEXT DEFAULT 'novo' CHECK (status IN ('novo', 'confirmado', 'preparando', 'saiu_para_entrega', 'entregue', 'cancelado')),
    itens JSONB NOT NULL DEFAULT '[]'::jsonb
);

ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir insercao anonima de pedidos" ON public.pedidos;
CREATE POLICY "Permitir insercao anonima de pedidos"
ON public.pedidos
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir leitura de pedidos autenticados" ON public.pedidos;
CREATE POLICY "Permitir leitura de pedidos autenticados"
ON public.pedidos
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Permitir atualizacao de pedidos autenticados" ON public.pedidos;
CREATE POLICY "Permitir atualizacao de pedidos autenticados"
ON public.pedidos
FOR UPDATE
TO authenticated
USING (true);

CREATE INDEX IF NOT EXISTS idx_pedidos_created_at ON public.pedidos (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pedidos_status ON public.pedidos (status);

-- ==============================================================
-- 6. DADOS INICIAIS (SEED) DO CARDÁPIO MEK DONUTS
-- ==============================================================
INSERT INTO public.products (nome, slug, categoria, preco, preco_promocional, descricao, imagem_url, disponivel, destaque, ordem)
VALUES
(
    'R.I.P Halloween',
    'rip-halloween',
    'Halloween',
    25.00,
    NULL,
    'Recheio generoso de Laka Oreo. Cobertura com chocolate nobre ao leite, biscoito Oreo triturado e biscoito Passatempo crocante.',
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    true,
    true,
    1
),
(
    'Homertella Especial',
    'homertella-especial',
    'Exclusivos',
    22.00,
    NULL,
    'Nosso clássico mais amado! Recheio farto de Nutella original. Cobertura de chocolate branco nobre sabor morango e granulados coloridos.',
    'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
    true,
    true,
    2
),
(
    'Bombom de Morango',
    'bombom-de-morango',
    'Exclusivos',
    24.00,
    NULL,
    'Pedaços frescos de morango selecionado com brigadeiro branco aveludado artesanal. Cobertura de chocolate ao leite nobre.',
    'https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?auto=format&fit=crop&w=800&q=80',
    true,
    true,
    3
),
(
    'Churros Cremoso de Fazenda',
    'churros-cremoso-de-fazenda',
    'Exclusivos',
    22.00,
    NULL,
    'Massa leve e sequinha recheada com doce de leite caseiro cremoso, envolta em açúcar cristal e canela aromática.',
    'https://images.unsplash.com/photo-1514517521153-1be72277b32f?auto=format&fit=crop&w=800&q=80',
    true,
    false,
    4
),
(
    'Pistache Sublime Dourado',
    'pistache-sublime-dourado',
    'Exclusivos',
    26.00,
    24.00,
    'Brigadeiro aveludado de pistache puro da Sicília, banhado em chocolate branco belga e salpicado com praliné crocante de pistache.',
    'https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?auto=format&fit=crop&w=800&q=80',
    true,
    true,
    5
),
(
    'Combo 3 Sabores Festivos',
    'combo-3-sabores-festivos',
    'Combos',
    84.00,
    78.00,
    'Caixa exclusiva com 3 sabores imperdíveis da temporada em embalagem para presente. Ideal para compartilhar momentos especiais.',
    'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80',
    true,
    true,
    6
),
(
    'Combo Dupla Aconchegante',
    'combo-dupla-aconchegante',
    'Combos',
    52.00,
    46.00,
    '2 donuts exclusivos à sua escolha acompanhados por 2 bebidas refrescantes. Perfeito para uma pausa a dois.',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    true,
    false,
    7
),
(
    'Coca Cola Zero 200ml',
    'coca-cola-zero-200ml',
    'Bebidas',
    5.00,
    NULL,
    'Refrigerante geladinho em lata compacta de 200ml, perfeito para acompanhar sua sobremesa.',
    'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    true,
    false,
    8
),
(
    'Cappuccino Italiano Cremoso',
    'cappuccino-italiano-cremoso',
    'Bebidas',
    12.00,
    NULL,
    'Café espresso especial com leite vaporizado sedoso, cacau 100% e um toque sutil de canela.',
    'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    true,
    false,
    9
),
(
    'Suco Natural Frutas Vermelhas 300ml',
    'suco-natural-frutas-vermelhas',
    'Bebidas',
    11.00,
    NULL,
    'Suco 100% natural de morango, amora e framboesa. Refrescante, leve e sem conservantes.',
    'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80',
    true,
    false,
    10
)
ON CONFLICT (slug) DO UPDATE 
SET 
    nome = EXCLUDED.nome,
    categoria = EXCLUDED.categoria,
    preco = EXCLUDED.preco,
    preco_promocional = EXCLUDED.preco_promocional,
    descricao = EXCLUDED.descricao,
    imagem_url = EXCLUDED.imagem_url,
    disponivel = EXCLUDED.disponivel,
    destaque = EXCLUDED.destaque,
    ordem = EXCLUDED.ordem;
