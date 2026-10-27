import React from 'react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getProductsServer } from '@/lib/supabase/products.server';
import { AdminProductsDashboard } from '@/components/admin/AdminProductsDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminProdutosPage() {
  const supabase = createServerSupabaseClient();
  let userEmail = 'admin@mekdonuts.com.br';
  let isDemo = false;

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.email) {
      userEmail = user.email;
    }
  } else {
    isDemo = true;
  }

  const products = await getProductsServer();

  return (
    <div className="pt-4">
      <AdminProductsDashboard
        initialProducts={products}
        userEmail={userEmail}
        isDemo={isDemo}
      />
    </div>
  );
}
