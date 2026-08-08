import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

const Home = () => (
  <div className="p-8">
    <h2 className="text-3xl font-bold">Inicio</h2>
  </div>
);
const Search = () => (
  <div className="p-8">
    <h2 className="text-3xl font-bold">Buscar</h2>
  </div>
);
const Favorites = () => (
  <div className="p-8">
    <h2 className="text-3xl font-bold">Favoritos</h2>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
