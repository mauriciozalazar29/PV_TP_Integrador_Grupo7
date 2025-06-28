import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../features/products/productsSlice';
import { FiHeart } from 'react-icons/fi';

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const products = useSelector(state => state.products.items);
  const loading = useSelector(state => state.products.loading);
  
  // Estados para filtros
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Obtener productos favoritos
  const favProducts = useMemo(() => products.filter(p => favorites.includes(p.id)), [products, favorites]);

  // Obtener categorías únicas de los favoritos
  const getUniqueCategories = useMemo(() => {
    const categories = [...new Set(favProducts.map(p => p.category))];
    return ['Todos', ...categories];
  }, [favProducts]);

  // Filtrar productos por categoría
  const filteredProducts = useMemo(() => {
    return selectedCategory === 'Todos' 
      ? favProducts 
      : favProducts.filter(p => p.category === selectedCategory);
  }, [favProducts, selectedCategory]);

  // Agregar todos los productos al carrito
  const handleAddAllToCart = () => {
    filteredProducts.forEach(product => {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: 'default'
      }));
    });
    navigate('/cart');
  };

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const EmptyState = () => (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
        <FiHeart className="text-4xl text-gray-400" />
      </div>
      <h2 className="text-xl font-semibold text-gray-600 mb-2">No tienes favoritos aún</h2>
      <p className="text-gray-500 mb-6">
        Agrega productos a tus favoritos haciendo clic en el corazón. 
        Así podrás encontrarlos fácilmente más tarde.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Explorar productos
      </button>
    </div>
  );

  const FavoritesHeader = () => (
    <div className="flex items-center gap-3 mb-8">
      <FiHeart className="text-4xl text-blue-600" />
      <h1 className="text-3xl font-bold text-gray-800">Mis Favoritos</h1>
      {favProducts.length > 0 && (
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
          {favProducts.length} {favProducts.length === 1 ? 'producto' : 'productos'}
        </span>
      )}
    </div>
  );

  const CategoryFilters = () => (
    <div className="mb-6 flex flex-wrap gap-2">
      {getUniqueCategories.map(category => (
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
  );

  const ProductsGrid = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="group">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center">
          <p className="text-gray-500 mb-4">
            No hay productos en la categoría "{selectedCategory}"
          </p>
          <button
            onClick={() => setSelectedCategory('Todos')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Ver todos los favoritos
          </button>
        </div>
      )}
    </div>
  );

  const RecommendedSection = () => {
    if (favProducts.length === 0) return null;
    
    const favoriteCategories = [...new Set(favProducts.map(p => p.category))];
    const similarProducts = products
      .filter(p => 
        favoriteCategories.includes(p.category) && 
        !favorites.includes(p.id)
      )
      .slice(0, 4);

    if (similarProducts.length === 0) return null;

    return (
      <div className="mt-8">
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Te podría interesar
          </h2>
          <p className="text-gray-600 mb-6">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-2 sm:px-4">
        <FavoritesHeader />
        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <p className="text-gray-500 text-lg">Cargando productos...</p>
          </div>
        ) : favProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <CategoryFilters />
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <ProductsGrid />
            </div>
            <RecommendedSection />
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;