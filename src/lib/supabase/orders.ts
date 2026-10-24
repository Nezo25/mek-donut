import { createClient } from './client';
import { CartItem, OrderForm } from '@/types';

export interface SalvarPedidoParams {
  items: CartItem[];
  form: OrderForm;
  taxa: number;
  subtotal: number;
  total: number;
  bairroNome?: string;
}

export async function salvarPedidoSupabase({
  items,
  form,
  taxa,
  subtotal,
  total,
  bairroNome,
}: SalvarPedidoParams) {
  try {
    const supabase = createClient();
    if (!supabase) {
      console.warn('Supabase não configurado (.env.local ausente). O pedido prosseguirá via WhatsApp normalmente.');
      return { success: false, reason: 'unconfigured' };
    }

    const payload = {
      nome_cliente: form.nomeCliente.trim(),
      telefone_cliente: form.telCliente.trim(),
      modo_entrega: form.modoEntrega,
      bairro: form.modoEntrega === 'delivery' ? (bairroNome || 'A combinar') : null,
      taxa_entrega: taxa,
      is_encomenda: form.isEncomenda,
      data_encomenda: form.isEncomenda ? form.dataEncomenda : null,
      hora_encomenda: form.isEncomenda ? form.horaEncomenda : null,
      observacoes: form.observacoes?.trim() || null,
      subtotal: subtotal,
      total: total,
      status: 'novo',
      itens: items.map((i) => ({
        id: i.id,
        nome: i.nome,
        categoria: i.categoria,
        quantidade: i.qtd,
        preco_unitario: i.prcCalculado,
        total_item: i.prcCalculado * i.qtd,
      })),
    };

    const { data, error } = await supabase
      .from('pedidos')
      .insert([payload])
      .select('id')
      .single();

    if (error) {
      console.error('Erro ao salvar pedido no Supabase:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, pedidoId: data?.id };
  } catch (err) {
    console.error('Exceção ao comunicar com Supabase:', err);
    return { success: false, error: String(err) };
  }
}
