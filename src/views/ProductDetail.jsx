import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state =>
    state.products.items.find(p => p.id === parseInt(id))
  );
  const isFav = useSelector(state => state.favorites.includes(product?.id));

  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="p-6">
      <img src={product.image} alt={product.title} className="w-48 mx-auto" />
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-xl mt-2">Precio: ${product.price}</p>
      <p>Categoría: {product.category}</p>
      <button
        onClick={() => dispatch(toggleFavorite(product.id))}
        className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
      >
        {isFav ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
      </button>
    </div>
  );
};

export default ProductDetail;
