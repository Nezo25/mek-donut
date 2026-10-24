import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, DeliveryMode, Product } from '@/types';
import { deliveryNeighborhoods } from '@/data/deliveryNeighborhoods';

interface CartState {
  items: CartItem[];
  modoEntrega: DeliveryMode;
  bairroId: string;
  isEncomenda: boolean;
  dataEncomenda: string;
  horaEncomenda: string;
  nomeCliente: string;
  telCliente: string;
  observacoes: string;

  // Actions
  addItem: (product: Product, qtd?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qtd: number) => void;
  clearCart: () => void;

  setModoEntrega: (modo: DeliveryMode) => void;
  setBairroId: (bairroId: string) => void;
  setIsEncomenda: (isEncomenda: boolean) => void;
  setDataEncomenda: (data: string) => void;
  setHoraEncomenda: (hora: string) => void;
  setNomeCliente: (nome: string) => void;
  setTelCliente: (tel: string) => void;
  setObservacoes: (obs: string) => void;

  // Computed helpers
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTaxaEntrega: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      modoEntrega: 'delivery',
      bairroId: 'centro-jdpublico',
      isEncomenda: false,
      dataEncomenda: '',
      horaEncomenda: '',
      nomeCliente: '',
      telCliente: '',
      observacoes: '',

      addItem: (product: Product, qtd = 1) => {
        if (qtd <= 0) return;
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((item) => item.id === product.id);
        const precoUnitario = product.precoPromocional ?? product.preco;

        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex] = {
            ...updated[existingIndex],
            qtd: updated[existingIndex].qtd + qtd,
            prcCalculado: precoUnitario,
          };
          set({ items: updated });
        } else {
          const newItem: CartItem = {
            ...product,
            qtd,
            prcCalculado: precoUnitario,
          };
          set({ items: [...currentItems, newItem] });
        }
      },

      removeItem: (productId: string) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      updateQuantity: (productId: string, qtd: number) => {
        if (qtd <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, qtd } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      setModoEntrega: (modo: DeliveryMode) => set({ modoEntrega: modo }),
      setBairroId: (bairroId: string) => set({ bairroId }),
      setIsEncomenda: (isEncomenda: boolean) => set({ isEncomenda }),
      setDataEncomenda: (dataEncomenda: string) => set({ dataEncomenda }),
      setHoraEncomenda: (horaEncomenda: string) => set({ horaEncomenda }),
      setNomeCliente: (nomeCliente: string) => set({ nomeCliente }),
      setTelCliente: (telCliente: string) => set({ telCliente }),
      setObservacoes: (observacoes: string) => set({ observacoes }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.qtd, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.prcCalculado * item.qtd,
          0
        );
      },

      getTaxaEntrega: () => {
        const { modoEntrega, bairroId } = get();
        if (modoEntrega === 'retirada') return 0;
        const found = deliveryNeighborhoods.find((b) => b.id === bairroId);
        return found ? found.taxa : 5.0; // Padrão de segurança Centro
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTaxaEntrega();
      },
    }),
    {
      name: 'mek-donuts-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
