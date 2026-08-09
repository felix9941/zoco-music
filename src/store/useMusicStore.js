import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMusicStore = create(
  persist(
    (set, get) => ({
      currentTrack: null,
      isPlaying: false,
      favorites: [],
      history: [],

      setCurrentTrack: (track) =>
        set((state) => {
          const filteredHistory = state.history.filter(
            (t) => t.id !== track.id,
          );
          const newHistory = [track, ...filteredHistory].slice(0, 10);

          return {
            currentTrack: track,
            isPlaying: true,
            history: newHistory,
          };
        }),

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
