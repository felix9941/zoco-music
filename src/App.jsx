import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./views/Home";
import Search from "./views/Search";
import AlbumDetail from "./views/AlbumDetail";
import ArtistDetail from "./views/ArtistDetail";
import Favorites from "./views/Favorites";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="album/:id" element={<AlbumDetail />} />
          <Route path="artist/:id" element={<ArtistDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
