import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { useNavigate } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector(state => state.favorites);
  const isFav = favorites.includes(product.id);

  const installmentValue = useMemo(() => {
    return (product.price / 6).toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }, [product.price]);

  const handleCardClick = () => {
    navigate(`/detail/${product.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(product.id));
    if (!isFav) {
      toast.success('Producto agregado a favoritos');
    } else {
      toast.info('Producto quitado de favoritos');
    }
  };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 w-full sm:max-w-full max-w-sm mx-auto flex flex-col h-full cursor-pointer border border-gray-100 hover:border-gray-200 min-w-0 mb-6 p-2"
      onClick={handleCardClick}
    >
      <div className="relative" style={{ height: '220px' }}>
        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center p-3">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105 w-full h-full"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=Imagen+no+disponible';
              e.target.className = 'max-h-full max-w-full object-cover w-full h-full';
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

      <div className="p-2 flex flex-col flex-grow min-w-0">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider truncate">
          {product.brand}
        </span>

        <h3 className="text-[15px] font-medium text-gray-900 line-clamp-2 mt-2 leading-snug truncate">
          {product.title}
        </h3>
        <div className="mt-auto space-y-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toLocaleString('es-AR')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toLocaleString('es-AR')}
              </span>
            )}
          </div>

          <div className="text-[13px] text-blue-600 font-bold">
            <span>6 cuotas sin interés de </span>
            <span className="text-gray-700">${installmentValue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
