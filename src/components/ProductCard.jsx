import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { useNavigate } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

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
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 w-full mx-auto flex flex-col h-full cursor-pointer border border-gray-100 hover:border-gray-200"
      onClick={handleCardClick}
    >
      <div className="relative" style={{ height: '200px' }}>
        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center p-4">
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
          className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:scale-110 transition-all z-10"
          aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFav ? (
            <FaHeart className="text-red-500 text-sm" />
          ) : (
            <FiHeart className="text-gray-600 hover:text-red-400 text-sm" />
          )}
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {product.brand}
        </span>

        <h3 className="text-[15px] font-medium text-gray-900 line-clamp-2 mt-2 leading-snug">
          {product.title}
        </h3>

        <p className="text-gray-600 text-sm mb-1">{product.category}</p>

        <div className="mt-auto space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toLocaleString('es-AR')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toLocaleString('es-AR')}
              </span>
            )}
          </div>

          <div className="text-[13px] text-blue-500 font-bold">
            <span>6 cuotas sin interés de </span>
            <span className="text-gray-600">${installmentValue}</span>
          </div>

          {product.stock !== undefined && (
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          )}

          {product.rating?.rate && (
            <p className="text-sm text-yellow-600">⭐ {product.rating.rate.toFixed(1)}</p>
          )}
        </div>

        <div className="flex justify-between mt-3">
          <button
            onClick={handleFavoriteClick}
            className="text-sm text-pink-600 font-medium hover:underline"
          >
            {isFav ? '💖 Quitar de Favoritos' : '🤍 Agregar a Favoritos'}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit/${product.id}`);
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            Editar producto
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
