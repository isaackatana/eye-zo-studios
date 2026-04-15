import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Film from "./pages/Film";
import Shop from "./pages/Shop";
import About from "./pages/About";

export default function App() {
  return (
    <div className="min-h-screen bg-brand-black text-brand-cream flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/film" element={<Film />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}