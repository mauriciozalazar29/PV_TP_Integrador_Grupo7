import { useDispatch, useSelector } from 'react-redux'; // Hooks para interactuar con Redux
import { toggleFavorite } from '../features/favorites/favoritesSlice'; // Acción para alternar favoritos
import { useNavigate } from 'react-router-dom'; // Hook para la navegación programática
import { FiHeart } from 'react-icons/fi'; // Icono de corazón vacío
import { FaHeart } from 'react-icons/fa'; // Icono de corazón lleno
import { useMemo } from 'react'; // Hook para memorizar valores
import { toast } from 'react-toastify'; // Biblioteca para mostrar notificaciones


// ProductCard.jsx
// Tarjeta de producto. Muestra info, permite marcar como favorito y navegar al detalle.
// Botones: corazón (favorito), click en tarjeta (detalle).

const ProductCard = ({ product }) => {
  const dispatch = useDispatch(); // Hook para obtener la función dispatch de Redux
  const navigate = useNavigate(); // Hook para la navegación programática
  const favorites = useSelector(state => state.favorites); // Selector para obtener la lista de favoritos
  const isFav = favorites.includes(product.id); // Verifica si el producto está en favoritos

  // Calcula el valor de las cuotas usando useMemo para optimizar el rendimiento
  const installmentValue = useMemo(() => {
    return (product.price / 6).toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }, [product.price]);

  // Maneja el clic en la tarjeta del producto para navegar a la página de detalles
  const handleCardClick = () => {
    navigate(`/detail/${product.id}`);
  };

  // Maneja el clic en el botón de favorito
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Evita que el clic se propague al contenedor de la tarjeta
    dispatch(toggleFavorite(product.id)); // Despacha la acción para alternar el estado de favorito
    // Muestra una notificación dependiendo del estado del favorito
    if (!isFav) {
      toast.success('Producto agregado a favoritos');
    } else {
      toast.info('Producto quitado de favoritos');
    }
  };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 w-full sm:max-w-full max-w-sm mx-auto flex flex-col h-full cursor-pointer border border-gray-100 hover:border-gray-200 min-w-0 mb-6 p-2"
      onClick={handleCardClick} // Maneja el clic en la tarjeta
    >
      <div className="relative" style={{ height: '220px' }}>
        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center p-3">
          <img
            src={product.image} // Imagen del producto
            alt={product.title} // Texto alternativo para accesibilidad
            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105 w-full h-full"
            onError={(e) => {
              // Maneja el error de carga de la imagen
              e.target.src = 'https://via.placeholder.com/400x400?text=Imagen+no+disponible'; // Imagen de reemplazo
              e.target.className = 'max-h-full max-w-full object-cover w-full h-full'; // Cambia la clase para ajustar la imagen
            }}
          />
        </div>

        {/* Botón para agregar a favoritos */}
        <button
          onClick={handleFavoriteClick} // Maneja el clic en el botón de favorito
          className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:scale-110 transition-all z-10"
          aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"} // Atributo para accesibilidad
        >
          {isFav ? (
            <FaHeart className="text-red-500 text-sm" /> // Corazón lleno si es favorito
          ) : (
            <FiHeart className="text-gray-600 hover:text-red-400 text-sm" /> // Corazón vacío si no es favorito
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

export default ProductCard; // Exporta el componente para su uso en otras partes de la aplicación
