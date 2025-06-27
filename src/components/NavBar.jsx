import { useState, useEffect } from 'react'; // Importa los hooks useState y useEffect de React
import { Link } from 'react-router-dom'; // Importa el componente Link para la navegación
import { useDispatch, useSelector } from 'react-redux'; // Importa hooks de Redux para manejar el estado
import { setSearchTerm, clearSearchTerm } from '../features/search/searchSlice'; // Importa acciones para manejar la búsqueda
import { FaHeart, FaShoppingBag, FaSearch, FaPlus, FaSignOutAlt } from 'react-icons/fa'; // Importa iconos de react-icons
import { logout } from '../features/auth/authSlice'; // Importa la acción de logout
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación

// NavBar.jsx
// Barra de navegación principal. Muestra enlaces, buscador, carrito, favoritos y usuario.
// Botones: logo (home), corazón (favoritos), bolsa (carrito), buscar, crear producto (+), logout.

const NavBar = () => {
  const dispatch = useDispatch(); // Hook para despachar acciones de Redux
  const search = useSelector(state => state.search); // Obtiene el estado de búsqueda de Redux
  const cart = useSelector(state => state.cart); // Obtiene el estado del carrito de Redux
  const user = useSelector(state => state.auth.user); // Obtiene el usuario autenticado de Redux
  const navigate = useNavigate(); // Hook para la navegación

  // Calcula el total de artículos en el carrito
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [localSearch, setLocalSearch] = useState(search); // Estado local para manejar la búsqueda

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    dispatch(logout()); // Despacha la acción de logout
    navigate('/login'); // Redirige a la página de login
  };

  // Efecto para sincronizar el estado local de búsqueda con el estado global
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  // Efecto para despachar el término de búsqueda después de un retraso
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchTerm(localSearch)); // Despacha el término de búsqueda
    }, 300);
    return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
  }, [localSearch, dispatch]);

  return (
    <nav className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <FaShoppingBag className="text-2xl text-black-600" />
            <span className="font-bold text-gray-800 hidden sm:block">TIENDAMIA</span>
          </Link>
          {/* Buscador */}
          <div className="flex-1 mx-6">
            <div className="flex items-center rounded-full border border-gray-300 px-4 py-2 w-full max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Buscar..."
                value={localSearch} // Valor del input de búsqueda
                onChange={(e) => setLocalSearch(e.target.value)} // Actualiza el estado local al cambiar
                className="flex-grow outline-none bg-transparent text-gray-700 placeholder-gray-400"
                aria-label="Buscar productos" // Atributo para accesibilidad
              />
              <FaSearch className="text-gray-500" /> {/* Icono de búsqueda */}
              {localSearch && ( // Muestra el botón de limpiar búsqueda si hay texto
                <button
                  onClick={() => {
                    setLocalSearch(''); // Limpia el input de búsqueda
                    dispatch(clearSearchTerm()); // Despacha la acción para limpiar el término de búsqueda
                  }}
                  className="text-gray-500 hover:text-gray-700 ml-2"
                  aria-label="Limpiar búsqueda" // Atributo para accesibilidad
                >
                  × {/* Icono para limpiar búsqueda */}
                </button>
              )}
            </div>
          </div>

          {/* Iconos de navegación */}
          <div className="flex items-center gap-1 sm:gap-3">
            <Link to="/favorites" className="p-2 rounded-lg hover:bg-gray-50 transition-colors" title="Favoritos">
              <FaHeart className="text-xl text-red-600" /> {/* Icono de favoritos */}
            </Link>

            <Link to="/cart" className="p-2 rounded-lg hover:bg-gray-50 transition-colors relative" title="Carrito">
              <FaShoppingBag className="text-xl text-black-600" /> {/* Icono de carrito */}
              {totalItems > 0 && ( // Muestra el contador de artículos si hay artículos en el carrito
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems} {/* Muestra el total de artículos */}
                </span>
              )}
            </Link>

            <Link
              to="/create"
              className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
              title="Crear producto"
            >
              <FaPlus className="text-xl text-gray-800" /> {/* Icono para crear producto */}
            </Link>
            {/* Perfil de usuario */}
            {user && ( // Muestra el nombre del usuario si está autenticado
              <div className="hidden sm:flex items-center text-sm text-gray-700">
                <span className="font-medium text-gray-600">Bienvenido, {user.email}</span>
              </div>
            )}
            {user && ( // Muestra el botón de logout si el usuario está autenticado
              <button
                onClick={handleLogout} // Llama a la función de logout al hacer clic
                className="p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                title="Cerrar sesión"
              >
                <FaSignOutAlt className="text-xl text-gray-800" /> {/* Icono de cerrar sesión */}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; // Exporta el componente para su uso en otras partes de la aplicación
