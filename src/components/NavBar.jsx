import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingBag, FaSearch } from 'react-icons/fa';
import { BsCartCheckFill } from 'react-icons/bs';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
      {/* Container principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo con texto */}
 <Link to="/" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <BsCartCheckFill className="text-2xl text-black-600" />
            <span className="font-bold text-gray-800 hidden sm:block">TIENDAMIA</span>
          </Link>

          {/* Buscador */}
          <div className="flex-1 mx-2 sm:mx-4 max-w-2xl">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <FaSearch className="absolute left-3 text-gray-400" />
            </div>
          </div>

          {/* Iconos navegación */}
          <div className="flex items-center gap-1 sm:gap-3">
            <Link to="/favorites" className="p-2 rounded-lg hover:bg-gray-50 transition-colors" title="Favoritos">
              <FaHeart className="text-xl text-red-600" />
            </Link>
            
            <Link to="/cart" className="p-2 rounded-lg hover:bg-gray-50 transition-colors relative" title="Carrito">
              <FaShoppingBag className="text-xl text-black-600" />
              <span className="absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"></span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;