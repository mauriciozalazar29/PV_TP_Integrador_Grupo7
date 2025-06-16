import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.products);
  const [sortOrder, setSortOrder] = useState(''); // Estado para ordenar

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Copiamos el array para no mutar el original
  const sortedProducts = [...items];

  if (sortOrder === 'price-asc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-desc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOrder === 'name-asc') {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOrder === 'name-desc') {
    sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>

      {/* Barra de ordenamiento */}
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="sort" className="font-medium">Ordenar por:</label>
        <select
          id="sort"
          value={sortOrder}
          onChange={handleSortChange}
          className="p-2 border rounded"
        >
          <option value="">Sin orden</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="name-asc">Nombre: A-Z</option>
          <option value="name-desc">Nombre: Z-A</option>
        </select>
      </div>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
