import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const isFav = favorites.includes(product.id);

  return (
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
