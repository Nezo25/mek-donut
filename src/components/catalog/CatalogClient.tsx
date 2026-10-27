'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { Category, Product } from '@/types';
import { CategoryFilters } from '@/components/catalog/CategoryFilters';
import { ProductCard } from '@/components/catalog/ProductCard';
import { ProductModal } from '@/components/catalog/ProductModal';
import { useCartStore } from '@/store/useCartStore';
import { useHydratedCart } from '@/hooks/useHydratedCart';
import { formatCurrency } from '@/utils/formatters';

const CATEGORIES: Category[] = [
  'Todos',
  'Halloween',
  'Exclusivos',
  'Combos',
  'Bebidas',
];

interface CatalogClientProps {
  initialProducts: Product[];
}

export const CatalogClient: React.FC<CatalogClientProps> = ({ initialProducts }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const { addItem } = useCartStore();
  const { totalItems, subtotal } = useHydratedCart();

  // Filtragem Dinâmica de Produtos
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((prod) => {
      const matchCategory =
        selectedCategory === 'Todos' || prod.categoria === selectedCategory;

      const term = searchTerm.toLowerCase().trim();
      const matchSearch =
        term === '' ||
        prod.nome.toLowerCase().includes(term) ||
        prod.desc.toLowerCase().includes(term) ||
        (prod.tags && prod.tags.some((t) => t.toLowerCase().includes(term)));

      return matchCategory && matchSearch;
    });
  }, [initialProducts, selectedCategory, searchTerm]);

  // Handlers
  const handleOpenDetails = (product: Product) => {
    setActiveProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    addItem(product, quantity);
    setNotification(
      `${quantity}x "${product.nome}" adicionado${quantity > 1 ? 's' : ''} à sacola!`
    );
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-12">
      
      {/* Cabeçalho do Cardápio */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <span className="inline-flex items-center gap-1.5 text-brand-primary text-xs font-bold uppercase tracking-widest bg-brand-surface px-4 py-1.5 rounded-full border border-pink-100">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cardápio Artesanal & Delivery</span>
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark">
          Escolha Suas <span className="italic text-brand-primary">Delícias</span>
        </h1>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Foram meses de testes incansáveis até alcançarmos a perfeição da nossa receita exclusiva.
          Nossa massa não leva amido, proporcionando leveza incomparável com recheios generosos e chocolates nobres.
        </p>
      </div>

      {/* Notificação Toast Flutuante ao Adicionar */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-brand-dark text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-pink-500/30 animate-in fade-in slide-in-from-top-4 duration-300">
          <span className="text-xl">🍩</span>
          <span className="text-xs sm:text-sm font-semibold">{notification}</span>
          <Link
            href="/triagem"
            className="text-xs bg-brand-primary text-white font-bold px-3 py-1 rounded-full hover:bg-[#d01754] transition-colors ml-2"
          >
            Ver Sacola
          </Link>
        </div>
      )}

      {/* Barra de Busca e Filtros Dinâmicos */}
      <CategoryFilters
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalResults={filteredProducts.length}
      />

      {/* Grid de Produtos */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onOpenDetails={handleOpenDetails}
              onQuickAdd={(p) => handleAddToCart(p, 1)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-brand-surface rounded-full flex items-center justify-center mx-auto text-3xl">
            🔍
          </div>
          <h3 className="font-serif text-xl font-bold text-brand-dark">
            Nenhuma delícia encontrada
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Não encontramos itens com &quot;{searchTerm}&quot; na categoria {selectedCategory}. Tente buscar por outros termos ou limpe o filtro.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('Todos');
            }}
            className="text-xs font-bold text-brand-primary underline hover:text-brand-dark"
          >
            Limpar todos os filtros
          </button>
        </div>
      )}

      {/* Modal de Detalhes do Produto */}
      <ProductModal
        product={activeProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />

      {/* Botão Flutuante de Sacola com Contador (Redireciona para /triagem) */}
      {totalItems > 0 && (
        <aside
          aria-label="Resumo da Sacola Flutuante"
          className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:right-6 z-40 max-w-md ml-auto"
        >
          <Link
            href="/triagem"
            className="w-full bg-brand-primary text-white p-4 sm:px-6 rounded-2xl shadow-2xl hover:bg-[#d01754] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-between gap-4 border-2 border-white ring-4 ring-pink-500/20 group"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBag className="w-6 h-6 text-white" />
                <span className="absolute -top-2 -right-2 bg-brand-dark text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center border border-white">
                  {totalItems}
                </span>
              </div>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-pink-100">
                  Sua Sacola
                </p>
                <p className="text-sm font-semibold">
                  {totalItems} {totalItems === 1 ? 'item' : 'itens'} • {formatCurrency(subtotal)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold">
              <span>Ir para Triagem</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </aside>
      )}

      {/* Informações de Atendimento */}
      <div className="bg-brand-surface rounded-3xl p-6 sm:p-8 border border-pink-100 text-center max-w-2xl mx-auto space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-primary">
          Atendimento Rápido & Flexível
        </p>
        <h4 className="font-serif text-lg sm:text-xl font-bold text-brand-dark">
          Dúvidas sobre os sabores ou personalização?
        </h4>
        <p className="text-xs sm:text-sm text-gray-600">
          Você pode finalizar a seleção pela nossa triagem online e depois ajustar qualquer detalhe com Mayra e Kiko no WhatsApp.
        </p>
      </div>

    </div>
  );
};
