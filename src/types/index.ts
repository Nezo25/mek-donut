export type Category = 'Todos' | 'Halloween' | 'Exclusivos' | 'Combos' | 'Bebidas';

export interface Product {
  id: string;
  nome: string;
  slug?: string;
  categoria: Category | string;
  preco: number;
  precoPromocional?: number;
  preco_promocional?: number;
  desc: string;
  descricao?: string;
  img: string;
  imagem_url?: string;
  tags?: string[];
  destaque?: boolean;
  disponivel?: boolean;
  ordem?: number;
  created_at?: string;
  updated_at?: string;
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
  endereco?: string;
  isEncomenda: boolean;
  dataEncomenda?: string;
  horaEncomenda?: string;
  observacoes?: string;
}
