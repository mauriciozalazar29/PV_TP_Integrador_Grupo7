import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
  const favorites = useSelector(state => state.favorites);
  const products = useSelector(state => state.products.items);
  const favProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {favProducts.length > 0 ? (
        favProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p>No hay productos favoritos.</p>
      )}
    </div>
  );
};

export default Favorites;