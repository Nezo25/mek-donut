'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag, Sparkles, Check, XCircle } from 'lucide-react';
import { Product } from '@/types';
import { formatCurrency } from '@/utils/formatters';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setIsSuccess(false);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const isAvailable = product.disponivel !== false;
  const currentPrice = product.precoPromocional ?? product.preco;
  const totalPrice = currentPrice * quantity;

  const handleAdd = () => {
    if (!isAvailable) return;
    onAddToCart(product, quantity);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Janela Modal */}
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl z-10 overflow-hidden relative border border-pink-100 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md p-2 rounded-full text-brand-dark hover:text-brand-primary shadow-md hover:bg-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Imagem do Produto */}
        <div className="relative w-full h-64 sm:h-72 bg-pink-50 shrink-0">
          <Image
            src={product.img}
            alt={product.nome}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-6 flex flex-wrap gap-2">
            <span className="bg-brand-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              {product.categoria}
            </span>
            {product.destaque && (
              <span className="bg-brand-gold text-brand-dark text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Destaque</span>
              </span>
            )}
            {!isAvailable && (
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" />
                <span>Esgotado no Momento</span>
              </span>
            )}
          </div>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark mb-2">
              {product.nome}
            </h3>

            {product.tags && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold text-brand-accent bg-emerald-50 px-2.5 py-0.5 rounded-full"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {product.desc}
            </p>
          </div>

          {/* Destaque de massa artesanal */}
          <div className="bg-brand-surface p-4 rounded-2xl border border-pink-100/80 text-xs sm:text-sm text-gray-700 space-y-1">
            <p className="font-bold text-brand-primary flex items-center gap-1.5">
              <span>🍩</span> Padrão Mek Donuts
            </p>
            <p className="text-gray-600 text-xs leading-relaxed">
              Massa artesanal fresca feita sem adição de amido, garantindo leveza incomparável e textura aerada com chocolates nobres.
            </p>
          </div>

          {/* Seletor de Quantidade e Preço Total (se disponível) */}
          {isAvailable ? (
            <>
              <div className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between border border-gray-100">
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold block">
                    Total do Item
                  </span>
                  <div className="text-2xl font-bold text-brand-primary">
                    {formatCurrency(totalPrice)}
                  </div>
                  <span className="text-[11px] text-gray-500">
                    {formatCurrency(currentPrice)} cada
                  </span>
                </div>

                <div className="flex items-center bg-white rounded-full p-1.5 shadow-sm border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Diminuir quantidade"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-brand-primary transition-colors disabled:opacity-30"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-brand-dark text-base">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Aumentar quantidade"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-brand-primary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Botão de Adicionar */}
              <button
                type="button"
                onClick={handleAdd}
                className={`w-full py-4 rounded-full font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  isSuccess
                    ? 'bg-brand-accent text-white scale-[1.02]'
                    : 'bg-brand-primary text-white hover:bg-[#d01754] hover:shadow-xl active:scale-[0.98]'
                }`}
              >
                {isSuccess ? (
                  <>
                    <Check className="w-5 h-5 animate-bounce" />
                    <span>Adicionado à Sacola!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Adicionar à Sacola • {formatCurrency(totalPrice)}</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-center text-red-700 space-y-1">
              <p className="font-bold text-sm">Este sabor está temporariamente esgotado</p>
              <p className="text-xs text-red-600">
                Estamos preparando novas fornadas fresquinhas! Confira os outros sabores disponíveis no cardápio.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
