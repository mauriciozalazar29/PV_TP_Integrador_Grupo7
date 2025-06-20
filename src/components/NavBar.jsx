import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
 feat/product/-detail
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

import { FaHeart, FaShoppingBag, FaSearch } from 'react-icons/fa';
import { BsCartCheckFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, clearSearchTerm } from '../features/search/searchSlice';
import { FaPlus } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const search = useSelector(state => state.search);
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchTerm(localSearch));
    }, 300);
    
    return () => clearTimeout(timer);
  }, [localSearch, dispatch]);

  return (
    <nav className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <Link to="/" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <BsCartCheckFill className="text-2xl text-black-600" />
            <span className="font-bold text-gray-800 hidden sm:block">TIENDAMIA</span>
          </Link>

          <div className="flex-1 mx-6">
            <div className="flex items-center rounded-full border border-gray-300 px-4 py-2 w-full max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Buscar..."
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                className="flex-grow outline-none bg-transparent text-gray-700 placeholder-gray-400"
                aria-label="Buscar productos"
                role="searchbox"
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

          <div className="flex items-center gap-1 sm:gap-3">
            <Link to="/favorites" className="p-2 rounded-lg hover:bg-gray-50 transition-colors" title="Favoritos">
              <FaHeart className="text-xl text-red-600" />
            </Link>
            
            <Link to="/cart" className="p-2 rounded-lg hover:bg-gray-50 transition-colors relative" title="Carrito">
              <FaShoppingBag className="text-xl text-black-600" />
              <span className="absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"></span>
            </Link>
            <Link 
              to="/create" 
              className="p-2 rounded-lg hover:bg-gray-50 transition-colors" 
              title="Crear producto" >
              <FaPlus className="text-xl text-gray-800" />
            </Link>
          </div>
        </div>
 develop
      </div>
    </nav>
  );
};

 feat/product/-detail
export default NavBar;

export default Navbar;
 develop
