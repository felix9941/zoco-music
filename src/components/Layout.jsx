import { Outlet, Link } from "react-router-dom";
import { Home, Search, Heart, Play, SkipBack, SkipForward } from "lucide-react";
import { useMusicStore } from "../store/useMusicStore";

export default function Layout() {
  const { currentTrack, isPlaying, togglePlay } = useMusicStore();
  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        <aside className="w-64 bg-zoco-base hidden md:flex flex-col p-6">
          <h1 className="text-2xl font-bold mb-8 text-zoco-accent">
            ZOCO Music
          </h1>
          <nav className="flex flex-col gap-4 text-gray-300 font-semibold">
            <Link
              to="/"
              className="flex items-center gap-4 hover:text-white transition"
            >
              <Home size={24} /> Inicio
            </Link>
            <Link
              to="/search"
              className="flex items-center gap-4 hover:text-white transition"
            >
              <Search size={24} /> Buscar
            </Link>
            <Link
              to="/favorites"
              className="flex items-center gap-4 hover:text-white transition"
            >
              <Heart size={24} /> Favoritos
            </Link>
          </nav>
        </aside>
        <main className="flex-1 bg-gradient-to-b from-zoco-elevated to-zoco-base overflow-y-auto rounded-lg m-2">
          <Outlet />
        </main>
      </div>

      <footer className="h-24 bg-zoco-press border-t border-gray-800 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-4 w-1/3">
          {currentTrack ? (
            <>
              <img
                src={
                  currentTrack.album?.cover_small || currentTrack.cover_small
                }
                alt="cover"
                className="w-14 h-14 rounded"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-bold truncate">
                  {currentTrack.title}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {currentTrack.artist?.name}
                </p>
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-500">
              Selecciona una canción...
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center w-1/3 gap-2">
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white transition">
              <SkipBack size={20} />
            </button>
            <button
              onClick={togglePlay}
              disabled={!currentTrack}
              className="bg-white text-black rounded-full p-2 hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
            >
              <Play
                size={20}
                className="ml-1"
                fill={isPlaying ? "black" : "none"}
              />
            </button>
            <button className="text-gray-400 hover:text-white transition">
              <SkipForward size={20} />
            </button>
          </div>
          <div className="w-full max-w-md flex items-center gap-2 text-xs text-gray-400">
            <span>0:00</span>
            <div className="h-1 bg-gray-600 rounded-full flex-1">
              <div className="h-1 bg-white rounded-full w-1/3 hover:bg-zoco-accent transition-colors"></div>
            </div>
            <span>
              {currentTrack
                ? `${Math.floor(currentTrack.duration / 60)}:${(currentTrack.duration % 60).toString().padStart(2, "0")}`
                : "0:00"}
            </span>
          </div>
        </div>
        {/* Controles para volumen futuros */}
        <div className="w-1/3 hidden md:flex justify-end pr-4"></div>
      </footer>
    </div>
  );
}
