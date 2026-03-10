import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import CartIcon from "./CartIcon";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black/90 text-white dark:bg-gray-900 shadow-md backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg">
              <img src="/logo.png" className="h-8 w-8 object-contain" alt="EyeZo Logo" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 font-medium">
            <Link to="/" className="hover:text-blue-400 transition">Home</Link>
            <Link to="/music" className="hover:text-blue-400 transition">Music</Link>
            <Link to="/film" className="hover:text-blue-400 transition">Film</Link>
            <Link to="/documentaries" className="hover:text-blue-400 transition">Documentaries</Link>
            <Link to="/shop" className="hover:text-blue-400 transition">Shop</Link>
            <Link to="/about" className="hover:text-blue-400 transition">About</Link>
          </nav>

          {/* Right Buttons */}
          <div className="hidden md:flex items-center gap-4">

            <Link
              to="/login"
              className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-800 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
            >
              Sign Up
            </Link>

            <CartIcon />

            <ThemeSwitch />

          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-3">
            <CartIcon />
            <ThemeSwitch />

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md hover:bg-gray-800 transition"
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 text-white px-4 pt-3 pb-4 space-y-2 shadow-inner">

          <Link to="/" className="block py-2 hover:text-blue-400" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/music" className="block py-2 hover:text-blue-400" onClick={() => setMenuOpen(false)}>Music</Link>
          <Link to="/film" className="block py-2 hover:text-blue-400" onClick={() => setMenuOpen(false)}>Film</Link>
          <Link to="/documentaries" className="block py-2 hover:text-blue-400" onClick={() => setMenuOpen(false)}>Documentaries</Link>
          <Link to="/shop" className="block py-2 hover:text-blue-400" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/about" className="block py-2 hover:text-blue-400" onClick={() => setMenuOpen(false)}>About</Link>

          <div className="flex flex-col gap-2 mt-3">

            <Link
              to="/login"
              className="px-3 py-2 border border-gray-600 rounded text-center hover:bg-gray-800 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-3 py-2 rounded bg-blue-600 text-white text-center hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>

          </div>

        </div>
      )}
    </header>
  );
}