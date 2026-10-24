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

  let tipoPedido = 'Para Hoje';
  if (form.isEncomenda && form.dataEncomenda && form.horaEncomenda) {
    tipoPedido = `📅 Encomenda: ${formatDateBR(form.dataEncomenda)} às ${form.horaEncomenda}`;
  }

  let entrega = 'Retirada na Loja';
  if (form.modoEntrega === 'delivery') {
    entrega = `Delivery (Bairro: ${bairroNome || 'A combinar'})`;
  }

  const itensTexto = cart
    .map(
      (item) =>
        `▪ ${item.qtd}x ${item.nome} - ${formatCurrency(item.prcCalculado * item.qtd)}`
    )
    .join('\n');

  let msg = `*NOVO PEDIDO - MEK DONUTS* 🍩\n\n`;
  msg += `👤 *Cliente:* ${form.nomeCliente.trim()}\n`;
  msg += `📱 *Telefone:* ${form.telCliente.trim()}\n`;
  msg += `⏳ *Tipo de Pedido:* ${tipoPedido}\n`;
  msg += `📦 *Entrega:* ${entrega}\n\n`;
  msg += `*ITENS DA SACOLA:*\n`;
  msg += `${itensTexto}\n\n`;
  msg += `Subtotal: ${formatCurrency(subtotal)}\n`;
  if (form.modoEntrega === 'delivery') {
    msg += `Taxa de Entrega: ${formatCurrency(taxa)}\n`;
  } else {
    msg += `Taxa de Entrega: R$ 0,00 (Retirada)\n`;
  }
  msg += `*TOTAL: ${formatCurrency(total)}*\n\n`;
  if (form.observacoes && form.observacoes.trim()) {
    msg += `📝 *Observações:* ${form.observacoes.trim()}\n\n`;
  }
  msg += `Por favor, me confirme o pedido e envie a chave PIX.`;

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
