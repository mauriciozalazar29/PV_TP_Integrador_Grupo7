import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, clearSearchTerm } from '../features/search/searchSlice';
import { logout } from '../features/auth/authSlice';
import { FaHeart, FaSearch, FaPlus, FaShoppingBag, FaShoppingCart } from 'react-icons/fa';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.auth.user);
  const search = useSelector(state => state.search.term || '');
  const favoritos = useSelector(state => state.favorites.items);
  const cartCount = useSelector(state =>
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchTerm(localSearch));
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <FaShoppingBag className="text-2xl text-black-600" />
            <span className="font-bold text-gray-800 hidden sm:block">TIENDAMIA</span>
          </Link>

          {/* Search */}
          <div className="flex-1 mx-6">
            <div className="flex items-center rounded-full border border-gray-300 px-4 py-2 w-full max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Buscar..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="flex-grow outline-none bg-transparent text-gray-700 placeholder-gray-400"
                aria-label="Buscar productos"
              />
              <FaSearch className="text-gray-500" />
              {localSearch && (
                <button
                  onClick={() => {
                    setLocalSearch('');
                    dispatch(clearSearchTerm());
                  }}
                  className="text-gray-500 hover:text-gray-700 ml-2"
                  aria-label="Limpiar búsqueda"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* User actions & Icons */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-700 hidden sm:block">Bienvenido, {user.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-gray-900 px-3 py-1 rounded-md transition">
                  Login
                </Link>
                <Link to="/register" className="text-gray-700 hover:text-gray-900 px-3 py-1 rounded-md transition">
                  Registro
                </Link>
              </>
            )}

            <Link to="/favorites" className="p-2 rounded-lg hover:bg-gray-50 transition-colors relative" title="Favoritos">
              <FaHeart className="text-xl text-red-600" />
              {favoritos.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                  {favoritos.length}
                </span>
              )}
            </Link>

            <Link to="/create" className="p-2 rounded-lg hover:bg-gray-50 transition-colors" title="Crear producto">
              <FaPlus className="text-xl text-gray-800" />
            </Link>

            {/* Carrito de compras */}
            <Link to="/cart" className="p-2 rounded-lg hover:bg-gray-50 transition-colors relative" title="Carrito">
              <FaShoppingCart className="text-xl text-gray-800" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;