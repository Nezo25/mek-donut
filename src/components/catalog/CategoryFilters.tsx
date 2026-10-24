'use client';

import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Category } from '@/types';

interface CategoryFiltersProps {
  categories: Category[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  totalResults: number;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  totalResults,
}) => {
  return (
    <div className="w-full space-y-6">
      {/* Barra de Busca por Nome ou Ingrediente */}
      <div className="max-w-xl mx-auto relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por donut, recheio ou ingrediente (ex: Nutella, Pistache, Oreo)..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-pink-100 rounded-full text-sm text-brand-dark shadow-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all placeholder:text-gray-400"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-brand-primary bg-gray-100 hover:bg-pink-100 px-2.5 py-1 rounded-full transition-colors"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Botões de Filtro por Categoria */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 select-none ${
                isSelected
                  ? 'bg-brand-primary text-white shadow-md scale-105 ring-2 ring-brand-primary/20'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-primary hover:text-brand-primary shadow-sm hover:shadow'
              }`}
            >
              {category === 'Halloween' && <span className="mr-1.5">🎃</span>}
              {category === 'Exclusivos' && <span className="mr-1.5">✨</span>}
              {category === 'Combos' && <span className="mr-1.5">🎁</span>}
              {category === 'Bebidas' && <span className="mr-1.5">☕</span>}
              {category}
            </button>
          );
        })}
      </div>

      {/* Contagem de Resultados */}
      <div className="text-center text-xs text-gray-500 font-medium flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
        <span>
          Mostrando <strong>{totalResults}</strong> {totalResults === 1 ? 'delícia encontrada' : 'delícias encontradas'}
        </span>
      </div>
    </div>
  );
};
