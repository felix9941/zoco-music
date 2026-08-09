import { Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function AlbumCard({ item }) {
  const imageUrl = item.cover_medium || "https://via.placeholder.com/150";

  return (
    <Link
      to={`/album/${item.id}`}
      className="bg-zoco-highlight p-4 rounded-md hover:bg-zoco-elevated transition group cursor-pointer flex flex-col h-full"
    >
      <div className="relative mb-4">
        <img
          src={imageUrl}
          alt={item.title}
          className="w-full aspect-square object-cover rounded shadow-lg"
        />
        <button
          className="absolute bottom-2 right-2 bg-zoco-accent text-black rounded-full p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105"
          onClick={(e) => {
            // Prevenimos que al hacer clic en el play se navegue a la ruta del álbum
            e.preventDefault();
          }}
        >
          <Play size={24} className="ml-1" fill="black" />
        </button>
      </div>
      <h3 className="font-bold text-white truncate">{item.title}</h3>
      <p className="text-sm text-gray-400 truncate mt-1">{item.artist?.name}</p>
    </Link>
  );
}
