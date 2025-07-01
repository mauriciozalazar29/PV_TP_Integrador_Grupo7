import { useEffect, useMemo, useRef, useState } from 'react';
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
  const sliderRef = useRef(null);

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

  // Separar electrónicos y no electrónicos
  const electronics = sorted.filter(p => p.category.toLowerCase() === 'electronics');
  const nonElectronics = sorted.filter(p => p.category.toLowerCase() !== 'electronics');

  // Dividir no electrónicos en filas
  const rows = [];
  for (let i = 0; i < nonElectronics.length; i += 4) {
    rows.push(nonElectronics.slice(i, i + 4));
  }
  const topRows = rows.slice(0, 2);
  const bottomRows = rows.slice(2, 5); 

  // Slider auto-scroll
  useEffect(() => {
    if (!sliderRef.current || electronics.length === 0) return;
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        // Si llega al final, vuelve al inicio
        if (
          sliderRef.current.scrollLeft + sliderRef.current.offsetWidth >=
          sliderRef.current.scrollWidth - 10
        ) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [electronics.length]);

  // Función para scroll horizontal
  const scrollSlider = (dir) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="p-4">
      <HeroSlider />
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 flex justify-start">
        {/* ...existing select... */}
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

      {/* Top 2 filas de no electrónicos */}
      {topRows.map((row, idx) => (
        <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-3 md:px-6 py-2">
          {row.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      ))}

      {/* Slider de electrónicos */}
      {electronics.length > 0 && (
        <div className="relative max-w-7xl mx-auto my-8">
          {/* Botones de scroll */}
          <button
            onClick={() => scrollSlider(-1)}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-white/30 backdrop-blur-md text-blue-700 shadow rounded-full p-1.5 hover:scale-110 hover:bg-white/60 transition-all duration-200 border border-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-300"
            aria-label="Scroll left"
            style={{boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)'}}
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' /></svg>
          </button>
          <div
            ref={sliderRef}
            className="flex overflow-x-hidden gap-6 px-12 py-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {electronics.map(product => (
              <div key={product.id} className="min-w-[250px] max-w-[250px] flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollSlider(1)}
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
          {row.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      ))}
    </div>
  );
};

export default Home;
