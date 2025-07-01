import { useEffect, useState } from 'react'; // Importa hooks de React para manejar el estado y efectos secundarios
import promo1 from '../assets/promo1.webp'; // Importa imágenes de promociones
import promo2 from '../assets/promo2.webp';
import promo3 from '../assets/promo3.webp';
import promo5 from '../assets/promo5.webp';
import promoFija from '../assets/promo4.webp'; // Importa una imagen de promoción fija

// Array que contiene las imágenes de las promociones
const images = [promo1, promo2, promo3, promo5];

const HeroSlider = () => {
  // Estado para llevar el índice de la imagen actual
  const [current, setCurrent] = useState(0);

  // Hook useEffect para configurar un intervalo que cambia la imagen cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length); // Cambia al siguiente índice, volviendo al inicio si es necesario
    }, 5000);
    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  // Función para ir a una imagen específica
  const goTo = index => setCurrent(index);
  // Función para avanzar a la siguiente imagen
  const next = () => setCurrent(prev => (prev + 1) % images.length);
  // Función para retroceder a la imagen anterior
  const prev = () => setCurrent(prev => (prev - 1 + images.length) % images.length);

  return (
    <div className="w-full mx-auto mb-4 max-w-full px-1 xs:px-2 sm:px-4">
      {/* Contenedor principal del slider */}
      <div className="relative overflow-hidden rounded-xl shadow-2xl group 
                      w-full aspect-[16/8] sm:aspect-[16/9] md:aspect-[16/8] lg:aspect-[16/7] max-h-[600px] bg-gray-100">
        <div className="relative w-full h-full overflow-hidden">
          {/* Mapeo de imágenes para crear los slides */}
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === current 
                  ? 'opacity-100 scale-100 z-10' // Imagen actual visible
                  : 'opacity-0 scale-105 z-0' // Imágenes no actuales ocultas
              }`}
            >
              <img
                src={image}
                alt={`Promoción ${index + 1}`} // Texto alternativo para accesibilidad
                className="w-full h-full object-contain object-center"
                loading={index === 0 ? "eager" : "lazy"} // Carga diferida para imágenes no visibles
              />
            </div>
          ))}
        </div>

        {/* Botón anterior para navegar a la imagen anterior */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-1 sm:left-2 transform -translate-y-1/2 
                     bg-white/95 hover:bg-white backdrop-blur-md
                     p-1.5 sm:p-2 rounded-full shadow-xl border border-white/20
                     transition-all duration-300 hover:scale-110 hover:shadow-2xl
                     opacity-0 group-hover:opacity-100 focus:opacity-100 
                     focus:outline-none focus:ring-2 focus:ring-white/50
                     z-30"
          aria-label="Slide anterior" // Atributo para accesibilidad
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Botón siguiente para navegar a la imagen siguiente */}
        <button
          onClick={next}
          className="absolute top-1/2 right-1 sm:right-2 transform -translate-y-1/2 
                     bg-white/95 hover:bg-white backdrop-blur-md
                     p-1.5 sm:p-2 rounded-full shadow-xl border border-white/20
                     transition-all duration-300 hover:scale-110 hover:shadow-2xl
                     opacity-0 group-hover:opacity-100 focus:opacity-100 
                     focus:outline-none focus:ring-2 focus:ring-white/50
                     z-30"
          aria-label="Slide siguiente" // Atributo para accesibilidad
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicadores de navegación para las imágenes */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 
                        flex gap-1.5 sm:gap-2 bg-black/20 backdrop-blur-md rounded-full px-2 py-1.5 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)} // Navega a la imagen correspondiente
              className={`transition-all duration-300 rounded-full
                         focus:outline-none focus:ring-2 focus:ring-white/50 ${
                index === current 
                  ? 'w-4 sm:w-5 h-1.5 sm:h-2 bg-white shadow scale-110' // Indicador activo
                  : 'w-2 sm:w-3 h-1.5 sm:h-2 bg-white/50 hover:bg-white/70 hover:scale-105' // Indicador inactivo
              }`}
              aria-label={`Ir a promoción ${index + 1}`} // Atributo para accesibilidad
            />
          ))}
        </div>
      </div>

      {/* Sección de promoción fija que se muestra debajo del slider */}
      <div className="mt-3 sm:mt-6 overflow-hidden rounded-xl shadow-xl
                      h-[60px] sm:h-[80px] md:h-[100px] lg:h-[120px] xl:h-[140px]
                      bg-white w-full">
        <img
          src={promoFija}
          alt="Promoción Mercado Pago - 3 y 6 cuotas sin interés" // Texto alternativo para accesibilidad
          className="w-full h-full object-cover object-center
                     hover:scale-[1.02] transition-transform duration-300" // Efecto de escala al pasar el mouse
          loading="lazy" // Carga diferida
        />
      </div>
    </div>
  );
};

export default HeroSlider; // Exporta el componente para su uso en otras partes de la aplicación
