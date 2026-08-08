import { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import api from "../services/api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    tracks: [],
    albums: [],
    artists: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      return;
    }
    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [tracksRes, albumsRes, artistsRes] = await Promise.all([
          api.get(`/search/track?q=${query}&limit=5`),
          api.get(`/search/album?q=${query}&limit=5`),
          api.get(`/search/artist?q=${query}&limit=5`),
        ]);

        setResults({
          tracks: tracksRes.data.data || [],
          albums: albumsRes.data.data || [],
          artists: artistsRes.data.data || [],
        });
      } catch (err) {
        setError("Error al realizar la búsqueda. Intenta de nuevo.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="p-8">
      <div className="relative max-w-xl mb-8">
        <SearchIcon
          className="absolute left-4 top-3.5 text-gray-400"
          size={24}
        />
        <input
          type="text"
          placeholder="¿Qué quieres escuchar?"
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            if (!value.trim()) {
              setResults({ tracks: [], albums: [], artists: [] });
            }
          }}
          className="w-full bg-zoco-elevated text-white rounded-full py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-zoco-accent transition-all"
        />
      </div>

      {isLoading && (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-zoco-accent"></div>
        </div>
      )}

      {error && <p className="text-red-500 font-bold">{error}</p>}

      {!isLoading && !error && query && results.tracks.length === 0 && (
        <div className="text-center text-gray-400 my-12">
          No se encontraron resultados para "{query}"
        </div>
      )}

      {!isLoading && results.tracks.length > 0 && (
        <div className="space-y-8">
          <section>
            <h3 className="text-2xl font-bold mb-4">Canciones</h3>
            <div className="flex flex-col gap-2">
              {results.tracks.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center gap-4 hover:bg-zoco-highlight p-2 rounded-md group transition-colors"
                >
                  <img
                    src={track.album.cover_small}
                    alt={track.title}
                    className="w-12 h-12 rounded"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-white group-hover:text-zoco-accent transition-colors">
                      {track.title}
                    </p>
                    <p className="text-sm text-gray-400">{track.artist.name}</p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {Math.floor(track.duration / 60)}:
                    {(track.duration % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-4">Álbumes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {results.albums.map((album) => (
                <div
                  key={album.id}
                  className="bg-zoco-highlight p-4 rounded-md cursor-pointer hover:bg-zoco-elevated transition"
                >
                  <img
                    src={album.cover_medium}
                    alt={album.title}
                    className="w-full aspect-square object-cover mb-4 rounded shadow-lg"
                  />
                  <p className="font-bold text-white truncate">{album.title}</p>
                  <p className="text-sm text-gray-400 truncate">
                    {album.artist.name}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
