import { useState, useEffect } from 'react'; // Importa hooks de React para manejar el estado y efectos secundarios
import { Link } from 'react-router-dom'; // Importa el componente Link para la navegación
import { useDispatch, useSelector } from 'react-redux'; // Importa hooks de Redux para manejar el estado global
import { setSearchTerm, clearSearchTerm } from '../features/search/searchSlice'; // Acciones para manejar el término de búsqueda
import { FaHeart, FaShoppingBag, FaSearch, FaPlus, FaSignOutAlt } from 'react-icons/fa'; // Importa íconos de react-icons
import { logout } from '../features/auth/authSlice'; // Acción para cerrar sesión
import { useNavigate } from 'react-router-dom'; // Hook para la navegación programática

// NavBar.jsx
// Barra de navegación principal. Muestra enlaces, buscador, carrito, favoritos y usuario.
// Botones: logo (home), corazón (favoritos), bolsa (carrito), buscar, crear producto (+), logout.

const NavBar = () => {
  const dispatch = useDispatch(); // Hook para obtener la función dispatch de Redux
  const search = useSelector(state => state.search); // Selector para obtener el estado de búsqueda
  const cart = useSelector(state => state.cart); // Selector para obtener el estado del carrito
  const user = useSelector(state => state.auth.user); // Selector para obtener el usuario autenticado
  const navigate = useNavigate(); // Hook para la navegación programática
  
  // Calcula el total de artículos en el carrito
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [localSearch, setLocalSearch] = useState(search); // Estado local para manejar el término de búsqueda

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    dispatch(logout()); // Despacha la acción de cierre de sesión
    navigate('/login'); // Navega a la página de inicio de sesión
  };

  // Efecto para sincronizar el estado local de búsqueda con el estado global
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  // Efecto para despachar el término de búsqueda después de un retraso
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchTerm(localSearch)); // Despacha el término de búsqueda
    }, 300); // Retraso de 300 ms
    return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
  }, [localSearch, dispatch]);

  return (
    <nav className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-16 w-full gap-2 sm:gap-0">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <img src="/src/assets/favicon.ico" alt="Logo" className="w-8 h-8" />
            <span className="font-bold text-gray-800">TIENDAMIA</span>
          </Link>
          {/* Barra de búsqueda */}
          <div className="flex-1 mx-2 sm:mx-10 w-full">
            <div className="flex items-center rounded-full border border-gray-300 px-2 sm:px-4 py-2 w-full max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Buscar..."
                value={localSearch} // Valor del input controlado por el estado local
                onChange={(e) => setLocalSearch(e.target.value)} // Actualiza el estado local al cambiar el input
                className="flex-grow outline-none bg-transparent text-gray-700 placeholder-gray-400"
                aria-label="Buscar productos" // Atributo para accesibilidad
              />
              <FaSearch className="text-gray-500" /> {/* Icono de búsqueda */}
              {localSearch && ( // Muestra el botón de limpiar si hay texto en la búsqueda
                <button
                  onClick={() => {
                    setLocalSearch(''); // Limpia el estado local
                    dispatch(clearSearchTerm()); // Despacha la acción para limpiar el término de búsqueda
                  }}
                  className="text-gray-500 hover:text-gray-700 ml-2"
                  aria-label="Limpiar búsqueda" // Atributo para accesibilidad
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Íconos de navegación */}
          <div className="flex items-center gap-1 sm:gap-3 w-full justify-end flex-wrap">
            <Link to="/favorites" className="p-2 rounded-lg hover:bg-gray-50 transition-colors" title="Favoritos">
              <FaHeart className="text-xl text-red-600" /> {/* Icono de favoritos */}
            </Link>

            <Link to="/cart" className="p-2 rounded-lg hover:bg-gray-50 transition-colors relative" title="Carrito">
              <FaShoppingBag className="text-xl text-black-600" /> {/* Icono del carrito */}
              {totalItems > 0 && ( // Muestra el contador de artículos si hay artículos en el carrito
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              to="/create"
              className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
              title="Crear producto"
            >
              <FaPlus className="text-xl text-gray-800" /> {/* Icono para crear un producto */}
            </Link>
            {/* Perfil de usuario */}
            {user && ( // Muestra el nombre de usuario si hay un usuario autenticado
              <div className="hidden sm:flex items-center text-sm text-gray-700">
                <span className="font-medium text-gray-600">Bienvenido, {user.email}</span>
              </div>
            )}
            {user && ( // Muestra el botón de cerrar sesión si hay un usuario autenticado
              <button
                onClick={handleLogout} // Maneja el cierre de sesión
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
