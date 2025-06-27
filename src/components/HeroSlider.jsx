import { useEffect, useState } from 'react'; // Importa los hooks useEffect y useState de React
import promo1 from '../assets/promo1.webp'; // Importa las imágenes promocionales
import promo2 from '../assets/promo2.webp';
import promo3 from '../assets/promo3.webp';
import promoFija from '../assets/promo4.webp'; // Imagen fija que se muestra debajo del slider

// Arreglo de imágenes promocionales
const images = [promo1, promo2, promo3];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0); // Estado para almacenar el índice de la imagen actual

  // Efecto para cambiar automáticamente la imagen cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length); // Cambia a la siguiente imagen
    }, 5000);
    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  // Funciones para navegar entre las imágenes
  const goTo = index => setCurrent(index); // Cambia a la imagen en el índice especificado
  const next = () => setCurrent(prev => (prev + 1) % images.length); // Avanza a la siguiente imagen
  const prev = () => setCurrent(prev => (prev - 1 + images.length) % images.length); // Retrocede a la imagen anterior

  return (
    <div className="w-full mx-auto mb-4 max-w-screen-2xl px-2 sm:px-4">
      <div className="relative overflow-hidden rounded-xl shadow-2xl group 
                      w-full
                      h-40 xs:h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96
                      min-h-[160px] max-h-[400px] bg-gray-100">
        
        <div className="relative w-full h-full">
          {/* Mapea las imágenes y las muestra en el slider */}
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === current 
                  ? 'opacity-100 scale-100 z-10' // Imagen actual visible
                  : 'opacity-0 scale-105 z-0' // Otras imágenes ocultas
              }`}
            >
              <img
                src={image}
                alt={`Promoción ${index + 1}`} // Texto alternativo para accesibilidad
                className="w-full h-full object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"} // Carga la primera imagen de forma ansiosa, las demás de forma perezosa
                style={{ objectPosition: 'center center' }} // Centra la imagen
              />
            </div>
          ))}
   
          {/* Capa de degradado sobre las imágenes */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent z-20"></div>
        </div>

        {/* Botón para la imagen anterior */}
        <button
          onClick={prev} // Llama a la función prev al hacer clic
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
        
        {/* Botón para la imagen siguiente */}
        <button
          onClick={next} // Llama a la función next al hacer clic
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

        {/* Indicadores de la imagen actual */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 
                        flex gap-1.5 sm:gap-2 bg-black/20 backdrop-blur-md rounded-full px-2 py-1.5 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)} // Cambia a la imagen correspondiente al hacer clic
              className={`transition-all duration-300 rounded-full
                         focus:outline-none focus:ring-2 focus:ring-white/50 ${
                index === current 
                  ? 'w-4 sm:w-5 h-1.5 sm:h-2 bg-white shadow scale-110' // Estilo para la imagen actual
                  : 'w-2 sm:w-3 h-1.5 sm:h-2 bg-white/50 hover:bg-white/70 hover:scale-105' // Estilo para las imágenes no actuales
              }`}
              aria-label={`Ir a promoción ${index + 1}`} // Atributo para accesibilidad
            />
          ))}
        </div>
      </div>

      {/* Imagen fija que se muestra debajo del slider */}
      <div className="mt-3 sm:mt-4 overflow-hidden rounded-lg sm:rounded-xl shadow-lg
                      h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28
                      min-h-[56px] max-h-[120px] bg-gray-50
                      hover:shadow-xl transition-shadow duration-300">
        <img
          src={promoFija}
          alt="Promoción Mercado Pago - 3 y 6 cuotas sin interés" // Texto alternativo para accesibilidad
          className="w-full h-full object-cover object-center 
                     hover:scale-[1.02] transition-transform duration-300"
          loading="lazy" // Carga perezosa de la imagen
        />
      </div>
    </div>
  );
};

export default HeroSlider; // Exporta el componente para su uso en otras partes de la aplicación
