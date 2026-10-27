import { Product } from '@/types';
import { products as fallbackProducts } from '@/data/products';
import { createClient } from './client';
import { slugify } from '@/utils/slugify';

export { slugify };

export function normalizeProduct(raw: any): Product {
  const preco = Number(raw.preco) || 0;
  const precoPromocional = raw.preco_promocional != null ? Number(raw.preco_promocional) : (raw.precoPromocional != null ? Number(raw.precoPromocional) : undefined);
  const desc = raw.descricao || raw.desc || '';
  const img = raw.imagem_url || raw.img || 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80';

  return {
    id: String(raw.id),
    nome: raw.nome || '',
    slug: raw.slug || (raw.nome ? slugify(raw.nome) : String(raw.id)),
    categoria: raw.categoria || 'Exclusivos',
    preco,
    precoPromocional,
    preco_promocional: precoPromocional,
    desc,
    descricao: desc,
    img,
    imagem_url: img,
    destaque: Boolean(raw.destaque),
    disponivel: raw.disponivel !== false,
    ordem: Number(raw.ordem) || 0,
    tags: Array.isArray(raw.tags) ? raw.tags : (raw.destaque ? ['Destaque'] : undefined),
    created_at: raw.created_at,
    updated_at: raw.updated_at,
  };
}

export async function getProductsClient(): Promise<Product[]> {
  try {
    const supabase = createClient();
    if (!supabase) {
      return fallbackProducts.map(normalizeProduct);
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('ordem', { ascending: true })
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackProducts.map(normalizeProduct);
    }

    return data.map(normalizeProduct);
  } catch (err) {
    return fallbackProducts.map(normalizeProduct);
  }
}
