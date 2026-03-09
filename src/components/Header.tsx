import { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitch from './ThemeSwitch';
import CartIcon from './CartIcon';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="shrink-0">
            <Link to="/" className="text-xl font-bold">
              Eye-Zo
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="hover:text-blue-500">Home</Link>
            <Link to="/music" className="hover:text-blue-500">Music</Link>
            <Link to="/film" className="hover:text-blue-500">Film</Link>
            <Link to="/documentaries" className="hover:text-blue-500">Documentaries</Link>
            <Link to="/shop" className="hover:text-blue-500">Shop</Link>
            <Link to="/about" className="hover:text-blue-500">About</Link>
          </nav>

          {/* Right Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-3 py-1 border rounded">Login</button>
            <button className="px-3 py-1 border rounded bg-blue-500 text-white">Sign Up</button>
            <CartIcon />
            <ThemeSwitch />
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <CartIcon />
            <ThemeSwitch />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {menuOpen ? '✖️' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 pt-2 pb-4 space-y-2 shadow-inner">
          <Link to="/" className="block py-1" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/music" className="block py-1" onClick={() => setMenuOpen(false)}>Music</Link>
          <Link to="/film" className="block py-1" onClick={() => setMenuOpen(false)}>Film</Link>
          <Link to="/documentaries" className="block py-1" onClick={() => setMenuOpen(false)}>Documentaries</Link>
          <Link to="/shop" className="block py-1" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/about" className="block py-1" onClick={() => setMenuOpen(false)}>About</Link>

          <div className="flex flex-col gap-2 mt-2">
            <button className="px-3 py-1 border rounded w-full">Login</button>
            <button className="px-3 py-1 border rounded bg-blue-500 text-white w-full">Sign Up</button>
          </div>
        </div>
      )}
    </header>
  );
}