import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface useAddtoCardState {
  selectedCardIds: number[];
  toggleCard: (id: number) => void;
  clearAll: () => void;
}

export const useAddtoCard = create<useAddtoCardState>()(
  persist(
    (set, get) => ({
      selectedCardIds: [],

      toggleCard: (id) => {
        const cards = get().selectedCardIds;
        set({
          selectedCardIds: cards.includes(id)
            ? cards.filter((cardId) => cardId !== id)
            : [...cards, id],
        });
      },

      clearAll: () => set({ selectedCardIds: [] }),
    }),
    {
      name: 'favorite-store',
    }
  )
);
