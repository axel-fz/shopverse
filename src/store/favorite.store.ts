import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteState {
  selectedFavoriteIds: number[];
  toggleHeartIcon: (id: number) => void;
  clearAll: () => void;
}

export const useStoreFavorites = create<FavoriteState>()(
  persist(
    (set, get) => ({
      selectedFavoriteIds: [],

      toggleHeartIcon: (id) => {
        const favorites = get().selectedFavoriteIds;
        set({
          selectedFavoriteIds: favorites.includes(id)
            ? favorites.filter((favId) => favId !== id)
            : [...favorites, id],
        });
      },

      clearAll: () => set({ selectedFavoriteIds: [] }),
    }),
    {
      name: 'favorite-store',
    }
  )
);
