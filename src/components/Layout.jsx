import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Search, Heart, Play, SkipBack, SkipForward } from "lucide-react";
import { useMusicStore } from "../store/useMusicStore";

export default function Layout() {
  const { currentTrack, isPlaying, togglePlay } = useMusicStore();
  const location = useLocation();

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
              className={`flex items-center gap-4 hover:text-white transition ${location.pathname === "/" ? "text-white" : ""}`}
            >
              <Home size={24} /> Inicio
            </Link>
            <Link
              to="/search"
              className={`flex items-center gap-4 hover:text-white transition ${location.pathname === "/search" ? "text-white" : ""}`}
            >
              <Search size={24} /> Buscar
            </Link>
            <Link
              to="/favorites"
              className={`flex items-center gap-4 hover:text-white transition ${location.pathname === "/favorites" ? "text-white" : ""}`}
            >
              <Heart size={24} /> Favoritos
            </Link>
          </nav>
        </aside>
        <main className="flex-1 bg-gradient-to-b from-zoco-elevated to-zoco-base overflow-y-auto rounded-lg md:m-2 relative">
          <Outlet />
        </main>
      </div>

      <div className="flex flex-col flex-none z-50">
        <footer className="h-20 md:h-24 bg-zoco-press border-t border-gray-800 flex items-center justify-between px-3 md:px-4">
          <div className="flex items-center gap-3 w-1/2 md:w-1/3 overflow-hidden">
            {currentTrack ? (
              <>
                <img
                  src={
                    currentTrack.album?.cover_small || currentTrack.cover_small
                  }
                  alt="cover"
                  className="w-12 h-12 md:w-14 md:h-14 rounded flex-shrink-0"
                />
                <div className="truncate">
                  <p className="text-sm font-bold truncate text-white">
                    {currentTrack.title}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {currentTrack.artist?.name}
                  </p>
                </div>
              </>
            ) : (
              <div className="text-xs md:text-sm text-gray-500">
                Selecciona una canción...
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center w-auto md:w-1/3 gap-2">
            <div className="flex items-center gap-4 md:gap-6">
              <button className="text-gray-400 hover:text-white transition hidden sm:block">
                <SkipBack size={20} />
              </button>
              <button
                onClick={togglePlay}
                disabled={!currentTrack}
                className="bg-white text-black rounded-full p-3 md:p-2 hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
              >
                <Play
                  size={20}
                  className="ml-1 md:ml-1"
                  fill={isPlaying ? "black" : "none"}
                />
              </button>
              <button className="text-gray-400 hover:text-white transition hidden sm:block">
                <SkipForward size={20} />
              </button>
            </div>
            <div className="hidden sm:flex w-full max-w-md items-center gap-2 text-xs text-gray-400">
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

          <div className="w-1/3 hidden md:flex justify-end pr-4"></div>
        </footer>
        <nav className="md:hidden flex justify-around items-center bg-black h-16 border-t border-gray-800 pb-2 px-2">
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 ${location.pathname === "/" ? "text-white" : "text-gray-400"}`}
          >
            <Home size={22} />
            <span className="text-[10px] font-medium">Inicio</span>
          </Link>
          <Link
            to="/search"
            className={`flex flex-col items-center gap-1 ${location.pathname === "/search" ? "text-white" : "text-gray-400"}`}
          >
            <Search size={22} />
            <span className="text-[10px] font-medium">Buscar</span>
          </Link>
          <Link
            to="/favorites"
            className={`flex flex-col items-center gap-1 ${location.pathname === "/favorites" ? "text-white" : "text-gray-400"}`}
          >
            <Heart size={22} />
            <span className="text-[10px] font-medium">Favoritos</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
