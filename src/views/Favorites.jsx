// Favorites.jsx
// Componente que muestra la vista de productos favoritos. Permite filtrar por categoría y agregar todos los favoritos al carrito.
// Botones: filtro de categoría, agregar todos al carrito, y los de cada ProductCard.

import { useState, useMemo, useEffect } from 'react'; // Importa hooks de React
import { useSelector, useDispatch } from 'react-redux'; // Importa hooks de Redux para acceder al estado y despachar acciones
import { useNavigate } from 'react-router-dom'; // Importa el hook para la navegación
import { addToCart } from '../features/cart/cartSlice'; // Importa la acción para agregar productos al carrito
import ProductCard from '../components/ProductCard'; // Importa el componente para mostrar productos
import { fetchProducts } from '../features/products/productsSlice'; // Importa la acción para obtener productos
import { FiHeart } from 'react-icons/fi'; // Importa el icono de corazón

const Favorites = () => {
  const navigate = useNavigate(); // Inicializa la función de navegación
  const dispatch = useDispatch(); // Inicializa la función dispatch
  const favorites = useSelector(state => state.favorites); // Obtiene los productos favoritos desde el estado de Redux
  const products = useSelector(state => state.products.items); // Obtiene la lista de productos desde el estado de Redux
  const loading = useSelector(state => state.products.loading); // Obtiene el estado de carga de productos

  // Estado para el filtro de categorías
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Obtener productos favoritos usando useMemo para optimizar el rendimiento
  const favProducts = useMemo(() => products.filter(p => favorites.includes(p.id)), [products, favorites]);

  // Obtener categorías únicas de los productos favoritos
  const getUniqueCategories = useMemo(() => {
    const categories = [...new Set(favProducts.map(p => p.category))];
    return ['Todos', ...categories]; // Agrega 'Todos' a la lista de categorías
  }, [favProducts]);

  // Filtrar productos favoritos por categoría seleccionada
  const filteredProducts = useMemo(() => {
    return selectedCategory === 'Todos' 
      ? favProducts 
      : favProducts.filter(p => p.category === selectedCategory);
  }, [favProducts, selectedCategory]);

  // Agregar todos los productos filtrados al carrito
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
    navigate('/cart'); // Redirige a la página del carrito
  };

  // Efecto para cargar productos si la lista está vacía
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts()); // Despacha la acción para obtener productos
    }
  }, [dispatch, products.length]);

  // Componente para mostrar el estado vacío
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

  // Componente para el encabezado de favoritos
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

  // Componente para los filtros de categorías
  const CategoryFilters = () => (
    <div className="mb-6 flex flex-wrap gap-2">
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
  );

  // Componente para mostrar la cuadrícula de productos
  const ProductsGrid = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="group">
              <ProductCard product={product} /> {/* Renderiza el componente ProductCard para cada producto */}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center">
          <p className="text-gray-500 mb-4">
            No hay productos en la categoría "{selectedCategory}"
          </p>
          <button
            onClick={() => setSelectedCategory('Todos')} // Restablece la categoría seleccionada
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Ver todos los favoritos
          </button>
        </div>
      )}
    </div>
  );

  // Componente para mostrar productos recomendados
  const RecommendedSection = () => {
    if (favProducts.length === 0) return null; // No muestra la sección si no hay productos favoritos
    
    const favoriteCategories = [...new Set(favProducts.map(p => p.category))]; // Obtiene categorías de productos favoritos
    const similarProducts = products
      .filter(p => 
        favoriteCategories.includes(p.category) && 
        !favorites.includes(p.id) // Filtra productos que no están en favoritos
      )
      .slice(0, 4); // Limita a 4 productos recomendados

    if (similarProducts.length === 0) return null; // No muestra la sección si no hay productos similares

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
                <ProductCard product={product} /> {/* Renderiza el componente ProductCard para productos recomendados */}
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
          <EmptyState /> // Muestra el estado vacío si no hay productos favoritos
        ) : (
          <>
            <CategoryFilters /> // Muestra los filtros de categorías
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <ProductsGrid /> // Muestra la cuadrícula de productos favoritos
            </div>
            <RecommendedSection /> // Muestra productos recomendados
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites; // Exporta el componente Favorites
