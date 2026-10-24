import React from 'react';
import Link from 'next/link';
import { MapPin, Clock, Heart, Phone, Instagram, Facebook, ShieldCheck } from 'lucide-react';
import { MEK_WHATSAPP_NUMBER } from '@/utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-12 border-t-4 border-brand-primary relative overflow-hidden">
      {/* Detalhe de fundo */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-left">
          
          {/* Coluna 1: Marca */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <span className="text-2xl transition-transform group-hover:rotate-12">🍩</span>
              <span className="font-cursive font-bold text-3xl text-brand-primary">
                Mek Donuts
              </span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Donuts artesanais de verdade, com massa leve zero amido e recheios com chocolates nobres.
              Um refúgio com muito verde e carinho em Bragança Paulista.
            </p>
            <p className="text-xs text-brand-gold flex items-center gap-1.5 font-medium">
              <Heart className="w-3.5 h-3.5 text-brand-primary fill-brand-primary" />
              <span>Feito com amor por Mayra e Kiko</span>
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4 text-white">Navegação</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-brand-primary transition-colors">
                  Início (Home)
                </Link>
              </li>
              <li>
                <Link href="/cardapio" className="hover:text-brand-primary transition-colors">
                  Cardápio & Catálogo
                </Link>
              </li>
              <li>
                <Link href="/triagem" className="hover:text-brand-primary transition-colors">
                  Triagem & Sacola
                </Link>
              </li>
              <li>
                <Link href="/espaco" className="hover:text-brand-primary transition-colors">
                  Conheça o Espaço
                </Link>
              </li>
              <li>
                <Link href="/historia" className="hover:text-brand-primary transition-colors">
                  Nossa Doce História
                </Link>
              </li>
              <li>
                <Link href="/localizacao" className="hover:text-brand-primary transition-colors">
                  Onde Estamos & Rotas
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Localização & Horários */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4 text-white">Onde Estamos</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-primary mt-1 shrink-0" />
                <span>
                  Rua Conselheiro Rodrigues Alves, 42<br />
                  Centro - Bragança Paulista/SP<br />
                  <span className="text-xs text-gray-400">
                    (Próximo à churrascaria Coração Gaúcho)
                  </span>
                </span>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-brand-accent mt-1 shrink-0" />
                <span>
                  <strong className="text-white">Terça a Domingo:</strong><br />
                  das 13:00 às 20:00
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${MEK_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-gray-200"
                >
                  (11) 97504-9091
                </a>
              </div>
            </div>
          </div>

          {/* Coluna 4: Pagamentos & Social */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4 text-white">Redes & Atendimento</h4>
            <div className="flex gap-2.5 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-brand-primary text-xs font-semibold transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-blue-600 text-xs font-semibold transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>
            </div>

            <h5 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
              <span>Formas de Pagamento</span>
            </h5>
            <div className="flex flex-wrap gap-1.5 text-xs text-gray-300">
              <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">PIX</span>
              <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">Cartão de Crédito</span>
              <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">Débito</span>
              <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">Dinheiro</span>
            </div>
          </div>

        </div>

        {/* Linha Inferior de Direitos */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Mek Donuts. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Doceria Artesanal em Bragança Paulista - SP</span>
            <span>✦</span>
            <Link href="/triagem" className="hover:text-brand-primary underline">
              Fazer Pedido
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
