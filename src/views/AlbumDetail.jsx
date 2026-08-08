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
    <div className="p-8 pb-32">
      <div className="flex flex-col md:flex-row gap-6 items-end mb-8">
        <img
          src={album.cover_medium}
          alt={album.title}
          className="w-48 h-48 shadow-2xl rounded"
        />
        <div>
          <p className="text-sm font-bold uppercase">Álbum</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{album.title}</h1>
          <p className="font-bold">
            {album.artist.name} • {album.tracks.data.length} canciones
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {album.tracks.data.map((track, index) => {
          const fav = isFavorite(track.id);

          return (
            <div
              key={track.id}
              className="flex items-center gap-4 hover:bg-zoco-highlight p-3 rounded-md group transition"
            >
              <span className="text-gray-400 w-6 text-right">{index + 1}</span>

              <div className="flex-1">
                <p className="font-bold text-white">{track.title}</p>
                <p className="text-sm text-gray-400">{track.artist.name}</p>
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
                className="text-white opacity-0 group-hover:opacity-100 transition p-2 bg-zoco-accent rounded-full ml-4 focus:outline-none focus:opacity-100"
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
