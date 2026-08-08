import { Play, Heart } from "lucide-react";
import { useMusicStore } from "../store/useMusicStore";

export default function Favorites() {
  const { favorites, setCurrentTrack, toggleFavorite, currentTrack } =
    useMusicStore();

  return (
    <div className="p-8 pb-32">
      <h1 className="text-4xl font-bold mb-8">Tus Favoritos</h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-400 mt-20">
          <Heart size={64} className="mb-4 opacity-20" />
          <p className="text-xl font-bold text-white">
            Aún no tienes canciones favoritas
          </p>
          <p className="text-sm mt-2">
            Ve al buscador o a un álbum y dale al corazón para agregarlas aquí.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {favorites.map((track, index) => {
            const isCurrent = currentTrack?.id === track.id;

            return (
              <div
                key={track.id}
                className={`flex items-center gap-4 hover:bg-zoco-highlight p-3 rounded-md group transition ${isCurrent ? "bg-zoco-elevated" : ""}`}
              >
                <span className="text-gray-400 w-6 text-right">
                  {index + 1}
                </span>

                <img
                  src={track.album?.cover_small || track.cover_small}
                  alt={track.title}
                  className="w-10 h-10 rounded shadow"
                />

                <div className="flex-1">
                  <p
                    className={`font-bold ${isCurrent ? "text-zoco-accent" : "text-white"}`}
                  >
                    {track.title}
                  </p>
                  <p className="text-sm text-gray-400">{track.artist?.name}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(track)}
                  className="text-zoco-accent hover:scale-110 transition focus:outline-none"
                  title="Quitar de favoritos"
                >
                  <Heart size={20} fill="#1db954" color="#1db954" />
                </button>
                <button
                  onClick={() => setCurrentTrack(track)}
                  className="text-white opacity-0 group-hover:opacity-100 transition p-2 bg-zoco-accent rounded-full ml-4 focus:outline-none"
                >
                  <Play size={16} fill="black" color="black" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
