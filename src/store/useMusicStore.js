import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMusicStore = create(
  persist(
    (set, get) => ({
      currentTrack: null,
      isPlaying: false,
      favorites: [],

      setCurrentTrack: (track) => set({ currentTrack: track, isPlaying: true }),
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

      toggleFavorite: (track) => {
        const { favorites } = get();
        const exists = favorites.some((t) => t.id === track.id);
        if (exists) {
          set({ favorites: favorites.filter((t) => t.id !== track.id) });
        } else {
          set({ favorites: [...favorites, track] });
        }
      },
      isFavorite: (trackId) => get().favorites.some((t) => t.id === trackId),
    }),
    {
      name: "zoco-music-storage",
    },
  ),
);
