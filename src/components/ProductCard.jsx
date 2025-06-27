import { useDispatch, useSelector } from 'react-redux'; // Importa hooks de Redux para manejar el estado
import { toggleFavorite } from '../features/favorites/favoritesSlice'; // Importa la acción para alternar favoritos
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación
import { FiHeart } from 'react-icons/fi'; // Importa el icono de corazón vacío
import { FaHeart } from 'react-icons/fa'; // Importa el icono de corazón lleno
import { useMemo } from 'react'; // Importa el hook useMemo para optimizar cálculos

// ProductCard.jsx
// Tarjeta de producto. Muestra info, permite marcar como favorito y navegar al detalle.
// Botones: corazón (favorito), click en tarjeta (detalle).

const ProductCard = ({ product }) => {
  const dispatch = useDispatch(); // Hook para despachar acciones de Redux
  const navigate = useNavigate(); // Hook para la navegación
  const favorites = useSelector(state => state.favorites); // Obtiene la lista de favoritos del estado de Redux
  const isFav = favorites.includes(product.id); // Verifica si el producto está en la lista de favoritos

  // Calcula el valor de las cuotas a pagar
  const installmentValue = useMemo(() => {
    return (product.price / 6).toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }, [product.price]);

  // Maneja el clic en la tarjeta para navegar a los detalles del producto
  const handleCardClick = () => {
    navigate(`/detail/${product.id}`); // Redirige a la página de detalles del producto
  };

  // Maneja el clic en el botón de favorito
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Previene que el clic se propague al contenedor de la tarjeta
    dispatch(toggleFavorite(product.id)); // Despacha la acción para alternar el estado de favorito
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 w-full mx-auto flex flex-col h-full cursor-pointer border border-gray-100 hover:border-gray-200"
      onClick={handleCardClick} // Maneja el clic en la tarjeta
    >
      <div className="relative" style={{ height: '200px' }}>
        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center p-4">
          <img
            src={product.image} // Muestra la imagen del producto
            alt={product.title} // Texto alternativo para accesibilidad
            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=Imagen+no+disponible'; // Imagen de reemplazo si falla la carga
              e.target.className = 'max-h-full max-w-full object-cover'; // Cambia la clase para cubrir el área
            }}
          />
        </div>

        {/* Botón para marcar como favorito */}
        <button
          onClick={handleFavoriteClick} // Llama a la función al hacer clic
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

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {product.brand} {/* Muestra la marca del producto */}
        </span>

        <h3 className="text-[15px] font-medium text-gray-900 line-clamp-2 mt-2 leading-snug">
          {product.title} {/* Muestra el título del producto */}
        </h3>
        <div className="mt-auto space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toLocaleString('es-AR')} {/* Muestra el precio del producto */}
            </span>
            {product.originalPrice && ( // Muestra el precio original si existe
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toLocaleString('es-AR')}
              </span>
            )}
          </div>

          <div className="text-[13px] text-blue-600 font-bold">
            <span>6 cuotas sin interés de </span>
            <span className="text-gray-700">${installmentValue}</span> {/* Muestra el valor de las cuotas */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; // Exporta el componente para su uso en otras partes de la aplicación
