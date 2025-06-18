import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const cart = useSelector(state => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex gap-6 text-lg font-semibold">
        <Link to="/">Inicio</Link>
        <Link to="/favorites">Favoritos</Link>
        <Link to="/create">Crear Productos</Link>
        <Link to="/cart" className="relative">
          🛒 Carrito
          {totalItems > 0 && (
            <span className="ml-1 inline-block bg-red-600 text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
