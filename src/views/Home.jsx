import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const loading = useSelector(state => state.products.loading);
  const search = useSelector(state => state.search.toLowerCase());
  const [sort, setSort] = useState('');

  useEffect(() => {
    // Solo buscar si no hay productos ya cargados
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

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

  const sorted = useMemo(() => {
    let arr = [...filtered];
    switch (sort) {
      case 'price-asc':
        arr.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        arr.sort((a, b) => b.price - a.price);
        break;
      case 'az':
        arr.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        arr.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    return arr;
  }, [filtered, sort]);

 return (
    <div className="p-4">
      <HeroSlider />
      {/* Contenedor para alinear el select a la izquierda y limitar el ancho */}
      <div className="flex justify-start my-4">
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-auto min-w-[180px]"
        >
          <option value="">Ordenar por...</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="az">Nombre: A a Z</option>
          <option value="za">Nombre: Z a A</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-3 md:px-6 py-4 bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-md">
        {loading ? (
          <p className="col-span-full text-center text-gray-500 text-lg font-medium">Cargando productos...</p>
        ) : sorted.length > 0 ? (
          sorted.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg font-medium">
            {search ? "No se encontraron productos que coincidan con tu búsqueda." : "No hay productos disponibles."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
