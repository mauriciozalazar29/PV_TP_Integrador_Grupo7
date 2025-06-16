import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const isFav = favorites.includes(product.id);

  const rating = product.rating?.rate ?? 4.2;

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg">
      <img src={product.image} alt={product.title} className="w-full h-40 object-contain" />
      <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
      <p className="text-gray-600">${product.price}</p>
      <p className="text-sm mt-1">
        {[...Array(5)].map((_, i) => (
          <span key={i}>{i < Math.floor(rating) ? '⭐' : '☆'}</span>
        ))} ({rating.toFixed(1)})
      </p>
      <div className="flex justify-between mt-2">
        <Link to={`/detail/${product.id}`} className="text-blue-500 hover:underline">
          Ver más
        </Link>
        <button onClick={() => dispatch(toggleFavorite(product.id))}>
          {isFav ? '💖' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
