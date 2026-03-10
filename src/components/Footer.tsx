import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 border-t border-gray-800">
      
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src="/logo.png" className="w-8 h-8" alt="EyeZo Logo" />
          </div>

          <p className="text-sm text-gray-400">
            Discover music, films, documentaries and exclusive merchandise
            from creators around the world.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/music" className="hover:text-white">Music</Link></li>
            <li><Link to="/film" className="hover:text-white">Film</Link></li>
            <li><Link to="/documentaries" className="hover:text-white">Documentaries</Link></li>
          </ul>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-white font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-white">All Products</Link></li>
            <li><Link to="/shop/music" className="hover:text-white">Music Merch</Link></li>
            <li><Link to="/shop/film" className="hover:text-white">Film Merch</Link></li>
            <li><Link to="/shop/collectibles" className="hover:text-white">Collectibles</Link></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
          </ul>
        </div>

      </div>

      {/* Social + Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Eye Zo. All rights reserved.
          </p>

          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-white">🌐</a>
            <a href="#" className="hover:text-white">🎵</a>
            <a href="#" className="hover:text-white">🎬</a>
            <a href="#" className="hover:text-white">📷</a>
          </div>

        </div>
      </div>

    </footer>
  );
}