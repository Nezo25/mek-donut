'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, MapPin, Sparkles } from 'lucide-react';
import { useHydratedCart } from '@/hooks/useHydratedCart';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useHydratedCart();

  const navLinks = [
    { label: 'Início', href: '/' },
    { label: 'Cardápio', href: '/cardapio' },
    { label: 'O Espaço', href: '/espaco' },
    { label: 'Nossa História', href: '/historia' },
    { label: 'Como Chegar', href: '/localizacao' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed w-full z-40 top-2 sm:top-5 px-3 sm:px-6 flex justify-center pointer-events-none">
      <header className="w-full max-w-6xl bg-white/95 backdrop-blur-md shadow-glass border border-pink-100 rounded-3xl lg:rounded-full pointer-events-auto transition-all duration-300 relative">
        {/* Linha Principal do Header */}
        <div className="flex justify-between items-center h-[68px] lg:h-[74px] px-4 sm:px-6 lg:px-8">
          
          {/* Esquerda: Botão Menu Mobile + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              className="lg:hidden bg-brand-surface text-brand-primary p-2.5 rounded-full hover:bg-brand-primary hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group">
              <span className="inline-block text-xl sm:text-2xl transition-transform duration-500 group-hover:rotate-180 group-hover:scale-125">
                🍩
              </span>
              <span className="font-cursive font-bold text-3xl sm:text-4xl text-brand-primary group-hover:scale-105 group-hover:drop-shadow-[0_2px_10px_rgba(233,30,99,0.35)] transition-all">
                Mek Donuts
              </span>
            </Link>
          </div>

          {/* Navegação Desktop com rotas Next.js */}
          <nav className="hidden lg:flex gap-1.5 xl:gap-2 text-sm font-medium items-center">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full transition-all duration-200 ${
                    active
                      ? 'bg-brand-primary text-white font-bold shadow-sm'
                      : 'text-brand-dark hover:text-brand-primary hover:bg-brand-surface/80'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Direita: Botão Sacola / Checkout */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/triagem"
              className="bg-brand-surface text-brand-primary font-bold px-4 sm:px-5 py-2.5 rounded-full hover:bg-brand-primary hover:text-white transition-all flex items-center gap-2 relative shadow-sm border border-pink-100 group"
              aria-label="Ir para a sacola de pedidos"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="hidden sm:inline text-xs uppercase tracking-wider">Sacola</span>
              <span
                className={`text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold transition-all ${
                  totalItems > 0
                    ? 'bg-brand-primary text-white scale-100 group-hover:bg-white group-hover:text-brand-primary'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {totalItems}
              </span>
            </Link>
          </div>
        </div>

        {/* Menu Dropdown Mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-pink-100 bg-white/95 backdrop-blur-md px-5 py-4 rounded-b-3xl space-y-2 text-sm font-medium shadow-xl animate-fadeIn">
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-2">
              Navegar pelas páginas:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`p-3 rounded-2xl transition-colors flex items-center gap-2 ${
                      active
                        ? 'bg-brand-primary text-white font-bold shadow-sm'
                        : 'bg-brand-surface/70 text-brand-dark hover:bg-brand-primary hover:text-white'
                    }`}
                  >
                    <span>✦</span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-pink-50 flex items-center justify-between">
              <Link
                href="/triagem"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-brand-primary text-white font-bold py-2.5 rounded-full flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Conferir Sacola ({totalItems} itens)</span>
              </Link>
            </div>
          </div>
        )}

        {/* Barra Rápida Mobile Fixa no rodapé do Header */}
        <div className="flex lg:hidden justify-between items-center px-4 py-2 border-t border-pink-100/80 bg-brand-surface/70 rounded-b-3xl text-xs font-semibold">
          <div className="flex items-center gap-2">
            <Link
              href="/cardapio"
              className="bg-brand-primary text-white px-3.5 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform flex items-center gap-1.5"
            >
              <span>🍩</span>
              <span>Cardápio</span>
            </Link>
            <Link
              href="/localizacao"
              className="bg-white text-brand-dark border border-gray-200 px-3 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-primary" />
              <span>Como Chegar</span>
            </Link>
          </div>
          <div className="flex items-center gap-1.5 pr-1 text-gray-500 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Zero Amido</span>
          </div>
        </div>
      </header>
    </div>
  );
};
