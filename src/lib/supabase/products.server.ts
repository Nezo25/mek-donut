import { Product } from '@/types';
import { products as fallbackProducts } from '@/data/products';
import { createServerSupabaseClient } from './server';
import { normalizeProduct } from './products';

export async function getProductsServer(): Promise<Product[]> {
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) {
      return fallbackProducts.map(normalizeProduct);
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('ordem', { ascending: true })
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) {
        console.warn('Erro ao buscar produtos do Supabase (utilizando catálogo estático fallback):', error.message);
      }
      return fallbackProducts.map(normalizeProduct);
    }

    return data.map(normalizeProduct);
  } catch (err) {
    console.warn('Exceção ao buscar produtos no Supabase (usando fallback):', err);
    return fallbackProducts.map(normalizeProduct);
  }
}
