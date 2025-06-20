import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { useNavigate } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector(state => state.favorites);
  const isFav = favorites.includes(product.id);

  const installmentValue = (product.price / 6).toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const handleCardClick = () => {
    navigate(`/detail/${product.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(product.id));
  };

  return (
 feat/product/-detail
    <div className="border rounded-xl shadow p-4 bg-white flex flex-col justify-between">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain mb-2"
      />

      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.category}</p>
      <p className="text-blue-600 font-bold">${product.price}</p>
      {product.stock !== undefined && (
        <p className="text-sm text-gray-500">Stock: {product.stock}</p>
      )}
      {product.rating?.rate && (
        <p className="text-sm text-yellow-600">⭐ {product.rating.rate.toFixed(1)}</p>
      )}

      <div className="mt-3 flex justify-between items-center">
        <button
          onClick={() => dispatch(toggleFavorite(product.id))}
          className="text-xl"
          title="Agregar a favoritos"
        >
          {isFav ? '💖' : '🤍'}
        </button>

        <Link
          to={`/product/${product.id}`}
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Ver más
        </Link>

    <div 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 w-full max-w-sm mx-auto flex flex-col h-full cursor-pointer border border-gray-100 hover:border-gray-200"
      onClick={handleCardClick}
    >
      
      <div className="relative" style={{ height: '240px' }}>
        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center p-6">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=Imagen+no+disponible';
              e.target.className = 'max-h-full max-w-full object-cover';
            }}
          />
        </div>
      
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-sm hover:scale-110 transition-all z-10"
          aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFav ? (
            <FaHeart className="text-red-500 text-base" />
          ) : (
            <FiHeart className="text-gray-600 hover:text-red-400 text-base" />
          )}
        </button>

        <div className="absolute top-3 left-3 flex flex-col items-start gap-1 z-10">
          {product.isNew && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full">
              Nuevo
            </span>
          )}
          {product.discount && (
            <span className="bg-red-100 text-red-800 text-xs px-2.5 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-1.5">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {product.brand}
          </span>
        </div>

        <h3 className="text-base font-medium text-gray-900 line-clamp-2 leading-tight mb-3">
          {product.title}
        </h3>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toLocaleString('es-AR')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toLocaleString('es-AR')}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-green-600 font-medium mb-1">
                Envío gratis
              </div>
              <div className="text-xs text-gray-500">
                <span className="font-medium">6 cuotas</span> de ${installmentValue}
              </div>
            </div>
            
            <button 
              className="bg-black text-white p-2.5 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <FaShoppingCart className="text-sm" />
            </button>
          </div>
        </div>
 develop
      </div>

      <Link
        to={`/edit/${product.id}`}
        className="mt-2 text-xs text-blue-600 hover:underline"
      >
        Editar producto
      </Link>
    </div>
  );
};

export default ProductCard;
