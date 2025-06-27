// Favorites.jsx
// Componente que muestra la vista de productos favoritos. Permite filtrar por categoría y agregar todos los favoritos al carrito.
// Botones: filtro de categoría, agregar todos al carrito, y los de cada ProductCard.

import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../features/products/productsSlice';

const Favorites = () => {
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const dispatch = useDispatch(); // Hook para despachar acciones de Redux
  const favorites = useSelector(state => state.favorites); // Obtiene los productos favoritos desde Redux
  const products = useSelector(state => state.products.items); // Obtiene la lista de productos desde Redux
  const loading = useSelector(state => state.products.loading); // Obtiene el estado de carga de productos

  // Estado para el filtro de categorías
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Filtra los productos favoritos
  const favProducts = useMemo(() => products.filter(p => favorites.includes(p.id)), [products, favorites]);

  // Obtiene categorías únicas de los productos favoritos
  const getUniqueCategories = useMemo(() => {
    const categories = [...new Set(favProducts.map(p => p.category))];
    return ['Todos', ...categories]; // Agrega 'Todos' a la lista de categorías
  }, [favProducts]);

  // Filtra los productos favoritos según la categoría seleccionada
  const filteredProducts = useMemo(() => {
    return selectedCategory === 'Todos' 
      ? favProducts 
      : favProducts.filter(p => p.category === selectedCategory);
  }, [favProducts, selectedCategory]);

  // Función para agregar todos los productos filtrados al carrito
  const handleAddAllToCart = () => {
    filteredProducts.forEach(product => {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: 'default' // Tamaño por defecto
      }));
    });
    
    // Navega al carrito después de agregar los productos
    navigate('/cart');
  };

  // Efecto que se ejecuta al montar el componente para cargar productos si no hay ninguno
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts()); // Despacha la acción para obtener los productos
    }
  }, [dispatch, products.length]);

  // Componente para mostrar un estado vacío si no hay favoritos
  const EmptyState = () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="mb-8">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No tienes favoritos aún
        </h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Agrega productos a tus favoritos haciendo clic en el corazón. 
          Así podrás encontrarlos fácilmente más tarde.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Explorar productos
        </button>
      </div>
    </div>
  );

  // Componente que muestra el encabezado de favoritos
  const FavoritesHeader = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mis Favoritos
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} de {favProducts.length} {favProducts.length === 1 ? 'producto' : 'productos'}
            {selectedCategory !== 'Todos' && ` en ${selectedCategory}`}
          </p>
        </div>
      </div>
      
      {/* Filtros de categoría como botones */}
      {favProducts.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {getUniqueCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)} // Cambia la categoría seleccionada
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  // Componente que muestra los productos filtrados en una cuadrícula
  const ProductsGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map(product => (
        <div key={product.id} className="group">
          <ProductCard product={product} /> {/* Renderiza cada tarjeta de producto */}
        </div>
      ))}
    </div>
  );

  // Componente que muestra productos recomendados basados en categorías de favoritos
  const RecommendedSection = () => {
    if (favProducts.length === 0) return null; // No muestra sección si no hay favoritos
    
    // Obtener categorías de productos favoritos
    const favoriteCategories = [...new Set(favProducts.map(p => p.category))];
    const similarProducts = products
      .filter(p => 
        favoriteCategories.includes(p.category) && 
        !favorites.includes(p.id) // Excluye los favoritos
      )
      .slice(0, 4); // Limita a 4 productos similares

    if (similarProducts.length === 0) return null; // No muestra sección si no hay productos similares

    return (
      <div className="mt-16">
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Te podría interesar
          </h2>
          <p className="text-gray-600 mb-8">
            Basado en tus productos favoritos
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map(product => (
              <div key={product.id} className="group">
                <ProductCard product={product} /> {/* Renderiza cada tarjeta de producto similar */}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Renderiza el componente principal
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <FavoritesHeader />
        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <p className="text-gray-500 text-lg">Cargando productos...</p>
          </div>
        ) : favProducts.length === 0 ? (
          <EmptyState /> // Muestra estado vacío si no hay favoritos
        ) : (
          <>
            <ProductsGrid /> {/* Muestra la cuadrícula de productos filtrados */}
            <RecommendedSection /> {/* Muestra productos recomendados */}
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites; // Exporta el componente para ser utilizado en otras partes de la aplicación
