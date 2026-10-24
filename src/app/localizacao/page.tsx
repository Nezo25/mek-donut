import React from 'react';
import Link from 'next/link';
import { MapPin, Clock, Navigation, Video, CreditCard, Banknote, QrCode, Phone, ArrowRight, ExternalLink } from 'lucide-react';
import { MEK_WHATSAPP_NUMBER } from '@/utils/whatsapp';

export default function LocalizacaoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-14">
      
      {/* Cabeçalho */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <span className="inline-flex items-center gap-1.5 text-brand-primary text-xs font-bold uppercase tracking-widest bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100">
          <MapPin className="w-3.5 h-3.5 text-brand-primary" />
          <span>Bragança Paulista / SP</span>
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark">
          Venha nos <span className="italic text-brand-primary">Visitar</span>
        </h1>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Estamos localizados no coração de Bragança Paulista, com fácil acesso, estacionamento nas proximidades e um refúgio de natureza e paz esperando por você.
        </p>
      </div>

      {/* Grid Principal: Informações Práticas e Mapa Embutido */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Coluna da Esquerda: Dados de Endereço, Horários e Rotas em Vídeo */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card de Endereço e Horário */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-editorial space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-brand-accent text-xs font-bold uppercase tracking-wider">
                Endereço da Loja Física
              </span>
              <h3 className="font-serif text-2xl font-bold text-brand-dark">
                Mek Donuts & Café
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                📍 <strong>Rua Conselheiro Rodrigues Alves, 42</strong><br />
                Centro - Bragança Paulista / SP<br />
                <span className="text-xs text-brand-primary font-medium">
                  (Ponto de referência: Próximo à churrascaria Coração Gaúcho)
                </span>
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <span className="text-brand-gold text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Horário de Funcionamento</span>
              </span>
              <p className="text-sm text-brand-dark font-medium">
                Terça-feira a Domingo: <strong>13:00 às 20:00</strong>
              </p>
              <p className="text-xs text-gray-500">
                Fechado às segundas-feiras para manutenção e descanso da equipe.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Rua+Conselheiro+Rodrigues+Alves,+42+-+Centro,+Braganca+Paulista+-+SP"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Abrir Rota no Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`https://wa.me/${MEK_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Tirar Dúvida no WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Rotas em Vídeo ("Como Chegar") */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm space-y-4 text-left">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-brand-primary" />
              <h4 className="font-serif text-lg font-bold text-brand-dark">
                Vídeos de Rotas Passo a Passo
              </h4>
            </div>
            <p className="text-xs text-gray-500">
              Grave rotas fáceis para chegar até nosso portão sem errar o caminho:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-brand-surface border border-pink-100 hover:border-brand-primary hover:shadow-md transition-all group block text-left"
              >
                <span className="text-xl mb-1 block group-hover:scale-110 transition-transform">
                  ▶
                </span>
                <p className="text-xs font-bold text-brand-dark">
                  Vindo do Centro
                </p>
                <span className="text-[11px] text-brand-primary font-medium">
                  Ver vídeo no Insta ➔
                </span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 hover:border-brand-accent hover:shadow-md transition-all group block text-left"
              >
                <span className="text-xl mb-1 block group-hover:scale-110 transition-transform">
                  ▶
                </span>
                <p className="text-xs font-bold text-brand-dark">
                  Vindo do Jd. Público
                </p>
                <span className="text-[11px] text-brand-accent font-medium">
                  Ver vídeo no Insta ➔
                </span>
              </a>
            </div>
          </div>

          {/* Formas de Pagamento Aceitas */}
          <div className="bg-brand-surface rounded-3xl p-6 border border-pink-100 text-left space-y-3">
            <h4 className="font-serif text-base font-bold text-brand-dark">
              Formas de Pagamento na Loja e no Delivery
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
              <div className="bg-white p-2.5 rounded-xl border border-pink-100/70 flex items-center gap-2">
                <QrCode className="w-4 h-4 text-brand-accent" />
                <span>PIX Instantâneo</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-pink-100/70 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-brand-primary" />
                <span>Cartão de Crédito</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-pink-100/70 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-500" />
                <span>Cartão de Débito</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-pink-100/70 flex items-center gap-2">
                <Banknote className="w-4 h-4 text-emerald-600" />
                <span>Dinheiro em Espécie</span>
              </div>
            </div>
          </div>

        </div>

        {/* Coluna da Direita: Iframe Embutido do Google Maps */}
        <div className="lg:col-span-7 h-[450px] sm:h-[550px] lg:h-[680px] rounded-3xl overflow-hidden shadow-xl border border-pink-100 relative bg-gray-100">
          <iframe
            src="https://maps.google.com/maps?q=Rua%20Conselheiro%20Rodrigues%20Alves,%2042%20-%20Centro,%20Bragan%C3%A7a%20Paulista%20-%20SP&t=&z=17&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização da Mek Donuts no Google Maps"
            className="w-full h-full"
          />

          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-pink-100 text-xs font-bold text-brand-dark flex items-center gap-2 pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse" />
            <span>Rua Conselheiro Rodrigues Alves, 42 - Centro</span>
          </div>
        </div>

      </div>

      {/* CTA para Delivery se estiver sem tempo */}
      <div className="bg-white rounded-3xl p-8 border border-pink-100 shadow-sm text-center max-w-3xl mx-auto space-y-4">
        <span className="text-brand-accent text-xs font-bold uppercase tracking-widest">
          Sem tempo de passar na loja física?
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
          Nós levamos as caixas de donuts fresquinhos até você!
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto">
          Faça sua triagem de pedido agora mesmo. Atendemos diversas regiões de Bragança Paulista com entrega rápida e segura.
        </p>
        <Link
          href="/cardapio"
          className="inline-flex items-center gap-2 bg-brand-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#d01754] transition-all shadow-md text-sm"
        >
          <span>Acessar Cardápio de Delivery</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
