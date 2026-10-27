import { CartItem, OrderForm } from '@/types';
import { formatCurrency, formatDateBR } from './formatters';

export const MEK_WHATSAPP_NUMBER = '5511975049091';

export function buildWhatsAppMessage(
  cart: CartItem[],
  form: OrderForm,
  taxa: number,
  bairroNome?: string
): string {
  const subtotal = cart.reduce((acc, item) => acc + item.prcCalculado * item.qtd, 0);
  const total = subtotal + taxa;

  let tipoPedido = '⚡ Imediato (Para Hoje)';
  if (form.isEncomenda && form.dataEncomenda && form.horaEncomenda) {
    tipoPedido = `📅 Encomenda Agendada para ${formatDateBR(form.dataEncomenda)} às ${form.horaEncomenda}`;
  }

  let entrega = '🏬 Retirada na Loja (R$ 0,00 - Rua Conselheiro Rodrigues Alves, 42)';
  if (form.modoEntrega === 'delivery') {
    entrega = `🛵 Delivery\n📍 *Bairro:* ${bairroNome || 'Bragança Paulista'}`;
    if (form.endereco && form.endereco.trim()) {
      entrega += `\n🏠 *Endereço:* ${form.endereco.trim()}`;
    }
  }

  const itensTexto = cart
    .map(
      (item) =>
        `▪ ${item.qtd}x *${item.nome}* — ${formatCurrency(item.prcCalculado * item.qtd)} (${formatCurrency(item.prcCalculado)}/un)`
    )
    .join('\n');

  let msg = `*NOVO PEDIDO - MEK DONUTS* 🍩\n\n`;
  msg += `👤 *Cliente:* ${form.nomeCliente.trim()}\n`;
  msg += `📱 *WhatsApp:* ${form.telCliente.trim()}\n`;
  msg += `⏳ *Tipo de Pedido:* ${tipoPedido}\n`;
  msg += `📦 *Modalidade:* ${entrega}\n\n`;
  msg += `*ITENS DA SACOLA:*\n`;
  msg += `${itensTexto}\n\n`;
  msg += `─────────────────────────\n`;
  msg += `Subtotal: ${formatCurrency(subtotal)}\n`;
  if (form.modoEntrega === 'delivery') {
    msg += `Taxa de Entrega: ${formatCurrency(taxa)}\n`;
  } else {
    msg += `Taxa de Entrega: R$ 0,00 (Retirada Gratuita)\n`;
  }
  msg += `*TOTAL: ${formatCurrency(total)}*\n`;
  msg += `─────────────────────────\n\n`;
  if (form.observacoes && form.observacoes.trim()) {
    msg += `📝 *Observações:* ${form.observacoes.trim()}\n\n`;
  }
  msg += `Olá Mayra e Kiko! Finalizei meu pedido pelo site. Por favor, me confirmem o pedido e enviem a chave PIX para pagamento! 🍩✨`;

  return msg;
}

export function buildWhatsAppUrl(
  cart: CartItem[],
  form: OrderForm,
  taxa: number,
  bairroNome?: string
): string {
  const message = buildWhatsAppMessage(cart, form, taxa, bairroNome);
  return `https://wa.me/${MEK_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
