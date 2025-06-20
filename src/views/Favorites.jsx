import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const products = useSelector(state => state.products.items);
  
  // Estados para filtros
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Obtener productos favoritos
  const favProducts = products.filter(p => favorites.includes(p.id));

  // Obtener categorías únicas de los favoritos
  const getUniqueCategories = () => {
    const categories = [...new Set(favProducts.map(p => p.category))];
    return ['Todos', ...categories];
  };

  // Filtrar productos por categoría
  const filteredProducts = selectedCategory === 'Todos' 
    ? favProducts 
    : favProducts.filter(p => p.category === selectedCategory);

  // Agregar todos los productos al carrito
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
    
    // Navegar al carrito después de agregar los productos
    navigate('/cart');
  };

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
        
        {favProducts.length > 0 && (
          <div className="flex items-center gap-3">
            {/* Aquí se pueden agregar otros botones en el futuro */}
          </div>
        )}
      </div>
      
      {/* Filtros de categoría como chips */}
      {favProducts.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {getUniqueCategories().map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
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

  const QuickActions = () => {
    if (filteredProducts.length === 0) return null;
    
    return (
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              ¿Te gustan todos estos productos?
            </h3>
            <p className="text-sm text-gray-600">
              Agrega {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'} al carrito de una vez
            </p>
          </div>
          <button 
            onClick={handleAddAllToCart}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Agregar todos al carrito
          </button>
        </div>
      </div>
    );
  };

  const ProductsGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map(product => (
        <div key={product.id} className="group">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );

  const RecommendedSection = () => {
    if (favProducts.length === 0) return null;
    
    // Obtener productos similares basados en categorías de favoritos
    const favoriteCategories = [...new Set(favProducts.map(p => p.category))];
    const similarProducts = products
      .filter(p => 
        favoriteCategories.includes(p.category) && 
        !favorites.includes(p.id)
      )
      .slice(0, 4);

    if (similarProducts.length === 0) return null;

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
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <FavoritesHeader />
        
        {favProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <QuickActions />
            {filteredProducts.length > 0 ? (
              <ProductsGrid />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No hay productos en la categoría "{selectedCategory}"
                </p>
                <button
                  onClick={() => setSelectedCategory('Todos')}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Ver todos los favoritos
                </button>
              </div>
            )}
            <RecommendedSection />
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;