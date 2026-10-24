'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';

export function useHydratedCart() {
  const [mounted, setMounted] = useState(false);
  const cartStore = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    ...cartStore,
    isMounted: mounted,
    totalItems: mounted ? cartStore.getTotalItems() : 0,
    subtotal: mounted ? cartStore.getSubtotal() : 0,
    taxa: mounted ? cartStore.getTaxaEntrega() : 0,
    total: mounted ? cartStore.getTotal() : 0,
  };
}
