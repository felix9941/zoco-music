import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Play, Heart } from "lucide-react";
import api from "../services/api";
import { useMusicStore } from "../store/useMusicStore";

export default function ArtistDetail() {
  const { id } = useParams();
  const [artistData, setArtistData] = useState({
    artist: null,
    topTracks: [],
    albums: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const { setCurrentTrack, toggleFavorite, isFavorite, currentTrack } =
    useMusicStore();

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        setIsLoading(true);
        const [artistRes, tracksRes, albumsRes] = await Promise.all([
          api.get(`/artist/${id}`),
          api.get(`/artist/${id}/top?limit=5`),
          api.get(`/artist/${id}/albums?limit=5`),
        ]);

        setArtistData({
          artist: artistRes.data,
          topTracks: tracksRes.data.data,
          albums: albumsRes.data.data,
        });
      } catch (error) {
        console.error("Error cargando artista", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArtistData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zoco-accent"></div>
      </div>
    );
  }

  const { artist, topTracks, albums } = artistData;

  if (!artist)
    return (
      <div className="p-8 text-center text-red-500 font-bold">
        Error al cargar artista
      </div>
    );

  return (
    <div className="p-8 pb-32">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-end mb-12">
        <img
          src={artist.picture_xl}
          alt={artist.name}
          className="w-48 h-48 md:w-64 md:h-64 rounded-full shadow-2xl object-cover"
        />
        <div className="text-center md:text-left">
          <p className="text-sm font-bold uppercase">Artista Verificado</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{artist.name}</h1>
          <p className="font-bold text-gray-400">
            {artist.nb_fan.toLocaleString()} seguidores mensuales
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Populares</h2>
          <div className="flex flex-col gap-2">
            {topTracks.map((track, index) => {
              const fav = isFavorite(track.id);
              const isCurrent = currentTrack?.id === track.id;

              return (
                <div
                  key={track.id}
                  className="flex items-center gap-4 hover:bg-zoco-highlight p-2 rounded-md group transition"
                >
                  <span className="text-gray-400 w-4 text-right">
                    {index + 1}
                  </span>
                  <img
                    src={track.album.cover_small}
                    alt="cover"
                    className="w-10 h-10 rounded"
                  />
                  <div className="flex-1">
                    <p
                      className={`font-bold truncate ${isCurrent ? "text-zoco-accent" : "text-white"}`}
                    >
                      {track.title}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleFavorite(track)}
                    className="text-gray-400 hover:text-zoco-accent transition focus:outline-none"
                  >
                    <Heart
                      size={20}
                      fill={fav ? "#1db954" : "none"}
                      color={fav ? "#1db954" : "currentColor"}
                    />
                  </button>

                  <button
                    onClick={() => setCurrentTrack(track)}
                    className="text-white opacity-0 group-hover:opacity-100 transition p-2 bg-zoco-accent rounded-full ml-2 focus:outline-none focus:opacity-100"
                  >
                    <Play size={16} fill="black" color="black" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-6">Álbumes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {albums.map((album) => (
              <Link
                key={album.id}
                to={`/album/${album.id}`}
                className="bg-zoco-highlight p-4 rounded-md hover:bg-zoco-elevated transition block"
              >
                <img
                  src={album.cover_medium}
                  alt={album.title}
                  className="w-full aspect-square object-cover mb-4 rounded shadow-lg"
                />
                <p className="font-bold text-white truncate text-sm">
                  {album.title}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(album.release_date).getFullYear()}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
