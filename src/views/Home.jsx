import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import api from "../services/api";
import AlbumCard from "../components/ui/AlbumCard";
import { useMusicStore } from "../store/useMusicStore";

export default function Home() {
  const [releases, setReleases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { history, setCurrentTrack, currentTrack } = useMusicStore();

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { data } = await api.get("/chart/0/albums?limit=10");
        setReleases(data.data);
      } catch {
        setError(
          "Ocurrió un error al cargar la música. Por favor, intenta de nuevo más tarde.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewReleases();
  }, []);
  if (isLoading) {
    return (
      <div className="p-4 md:p-8 flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zoco-accent"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-4 md:p-8 flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-2">¡Ups!</h2>
        <p className="text-gray-400">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-white text-black rounded-full font-bold hover:scale-105 transition"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 pb-32">
      {history.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">
            Escuchados recientemente
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {history.map((track) => (
              <div
                key={`history-${track.id}`}
                onClick={() => setCurrentTrack(track)}
                className="flex items-center gap-2 md:gap-4 bg-zoco-highlight hover:bg-zoco-elevated transition rounded-md overflow-hidden cursor-pointer group"
              >
                <img
                  src={track.album?.cover_small || track.cover_small}
                  alt={track.title}
                  className="w-12 h-12 md:w-16 md:h-16 object-cover shadow-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0 pr-2">
                  <p
                    className={`font-bold truncate text-xs md:text-sm ${currentTrack?.id === track.id ? "text-zoco-accent" : "text-white"}`}
                  >
                    {track.title}
                  </p>
                </div>
                <div className="pr-2 md:pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-zoco-accent text-black rounded-full p-2 shadow-lg">
                    <Play size={16} fill="black" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">
          Nuevos Lanzamientos
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {releases.map((album) => (
            <AlbumCard key={album.id} item={album} />
          ))}
        </div>
      </section>
    </div>
  );
}
