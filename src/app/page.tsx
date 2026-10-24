import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Star, Heart, CheckCircle2, MapPin, Coffee, ShoppingBag } from 'lucide-react';
import { products } from '@/data/products';
import { formatCurrency } from '@/utils/formatters';

export default function HomePage() {
  const destaques = products.filter((p) => p.destaque).slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center bg-gradient-to-br from-gray-900 via-[#221c20] to-brand-dark px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 rounded-b-[3rem] shadow-2xl">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center py-16 sm:py-20 relative z-10">
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            <span className="inline-flex items-center gap-1.5 text-brand-gold text-xs sm:text-sm font-semibold mb-4 uppercase tracking-[0.2em] bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Doceria Artesanal em Bragança Paulista</span>
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Um Pedacinho da <span className="italic text-brand-accent">Natureza</span> no Centro da Cidade
            </h1>

            <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-200 font-light max-w-xl leading-relaxed">
              Especializada em Donuts Artesanais com massa leve, sem amido e recheados com ingredientes nobres.
              Um lugar aconchegante, climatizado e com uma vista encantadora para viver momentos doces.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/cardapio"
                className="bg-brand-primary text-white font-bold text-base sm:text-lg px-8 py-4 rounded-full shadow-lg hover:bg-[#d01754] hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2 group"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Acessar Cardápio e Pedir</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/espaco"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-base px-6 py-4 rounded-full transition-all text-center"
              >
                Conhecer o Espaço
              </Link>
            </div>

            {/* Badges de Destaque */}
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                <span>Massa 100% Zero Amido</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                <span>Chocolates Nobres</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                <span>Retirada & Delivery</span>
              </div>
            </div>
          </div>

          {/* Imagem / Card Destaque Hero */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/15 aspect-[4/5] bg-gray-800 group">
              <Image
                src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80"
                alt="Donuts Artesanais Mek Donuts"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-brand-accent animate-ping" />
                  <span className="text-xs uppercase font-bold tracking-wider text-brand-gold">
                    Produção Diária
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-1">
                  Massa Enxutinha & Aerada
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 mb-4">
                  Desenvolvida por Mayra e Kiko para surpreender seu paladar a cada mordida.
                </p>
                <Link
                  href="/historia"
                  className="text-xs font-bold text-white hover:text-brand-primary flex items-center gap-1 transition-colors"
                >
                  <span>Conheça nossa trajetória</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FAIXA INFINITA MARQUEE PROMOCIONAL */}
      <div className="relative w-full overflow-hidden py-4 bg-brand-primary text-white shadow-md transform -rotate-1 border-y-2 border-brand-gold/40">
        <div className="flex whitespace-nowrap animate-marquee items-center">
          <div className="flex items-center gap-8 mx-4 text-xs sm:text-sm font-bold uppercase tracking-widest">
            <span>🍩 Chocolates Nobres</span>
            <span className="text-brand-gold">✦</span>
            <span>🍩 Massa Enxutinha</span>
            <span className="text-brand-gold">✦</span>
            <span>🍩 Zero Amido</span>
            <span className="text-brand-gold">✦</span>
            <span>🍩 100% Artesanal</span>
            <span className="text-brand-gold">✦</span>
            <span>🍩 Vista para a Natureza</span>
            <span className="text-brand-gold">✦</span>
            <span>🍩 Ambiente Climatizado</span>
            <span className="text-brand-gold">✦</span>
            <span>🍩 Bragança Paulista</span>
            <span className="text-brand-gold">✦</span>
          </div>
          <div className="flex items-center gap-8 mx-4 text-xs sm:text-sm font-bold uppercase tracking-widest">
            <span>🍩 Chocolates Nobres</span>
            <span className="text-brand-gold">✦</span>
            <span>🍩 Massa Enxutinha</span>
            <span className="text-brand-gold">✦</span>
            <span>🍩 Zero Amido</span>
            <span className="text-brand-gold">✦</span>
            <span>🍩 100% Artesanal</span>
            <span className="text-brand-gold">✦</span>
            <span>🍩 Vista para a Natureza</span>
            <span className="text-brand-gold">✦</span>
            <span>🍩 Ambiente Climatizado</span>
            <span className="text-brand-gold">✦</span>
            <span>🍩 Bragança Paulista</span>
            <span className="text-brand-gold">✦</span>
          </div>
        </div>
      </div>

      {/* 3. SEÇÃO DE QUALIDADE E DIFERENCIAIS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-brand-accent font-bold tracking-widest uppercase text-xs sm:text-sm mb-2 block">
            Produção Artesanal de Verdade
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-dark font-bold">
            Qualidade em Cada <span className="italic text-brand-primary">Detalhe</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5 text-gray-600 leading-relaxed text-sm sm:text-base">
            <p className="bg-brand-surface p-5 rounded-2xl border border-pink-100/70">
              <strong className="text-brand-dark block mb-1 font-serif text-lg">
                ✨ Massa Exclusiva Zero Amido
              </strong>
              Nossa dedicação à qualidade é inegociável. Após rigorosos períodos de testes,
              desenvolvemos uma receita exclusiva que dispensa amido. O resultado é uma textura
              extremamente aerada, leve e sem sensação de gordura.
            </p>

            <p className="bg-brand-surface p-5 rounded-2xl border border-pink-100/70">
              <strong className="text-brand-dark block mb-1 font-serif text-lg">
                🍫 Chocolates Nobres & Nutella Original
              </strong>
              Selecionamos apenas ingredientes de primeira linha: chocolate nobre ao leite e branco,
              frutas frescas e o legítimo creme de avelã Nutella.
            </p>

            <p className="bg-brand-surface p-5 rounded-2xl border border-pink-100/70">
              <strong className="text-brand-dark block mb-1 font-serif text-lg">
                📦 Embalagens de Presente com Bilhetes Afetuosos
              </strong>
              Cada caixinha de entrega ou retirada é montada com carinho para transformar qualquer dia
              em uma comemoração memorável.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[3/4] bg-pink-100 group">
              <Image
                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80"
                alt="Donut artesanal recheado"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-xs font-bold uppercase tracking-wider">
                  Recheios Fartos
                </span>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[3/4] bg-emerald-100 group mt-6">
              <Image
                src="https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=600&q=80"
                alt="Caixa presente de donuts"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-xs font-bold uppercase tracking-wider">
                  Caixas Especiais
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BANNER DE DESTAQUES DO CARDÁPIO */}
      <section className="bg-brand-surface py-16 border-y border-pink-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div>
              <span className="text-brand-primary font-bold text-xs uppercase tracking-wider block mb-1">
                Favoritos dos Clientes
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
                Destaques do Cardápio
              </h2>
            </div>
            <Link
              href="/cardapio"
              className="inline-flex items-center gap-2 bg-brand-primary text-white font-bold px-6 py-3 rounded-full hover:bg-[#d01754] transition-all shadow-md group"
            >
              <span>Ver Cardápio Completo</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destaques.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-[2rem] p-5 shadow-editorial border border-pink-100/60 hover:shadow-glass hover:border-pink-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-pink-50">
                    <Image
                      src={prod.img}
                      alt={prod.nome}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-white/95 backdrop-blur text-[10px] uppercase font-bold px-3 py-1 rounded-full text-brand-dark shadow-sm">
                      {prod.categoria}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-brand-dark mb-1">
                    {prod.nome}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-4">
                    {prod.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-pink-50">
                  <span className="font-bold text-brand-primary text-xl">
                    {formatCurrency(prod.precoPromocional ?? prod.preco)}
                  </span>
                  <Link
                    href="/cardapio"
                    className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
                  >
                    <span>Pedir no Cardápio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROVA SOCIAL (AVALIAÇÕES 5 ESTRELAS) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-brand-accent font-bold text-xs uppercase tracking-widest block mb-2">
          Clientes Encantados
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-dark mb-4">
          O Que Dizem Sobre a <span className="italic text-brand-primary">Mek</span>
        </h2>
        <p className="text-gray-500 text-sm max-w-xl mx-auto mb-12">
          Comentários reais de clientes que amam nossos donuts e nosso espaço acolhedor.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-pink-100 text-left hover:shadow-glass transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary font-bold flex items-center justify-center text-lg">
                G
              </div>
              <div>
                <p className="font-bold text-brand-dark">Glacy</p>
                <div className="flex text-amber-400 text-xs">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm italic leading-relaxed">
              &quot;Lugar incrível e super aconchegante! O ambiente é lindo, bem climatizado e possui uma vista maravilhosa para relaxar com a família.&quot;
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl shadow-sm border border-pink-100 text-left hover:shadow-glass transition-all transform md:-translate-y-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-brand-accent/10 text-brand-accent font-bold flex items-center justify-center text-lg">
                C
              </div>
              <div>
                <p className="font-bold text-brand-dark">Camila</p>
                <div className="flex text-amber-400 text-xs">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm italic leading-relaxed">
              &quot;Simplesmente delicioso. Os donuts não são apenas bonitos nas fotos, o sabor é de ir aos céus e voltar. A massa enxutinha faz toda a diferença!&quot;
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl shadow-sm border border-pink-100 text-left hover:shadow-glass transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-brand-gold/15 text-brand-dark font-bold flex items-center justify-center text-lg">
                K
              </div>
              <div>
                <p className="font-bold text-brand-dark">Karina</p>
                <div className="flex text-amber-400 text-xs">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm italic leading-relaxed">
              &quot;Excelência em tudo. A massa artesanal é extremamente fofinha, os ingredientes são nobres e o atendimento de Mayra e Kiko é acolhedor demais.&quot;
            </p>
          </div>
        </div>

        {/* Selos de Reconhecimento */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 py-6 px-8 bg-brand-surface rounded-3xl border border-pink-100/60 max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <div className="text-left">
              <p className="text-xs font-bold text-brand-dark">5 Estrelas</p>
              <p className="text-[11px] text-gray-500">Google Avaliações</p>
            </div>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛵</span>
            <div className="text-left">
              <p className="text-xs font-bold text-brand-dark">Super Restaurante</p>
              <p className="text-[11px] text-gray-500">Bragança Paulista</p>
            </div>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-brand-primary fill-brand-primary" />
            <div className="text-left">
              <p className="text-xs font-bold text-brand-dark">+5 Anos</p>
              <p className="text-[11px] text-gray-500">De Amor e Tradição</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FINAL */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-brand-dark text-white rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden text-center shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">
              Garanta sua sobremesa
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold">
              Pronto para saborear o verdadeiro donut artesanal?
            </h3>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
              Monte sua sacola agora mesmo pelo nosso catálogo interativo ou visite nossa loja física no centro de Bragança Paulista.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cardapio"
                className="bg-brand-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#d01754] transition-all shadow-lg"
              >
                Acessar Cardápio
              </Link>
              <Link
                href="/localizacao"
                className="bg-white/10 text-white hover:bg-white/20 border border-white/20 font-bold px-8 py-3.5 rounded-full transition-all"
              >
                Como Chegar na Loja
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
