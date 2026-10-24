'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '@/types';
import { formatCurrency } from '@/utils/formatters';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  taxa: number;
  total: number;
  isRetirada: boolean;
  onUpdateQuantity: (id: string, qtd: number) => void;
  onRemoveItem: (id: string) => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  taxa,
  total,
  isRetirada,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-pink-100 text-center shadow-sm">
        <div className="w-16 h-16 bg-brand-surface rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
          🍩
        </div>
        <h3 className="font-serif text-2xl font-bold text-brand-dark mb-2">
          Sua sacola está vazia
        </h3>
        <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
          Explore nossos donuts artesanais, combos e bebidas e adicione suas delícias favoritas antes de prosseguir com a triagem.
        </p>
        <Link
          href="/cardapio"
          className="inline-flex items-center gap-2 bg-brand-primary text-white font-bold px-6 py-3 rounded-full hover:bg-[#d01754] transition-all shadow-md"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Ver Cardápio Completo</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-pink-50 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm flex items-center justify-center">
            1
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark">
            Itens da Sacola
          </h2>
        </div>
        <Link
          href="/cardapio"
          className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
        >
          <span>+ Adicionar mais itens</span>
        </Link>
      </div>

      {/* Lista de Itens */}
      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.id} className="py-4 flex items-center gap-4 group">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-pink-50 shrink-0 shadow-sm">
              <Image
                src={item.img}
                alt={item.nome}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase font-bold text-brand-accent tracking-wider block">
                {item.categoria}
              </span>
              <h4 className="font-serif font-bold text-base text-brand-dark truncate">
                {item.nome}
              </h4>
              <p className="text-xs text-gray-500">
                {formatCurrency(item.prcCalculado)} cada
              </p>
            </div>

            {/* Controles de Quantidade */}
            <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-200 shrink-0">
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, item.qtd - 1)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-brand-primary transition-colors"
                aria-label={`Diminuir quantidade de ${item.nome}`}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-bold text-brand-dark">
                {item.qtd}
              </span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, item.qtd + 1)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-brand-primary transition-colors"
                aria-label={`Aumentar quantidade de ${item.nome}`}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Preço Total do Item */}
            <div className="text-right shrink-0 min-w-[70px]">
              <div className="font-bold text-sm sm:text-base text-brand-dark">
                {formatCurrency(item.prcCalculado * item.qtd)}
              </div>
              <button
                type="button"
                onClick={() => onRemoveItem(item.id)}
                className="text-xs text-red-400 hover:text-red-600 flex items-center gap-0.5 justify-end mt-1 transition-colors"
                title="Remover item"
              >
                <Trash2 className="w-3 h-3" />
                <span className="text-[11px]">Remover</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resumo Financeiro */}
      <div className="pt-4 border-t border-dashed border-gray-200 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal dos itens</span>
          <span className="font-semibold text-brand-dark">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Taxa de Entrega</span>
          <span className="font-semibold text-brand-dark">
            {isRetirada ? (
              <span className="text-brand-accent font-bold">Grátis (Retirada)</span>
            ) : taxa > 0 ? (
              formatCurrency(taxa)
            ) : (
              'Selecione o bairro'
            )}
          </span>
        </div>

        <div className="flex justify-between text-lg sm:text-xl font-bold text-brand-dark pt-3 border-t border-gray-100">
          <span>Total do Pedido</span>
          <span className="text-brand-primary">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};
