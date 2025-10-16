import { Package } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Package className="w-7 h-7 text-blue-400" />
            <span className="text-xl font-bold tracking-tight">ASIN Optimizer</span>
          </Link>

          <nav className="flex gap-8">
            <Link
              to="/"
              className={`font-medium hover:text-blue-400 transition-colors ${
                location.pathname === '/' ? 'text-blue-400' : 'text-gray-200'
              }`}
            >
              Home
            </Link>
            <Link
              to="/history"
              className={`font-medium hover:text-blue-400 transition-colors ${
                location.pathname === '/history' ? 'text-blue-400' : 'text-gray-200'
              }`}
            >
              History
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
