// Home.jsx
// Página principal de la aplicación: muestra un slider de promociones y un listado de productos filtrados.
// Utiliza los componentes HeroSlider y ProductCard. Filtra productos según la búsqueda del usuario.
// Los botones están en el componente ProductCard (ver ese componente).

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';

const Home = () => {
  const dispatch = useDispatch(); // Hook para despachar acciones de Redux
  const products = useSelector(state => state.products.items); // Obtiene la lista de productos desde Redux
  const loading = useSelector(state => state.products.loading); // Obtiene el estado de carga de productos
  const search = useSelector(state => state.search.toLowerCase()); // Obtiene el texto de búsqueda desde Redux

  // Efecto que se ejecuta al montar el componente para cargar productos si no hay ninguno
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts()); // Despacha la acción para obtener los productos
    }
  }, [dispatch, products.length]);

  // Filtra los productos según el texto de búsqueda
  const filtered = useMemo(() => {
    return products.filter(product => {
      if (!search) return true; // Si no hay búsqueda, devuelve todos los productos
      
      const terms = search.split(' '); // Divide el texto de búsqueda en términos
      const productText = `
        ${product.title.toLowerCase()} 
        ${product.category.toLowerCase()} 
        ${product.description.toLowerCase()}
      `;
      
      // Verifica que todos los términos de búsqueda estén incluidos en el texto del producto
      return terms.every(term => productText.includes(term));
    });
  }, [products, search]);

  return (
    <div className="p-4">
      <HeroSlider /> {/* Renderiza el slider de promociones */}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          <p className="col-span-full text-center text-gray-500">Cargando productos...</p> // Mensaje de carga
        ) : filtered.length > 0 ? (
          filtered.map(product => (
            <ProductCard key={product.id} product={product} /> // Renderiza cada tarjeta de producto
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            {search ? "No se encontraron productos que coincidan con tu búsqueda." : "No hay productos disponibles."}
          </p> // Mensaje si no hay productos que coincidan con la búsqueda
        )}
      </div>
    </div>
  );
};

export default Home; // Exporta el componente para ser utilizado en otras partes de la aplicación
