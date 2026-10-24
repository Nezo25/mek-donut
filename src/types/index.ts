export type Category = 'Todos' | 'Halloween' | 'Exclusivos' | 'Combos' | 'Bebidas';

export interface Product {
  id: string;
  nome: string;
  categoria: Category | string;
  preco: number;
  precoPromocional?: number;
  desc: string;
  img: string;
  tags?: string[];
  destaque?: boolean;
}

export interface CartItem extends Product {
  qtd: number;
  prcCalculado: number;
}

export type DeliveryMode = 'delivery' | 'retirada';

export interface BairroOption {
  id: string;
  label: string;
  taxa: number;
}

export interface OrderForm {
  nomeCliente: string;
  telCliente: string;
  modoEntrega: DeliveryMode;
  bairroId?: string;
  isEncomenda: boolean;
  dataEncomenda?: string;
  horaEncomenda?: string;
  observacoes?: string;
}
