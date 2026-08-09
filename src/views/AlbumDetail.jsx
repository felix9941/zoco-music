import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Play, Heart } from "lucide-react";
import api from "../services/api";
import { useMusicStore } from "../store/useMusicStore";

export default function AlbumDetail() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setCurrentTrack, toggleFavorite, isFavorite } = useMusicStore();

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get(`/album/${id}`);
        setAlbum(data);
      } catch (error) {
        console.error("Error cargando álbum", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlbum();
  }, [id]);

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zoco-accent"></div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="p-8 text-center text-red-500 font-bold">
        Error al cargar la información del álbum.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 pb-32 md:pb-32">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-end mb-8">
        <img
          src={album.cover_medium}
          alt={album.title}
          className="w-48 h-48 md:w-56 md:h-56 shadow-2xl rounded object-cover"
        />
        <div className="text-center md:text-left flex-1">
          <p className="text-sm font-bold uppercase mt-2 md:mt-0">Álbum</p>
          <h1 className="text-3xl md:text-6xl font-bold mb-2 md:mb-4">
            {album.title}
          </h1>
          <p className="font-bold text-gray-300">
            {album.artist.name} • {album.tracks.data.length} Canciones
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {album.tracks.data.map((track, index) => {
          const fav = isFavorite(track.id);

          return (
            <div
              key={track.id}
              className="flex items-center gap-3 md:gap-4 hover:bg-zoco-highlight p-2 md:p-3 rounded-md group transition"
            >
              <span className="text-gray-400 w-4 md:w-6 text-right text-sm md:text-base">
                {index + 1}
              </span>

              <div className="flex-1 overflow-hidden">
                <p className="font-bold text-white truncate text-sm md:text-base">
                  {track.title}
                </p>
                <p className="text-xs md:text-sm text-gray-400 truncate">
                  {track.artist.name}
                </p>
              </div>

              <button
                onClick={() => toggleFavorite({ ...track, album })}
                className="text-gray-400 hover:text-zoco-accent transition focus:outline-none"
              >
                <Heart
                  size={20}
                  fill={fav ? "#1db954" : "none"}
                  color={fav ? "#1db954" : "currentColor"}
                />
              </button>
              <button
                onClick={() => setCurrentTrack({ ...track, album })}
                className="text-white opacity-100 md:opacity-0 group-hover:opacity-100 transition p-2 bg-zoco-accent rounded-full ml-2 md:ml-4 focus:outline-none"
              >
                <Play size={16} fill="black" color="black" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
