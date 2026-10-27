import React from 'react';
import { Metadata } from 'next';
import { getProductsServer } from '@/lib/supabase/products.server';
import { CatalogClient } from '@/components/catalog/CatalogClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Cardápio Artesanal & Delivery | Mek Donuts',
  description:
    'Conheça nossos donuts artesanais com massa enxuta sem amido, recheios generosos e opções exclusivas em Bragança Paulista.',
};

export default async function CardapioPage() {
  const products = await getProductsServer();

  return <CatalogClient initialProducts={products} />;
}
