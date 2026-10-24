-- ==============================================================
-- MEK DONUTS • TABELA DE PEDIDOS NO SUPABASE
-- Execute este script no SQL Editor do seu projeto Supabase
-- ==============================================================

-- 1. Criar a tabela de pedidos
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

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;

-- 3. Permitir que clientes anônimos insiram novos pedidos (triagem pública)
CREATE POLICY "Permitir insercao anonima de pedidos"
ON public.pedidos
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Permitir que apenas usuários autenticados leiam/atualizem todos os pedidos (dashboard administrativo)
CREATE POLICY "Permitir leitura de pedidos autenticados"
ON public.pedidos
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Permitir atualizacao de pedidos autenticados"
ON public.pedidos
FOR UPDATE
TO authenticated
USING (true);

-- 5. Criar índices para consultas rápidas por data e status
CREATE INDEX IF NOT EXISTS idx_pedidos_created_at ON public.pedidos (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pedidos_status ON public.pedidos (status);
