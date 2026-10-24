import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Clock, Sparkles, Store, Bike, ArrowRight } from 'lucide-react';

export default function HistoriaPage() {
  const timelineSteps = [
    {
      horario: 'O Início no Delivery',
      icone: '🏠',
      titulo: 'Deixando a Capital rumo ao Sonho',
      texto:
        'Quando nos mudamos para o interior de São Paulo, logo após deixarmos a rotina intensa e acelerada do mundo corporativo da capital, a Mek Donuts nasceu de uma vontade genuína: saborear um donut artesanal de verdade, sem gordura excessiva e com ingredientes de verdade.',
      lado: 'left',
      cor: 'border-brand-primary text-brand-primary',
    },
    {
      horario: '10:00 pm',
      icone: '🌙',
      titulo: 'Conferindo os Pedidos do Dia Seguinte',
      texto:
        'Lá vou eu conferir os pedidos de amanhã no sistema de delivery. Uhuuuuu! Mais alguém garantiu a sobremesa com a família! A Ana Clara pediu para colocar um cartão amoroso na caixa para presentear o namorado.',
      lado: 'right',
      cor: 'border-brand-accent text-brand-accent',
    },
    {
      horario: '09:00 am',
      icone: '☀️',
      titulo: 'Brigadeiro no Fogo e Bilhetes Escritos à Mão',
      texto:
        'Você viu que bonitinho o feedback que recebemos hoje? É de encher o coração! Terminando de mexer o brigadeiro artesanal no tacho, a gente já senta lado a lado para escrever à mão cada bilhetinho com mensagens de carinho.',
      lado: 'left',
      cor: 'border-brand-primary text-brand-primary',
    },
    {
      horario: '01:00 pm',
      icone: '🛵',
      titulo: 'Entregas pelo Interior afora',
      texto:
        'Mayra, vai me falando os sabores e eu vou acomodando nas caixas especiais com os bilhetinhos... Já vou descer com os pedidos para o carro que logo temos que sair para cruzar as ruas de Bragança e entregar tudo quentinho e fresco!',
      lado: 'right',
      cor: 'border-brand-accent text-brand-accent',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-16">
      
      {/* Cabeçalho */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <span className="inline-flex items-center gap-1.5 text-brand-primary text-xs font-bold uppercase tracking-widest bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100">
          <Heart className="w-3.5 h-3.5 fill-brand-primary" />
          <span>Nossa Doce Trajetória</span>
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark">
          A História da <span className="italic text-brand-primary">Mek Donuts</span>
        </h1>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Olá! Somos a <strong>Mek (Mayra e Kiko)</strong>. Entre, fique à vontade e sinta-se em casa!
          Veja como começou a história da doceria artesanal que conquistou os corações de Bragança Paulista.
        </p>
      </div>

      {/* Card dos Fundadores */}
      <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-pink-100 shadow-editorial grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 relative aspect-square rounded-[2rem] overflow-hidden shadow-lg bg-pink-50">
          <Image
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
            alt="Mayra e Kiko preparando donuts artesanais"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
            <p className="text-white font-serif text-xl font-bold">Mayra & Kiko</p>
          </div>
        </div>

        <div className="md:col-span-7 space-y-4 text-left">
          <span className="text-brand-accent text-xs font-bold uppercase tracking-wider block">
            5 Anos de Amor e Dedicação
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            Do delivery de apartamento ao refúgio físico
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Durante mais de 5 anos operando exclusivamente pelo delivery, vivemos de perto cada momento doce de nossos clientes: aniversários, pedidos de desculpas, comemorações de namoro e pequenos agrados de fim de tarde.
          </p>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Cada pedido sempre foi preparado artesanalmente, com massa enxutinha sem amido e bilhetes manuscritos. Esse carinho pavimentou o caminho para a realização do nosso maior sonho: a abertura da nossa loja física com vista para a natureza.
          </p>
        </div>
      </div>

      {/* Linha do Tempo / Timeline */}
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            Um Dia Típico na Nossa Rotina
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Como os donuts saem da nossa cozinha até a sua mesa.
          </p>
        </div>

        <div className="relative border-l-2 border-dashed border-brand-primary/30 ml-4 md:ml-1/2 space-y-10 py-6">
          {timelineSteps.map((step, idx) => (
            <div
              key={idx}
              className={`relative pl-8 md:w-1/2 ${
                step.lado === 'left'
                  ? 'md:-ml-[1px] md:pr-12 md:pl-0 md:text-right'
                  : 'md:ml-auto md:left-0 md:pl-12'
              }`}
            >
              {/* Ponto / Marcador na Linha */}
              <div
                className={`absolute w-6 h-6 rounded-full top-1 border-4 border-white shadow-md bg-brand-primary ${
                  step.lado === 'left'
                    ? '-left-[13px] md:-right-[13px] md:left-auto'
                    : '-left-[13px]'
                }`}
              />

              {/* Caixa de Texto */}
              <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm hover:shadow-glass transition-all text-left">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-primary bg-pink-50 px-3 py-1 rounded-full mb-2">
                  <span className="mr-1">{step.icone}</span>
                  {step.horario}
                </span>
                <h4 className="font-serif text-lg font-bold text-brand-dark mb-2">
                  {step.titulo}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed italic">
                  &quot;{step.texto}&quot;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* A Conquista da Loja Física & Assinatura */}
      <div className="bg-brand-surface rounded-[2.5rem] p-8 sm:p-12 border border-pink-100 shadow-lg text-center space-y-6 relative overflow-hidden">
        <div className="w-14 h-14 bg-brand-gold/20 text-brand-gold rounded-full flex items-center justify-center mx-auto text-2xl">
          <Store className="w-7 h-7 text-brand-gold" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
          O Sonho Físico se Tornou Realidade
        </h3>

        <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Hoje, além de manter nosso delivery ágil e cuidadoso em toda Bragança Paulista, temos a honra de abrir as portas da nossa casa: uma loja com vista encantadora para a mata, piscina, salão climatizado e o aroma inconfundível de massa artesanal fresquinha.
        </p>

        <p className="text-gray-500 text-xs sm:text-sm">
          Agradecemos imensamente por cada mordida compartilhada conosco. Beijos e abraços afetuosos,
        </p>

        <div className="pt-2">
          <p className="font-cursive text-4xl sm:text-5xl text-brand-primary font-bold">
            Mayra & Kiko
          </p>
          <p className="text-xs uppercase tracking-widest text-brand-gold mt-1 font-semibold">
            Fundadores da Mek Donuts
          </p>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/cardapio"
            className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#d01754] transition-all shadow-md text-sm"
          >
            <span>Experimentar Nossos Donuts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/localizacao"
            className="inline-flex items-center justify-center gap-2 bg-white text-brand-dark border border-gray-200 font-bold px-8 py-3.5 rounded-full hover:border-brand-primary hover:text-brand-primary transition-all text-sm"
          >
            <span>Onde Fica a Loja</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
