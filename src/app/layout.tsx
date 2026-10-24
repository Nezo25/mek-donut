import type { Metadata } from 'next';
import { Playfair_Display, Poppins, Dancing_Script } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-dancing',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mek Donuts | Doceria Artesanal em Bragança Paulista',
  description:
    'Especializada em Donuts Artesanais com massa leve sem amido e chocolates nobres. Conheça nosso espaço com vista para a natureza no centro de Bragança Paulista ou peça online.',
  keywords: [
    'Donuts Artesanais',
    'Mek Donuts',
    'Doceria Bragança Paulista',
    'Delivery Donuts',
    'Cafeteria Bragança',
    'Sobremesas Artesanais',
  ],
  openGraph: {
    title: 'Mek Donuts | Doceria Artesanal em Bragança Paulista',
    description:
      'Um pedacinho da natureza no centro da cidade. Donuts artesanais sem amido, chocolates nobres e espaço acolhedor.',
    url: 'https://mekdonuts.com.br',
    siteName: 'Mek Donuts',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${poppins.variable} ${dancing.variable} scroll-smooth`}
    >
      <body className="font-sans min-h-screen flex flex-col relative selection:bg-brand-primary selection:text-white">
        <Header />
        <main className="flex-grow pt-24 sm:pt-28">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
