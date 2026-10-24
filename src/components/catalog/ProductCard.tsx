'use client';

import React from 'react';
import Image from 'next/image';
import { Plus, Tag, Eye } from 'lucide-react';
import { Product } from '@/types';
import { formatCurrency } from '@/utils/formatters';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onQuickAdd,
}) => {
  const currentPrice = product.precoPromocional ?? product.preco;
  const hasPromo = product.precoPromocional !== undefined;

  return (
    <div className="bg-white rounded-[2rem] p-5 shadow-editorial border border-pink-50/80 hover:shadow-glass hover:border-pink-200 transition-all duration-300 flex flex-col justify-between group relative">
      
      {/* Imagem do Produto com Badges */}
      <div
        className="relative overflow-hidden rounded-[1.5rem] mb-4 aspect-[4/3] bg-pink-50 cursor-pointer"
        onClick={() => onOpenDetails(product)}
      >
        <Image
          src={product.img}
          alt={product.nome}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Tag de Categoria */}
        <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-[11px] uppercase font-bold tracking-wider px-3 py-1 rounded-full text-brand-dark shadow-sm border border-pink-100">
          {product.categoria}
        </span>

        {/* Tag Promocional */}
        {hasPromo && (
          <span className="absolute top-3 left-3 bg-brand-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Tag className="w-3 h-3" />
            <span>OFERTA</span>
          </span>
        )}

        {/* Botão Hover "Ver Detalhes" */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="bg-white/95 backdrop-blur text-brand-primary text-xs font-bold px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            <span>Ver Detalhes</span>
          </span>
        </div>
      </div>

      {/* Conteúdo Informativo */}
      <div className="flex-1 flex flex-col">
        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase font-semibold text-brand-accent bg-emerald-50 px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Título */}
        <h3
          onClick={() => onOpenDetails(product)}
          className="font-serif font-bold text-xl sm:text-2xl text-brand-dark group-hover:text-brand-primary transition-colors cursor-pointer mb-2 line-clamp-1"
        >
          {product.nome}
        </h3>

        {/* Descrição */}
        <p className="text-xs sm:text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed flex-grow">
          {product.desc}
        </p>

        {/* Preços e Ações */}
        <div className="pt-3 border-t border-pink-50 flex items-center justify-between mt-auto">
          <div>
            {hasPromo && (
              <span className="text-xs text-gray-400 line-through block">
                {formatCurrency(product.preco)}
              </span>
            )}
            <div className="font-bold text-brand-primary text-xl sm:text-2xl tracking-tight">
              {formatCurrency(currentPrice)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenDetails(product)}
              className="p-2.5 rounded-full bg-brand-surface text-brand-primary hover:bg-brand-primary hover:text-white transition-colors border border-pink-100"
              title="Ver detalhes e escolher quantidade"
              aria-label={`Ver detalhes de ${product.nome}`}
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={() => onQuickAdd(product)}
              className="px-4 py-2.5 rounded-full bg-brand-primary text-white font-bold text-xs uppercase tracking-wider hover:bg-[#d01754] transition-all shadow-sm hover:shadow flex items-center gap-1.5 active:scale-95"
              aria-label={`Adicionar ${product.nome} à sacola`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
