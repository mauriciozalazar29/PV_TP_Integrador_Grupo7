import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300">
        🛒 Mi Tienda
      </Link>
      <div className="flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-blue-300 font-semibold' : 'hover:text-blue-300'
          }
        >
          Inicio
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? 'text-blue-300 font-semibold' : 'hover:text-blue-300'
          }
        >
          Favoritos
        </NavLink>
        <NavLink
          to="/create"
          className={({ isActive }) =>
            isActive ? 'text-blue-300 font-semibold' : 'hover:text-blue-300'
          }
        >
          Crear Producto
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;