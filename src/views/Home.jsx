import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const loading = useSelector(state => state.products.loading);
  const search = useSelector(state => state.search.toLowerCase());

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filtered = useMemo(() => {
    return products.filter(product => {
      if (!search) return true;
      
      const terms = search.split(' ');
      const productText = `
        ${product.title.toLowerCase()} 
        ${product.category.toLowerCase()} 
        ${product.description.toLowerCase()}
      `;
      
      return terms.every(term => productText.includes(term));
    });
  }, [products, search]);

  return (
    <div className="p-4">
      <HeroSlider />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          <p className="col-span-full text-center text-gray-500">Cargando productos...</p>
        ) : filtered.length > 0 ? (
          filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            {search ? "No se encontraron productos que coincidan con tu búsqueda." : "No hay productos disponibles."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;