import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  quantities: Record<number, number>;
  selectedCardIds: number[];
  addToCart: (id: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearAll: () => void;
  toggleCard: (id: number) => void; // ✅ added
}

export const useAddtoCard = create<CartState>()(
  persist(
    (set, get) => ({
      quantities: {},
      selectedCardIds: [],

      addToCart: (id) => {
        const { selectedCardIds, quantities } = get();
        if (!selectedCardIds.includes(id)) {
          set({
            selectedCardIds: [...selectedCardIds, id],
            quantities: { ...quantities, [id]: 1 },
          });
        }
      },

      increase: (id) => {
        const { quantities } = get();
        set({
          quantities: { ...quantities, [id]: (quantities[id] || 1) + 1 },
        });
      },

      decrease: (id) => {
        const { quantities, selectedCardIds } = get();
        const current = quantities[id] || 1;
        if (current <= 1) {
          // remove item when reaching 0
          set({
            selectedCardIds: selectedCardIds.filter((itemId) => itemId !== id),
            quantities: Object.fromEntries(
              Object.entries(quantities).filter(
                ([key]) => Number(key) !== id
              )
            ),
          });
        } else {
          set({
            quantities: { ...quantities, [id]: current - 1 },
          });
        }
      },

      removeFromCart: (id) => {
        const { selectedCardIds, quantities } = get();
        set({
          selectedCardIds: selectedCardIds.filter((itemId) => itemId !== id),
          quantities: Object.fromEntries(
            Object.entries(quantities).filter(([key]) => Number(key) !== id)
          ),
        });
      },

      clearAll: () => set({ selectedCardIds: [], quantities: {} }),

      //  toggle helper so old components keep working
      toggleCard: (id) => {
        const { selectedCardIds } = get();
        const inCart = selectedCardIds.includes(id);
        if (inCart) {
          get().removeFromCart(id);
        } else {
          get().addToCart(id);
        }
      },
    }),
    {
      name: "cart-store",
    }
  )
);