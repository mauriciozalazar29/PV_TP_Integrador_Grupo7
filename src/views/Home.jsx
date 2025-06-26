import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const loading = useSelector(state => state.products.loading);
  const error = useSelector(state => state.products.error);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          <p className="col-span-full text-center text-gray-500">Cargando productos...</p>
        ) : error ? (
          <p className="col-span-full text-center text-red-500">Error: {error}</p>
        ) : products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No hay productos disponibles.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
