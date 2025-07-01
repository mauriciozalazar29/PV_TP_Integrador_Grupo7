// Home.jsx
// Página principal de la aplicación: muestra un slider de promociones y un listado de productos filtrados.
// Utiliza los componentes HeroSlider y ProductCard. Filtra productos según la búsqueda del usuario.
// Los botones están en el componente ProductCard (ver ese componente).

import { useEffect, useMemo, useRef, useState } from 'react'; // Importa hooks de React
import { useDispatch, useSelector } from 'react-redux'; // Importa hooks de Redux para acceder al estado y despachar acciones
import { fetchProducts } from '../features/products/productsSlice'; // Importa la acción para obtener productos
import ProductCard from '../components/ProductCard'; // Importa el componente para mostrar productos
import HeroSlider from '../components/HeroSlider'; // Importa el componente del slider principal

const Home = () => {
  const dispatch = useDispatch(); // Inicializa la función dispatch
  const products = useSelector(state => state.products.items); // Obtiene la lista de productos desde el estado de Redux
  const loading = useSelector(state => state.products.loading); // Obtiene el estado de carga de productos
  const search = useSelector(state => state.search.toLowerCase()); // Obtiene el texto de búsqueda desde el estado de Redux
  const [sort, setSort] = useState(''); // Estado para manejar el criterio de ordenamiento
  const sliderRef = useRef(null); // Referencia para el slider de productos electrónicos

  useEffect(() => {
    // Solo buscar si no hay productos ya cargados
    if (products.length === 0) {
      dispatch(fetchProducts()); // Despacha la acción para obtener productos
    }
  }, [dispatch, products.length]);

  // Filtrar productos según el texto de búsqueda
  const filtered = useMemo(() => {
    return products.filter(product => {
      if (!search) return true; // Si no hay texto de búsqueda, devuelve todos los productos
      
      const terms = search.split(' '); // Divide el texto de búsqueda en términos
      const productText = `
        ${product.title.toLowerCase()} 
        ${product.category.toLowerCase()} 
        ${product.description.toLowerCase()}
      `;
      
      return terms.every(term => productText.includes(term)); // Verifica si todos los términos están en el texto del producto
    });
  }, [products, search]);

  // Ordenar productos filtrados según el criterio seleccionado
  const sorted = useMemo(() => {
    let arr = [...filtered]; // Crea una copia del array filtrado
    switch (sort) {
      case 'price-asc':
        arr.sort((a, b) => a.price - b.price); // Ordena de menor a mayor precio
        break;
      case 'price-desc':
        arr.sort((a, b) => b.price - a.price); // Ordena de mayor a menor precio
        break;
      case 'az':
        arr.sort((a, b) => a.title.localeCompare(b.title)); // Ordena alfabéticamente de A a Z
        break;
      case 'za':
        arr.sort((a, b) => b.title.localeCompare(a.title)); // Ordena alfabéticamente de Z a A
        break;
      default:
        break;
    }
    return arr; // Devuelve el array ordenado
  }, [filtered, sort]);

  // Separar electrónicos y no electrónicos
  const electronics = sorted.filter(p => p.category.toLowerCase() === 'electronics'); // Filtra productos electrónicos
  const nonElectronics = sorted.filter(p => p.category.toLowerCase() !== 'electronics'); // Filtra productos no electrónicos

  // Dividir no electrónicos en filas
  const rows = [];
  for (let i = 0; i < nonElectronics.length; i += 4) {
    rows.push(nonElectronics.slice(i, i + 4)); // Agrupa productos no electrónicos en filas de 4
  }
  const topRows = rows.slice(0, 2); // Obtiene las primeras 2 filas
  const bottomRows = rows.slice(2, 5); // Obtiene las siguientes 3 filas

  // Slider auto-scroll para productos electrónicos
  useEffect(() => {
    if (!sliderRef.current || electronics.length === 0) return; // Verifica si el slider y los productos electrónicos existen
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' }); // Desplaza el slider a la derecha
        // Si llega al final, vuelve al inicio
        if (
          sliderRef.current.scrollLeft + sliderRef.current.offsetWidth >=
          sliderRef.current.scrollWidth - 10
        ) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' }); // Regresa al inicio
        }
      }
    }, 2500); // Intervalo de 2.5 segundos
    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [electronics.length]);

  // Función para scroll horizontal
  const scrollSlider = (dir) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' }); // Desplaza el slider según la dirección
    }
  };

  return (
    <div className="p-4">
      <HeroSlider /> {/* Renderiza el slider principal */}
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 flex justify-start">
        {/* Selector de ordenamiento */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value)} // Actualiza el estado de ordenamiento
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-auto min-w-[180px]"
        >
          <option value="">Ordenar por...</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="az">Nombre: A a Z</option>
          <option value="za">Nombre: Z a A</option>
        </select>
      </div>

      {/* Top 2 filas de no electrónicos */}
      {topRows.map((row, idx) => (
        <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-3 md:px-6 py-2">
          {row.map(product => <ProductCard key={product.id} product={product} />)} {/* Renderiza el componente ProductCard para cada producto */}
        </div>
      ))}

      {/* Slider de electrónicos */}
      {electronics.length > 0 && (
        <div className="relative max-w-7xl mx-auto my-8">
          {/* Botones de scroll */}
          <button
            onClick={() => scrollSlider(-1)} // Desplaza a la izquierda
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-white/30 backdrop-blur-md text-blue-700 shadow rounded-full p-1.5 hover:scale-110 hover:bg-white/60 transition-all duration-200 border border-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-300"
            aria-label="Scroll left"
            style={{boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)'}}
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' /></svg>
          </button>
          <div
            ref={sliderRef} // Asigna la referencia al contenedor del slider
            className="flex overflow-x-hidden gap-6 px-12 py-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {electronics.map(product => (
              <div key={product.id} className="min-w-[250px] max-w-[250px] flex-shrink-0">
                <ProductCard product={product} /> {/* Renderiza el componente ProductCard para cada producto electrónico */}
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollSlider(1)} // Desplaza a la derecha
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-white/30 backdrop-blur-md text-blue-700 shadow rounded-full p-1.5 hover:scale-110 hover:bg-white/60 transition-all duration-200 border border-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-300"
            aria-label="Scroll right"
            style={{boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)'}}
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' /></svg>
          </button>
        </div>
      )}

      {/* Bottom 3 filas de no electrónicos */}
      {bottomRows.map((row, idx) => (
        <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-3 md:px-6 py-2">
          {row.map(product => <ProductCard key={product.id} product={product} />)} {/* Renderiza el componente ProductCard para cada producto */}
        </div>
      ))}
    </div>
  );
};

export default Home; // Exporta el componente Home
