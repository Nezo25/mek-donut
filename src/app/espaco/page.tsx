import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Sun, Trees, Wind, Coffee, Heart, ArrowRight, MapPin } from 'lucide-react';

export default function EspacoPage() {
  const fotosEspaco = [
    {
      titulo: 'Salão Principal Climatizado',
      desc: 'Poltronas aconchegantes, iluminação suave e temperatura agradável em qualquer época do ano.',
      img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
      span: 'col-span-1 md:col-span-2 row-span-2',
      tag: 'Área Interna',
    },
    {
      titulo: 'Área Verde & Vista Panorâmica',
      desc: 'Um refúgio com vegetação nativa no centro da cidade para desacelerar e respirar ar puro.',
      img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      span: 'col-span-1 row-span-1',
      tag: 'Natureza',
    },
    {
      titulo: 'Espaço Piscina & Deck',
      desc: 'Ambiente arejado ao ar livre perfeito para fotos, encontros descontraídos e tardes de sol.',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      span: 'col-span-1 row-span-1',
      tag: 'Lazer',
    },
    {
      titulo: 'Pôr do Sol Inesquecível',
      desc: 'O entardecer mais charmoso de Bragança Paulista acompanhado de café quente e donuts frescos.',
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      span: 'col-span-1 md:col-span-2 row-span-1',
      tag: 'Vista Privilegiada',
    },
    {
      titulo: 'Cantinho dos Amigos & Celebrações',
      desc: 'Mesas integradas para reunir quem você mais gosta para celebrar aniversários ou simplesmente conversar.',
      img: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80',
      span: 'col-span-1 md:col-span-2 row-span-1',
      tag: 'Confraternizações',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-16">
      
      {/* Cabeçalho */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <span className="inline-flex items-center gap-1.5 text-brand-accent text-xs font-bold uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
          <Trees className="w-3.5 h-3.5" />
          <span>Experiência Mek Donuts</span>
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark">
          Conheça Nosso <span className="italic text-brand-primary">Espaço</span>
        </h1>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Um pedacinho da natureza no centro da cidade. Criamos cada cantinho para que você se sinta em casa:
          salão climatizado, poltronas confortáveis, área verde, piscina e um pôr do sol inesquecível.
        </p>
      </div>

      {/* Destaques em Cartões de Experiência */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm text-center space-y-3">
          <div className="w-12 h-12 bg-pink-100 text-brand-primary rounded-2xl flex items-center justify-center mx-auto text-xl">
            <Wind className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-brand-dark">
            Ambiente Climatizado
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Conforto térmico impecável para você degustar seus donuts favoritos com tranquilidade em qualquer estação.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-brand-accent rounded-2xl flex items-center justify-center mx-auto text-xl">
            <Trees className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-brand-dark">
            Área Verde & Piscina
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Área externa ensolarada com vista verde e espelho d&apos;água para respirar ar puro e relaxar a mente.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm text-center space-y-3">
          <div className="w-12 h-12 bg-amber-100 text-brand-gold rounded-2xl flex items-center justify-center mx-auto text-xl">
            <Coffee className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-brand-dark">
            Encontros & Celebrações
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            O cenário perfeito para aniversários, reuniões de trabalho aconchegantes ou aquele café da tarde com quem ama.
          </p>
        </div>
      </div>

      {/* Mosaico Fotográfico do Espaço */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            Galeria do Refúgio Mek
          </h2>
          <p className="text-xs text-gray-500">
            Confira as diferentes atmosferas preparadas para receber você e sua família.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 auto-rows-[240px] sm:auto-rows-[280px]">
          {fotosEspaco.map((foto, idx) => (
            <div
              key={idx}
              className={`relative rounded-[2rem] overflow-hidden shadow-editorial group bg-gray-100 ${foto.span}`}
            >
              <Image
                src={foto.img}
                alt={foto.titulo}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="inline-block bg-brand-primary/90 backdrop-blur text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full w-fit mb-2">
                  {foto.tag}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold mb-1">
                  {foto.titulo}
                </h3>
                <p className="text-xs text-gray-200 line-clamp-2 max-w-md">
                  {foto.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção Convite / Eventos */}
      <div className="bg-brand-surface rounded-[2.5rem] p-8 sm:p-12 border border-pink-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <span className="text-brand-primary text-xs font-bold uppercase tracking-wider">
            Visite e Viva essa Experiência
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            Quer comemorar seu aniversário ou evento com a gente?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Aceitamos reservas para pequenos grupos e encomendas especiais de caixas festivas com nossos donuts artesanais.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
          <Link
            href="/localizacao"
            className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-bold px-6 py-3.5 rounded-full hover:bg-[#d01754] transition-all shadow-md text-sm"
          >
            <MapPin className="w-4 h-4" />
            <span>Como Chegar na Loja</span>
          </Link>
          <Link
            href="/cardapio"
            className="inline-flex items-center justify-center gap-2 bg-white text-brand-dark border border-gray-200 font-bold px-6 py-3.5 rounded-full hover:border-brand-primary hover:text-brand-primary transition-all text-sm"
          >
            <span>Ver Cardápio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
