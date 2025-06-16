import { useEffect, useState } from 'react';
import promo1 from '../assets/promo1.webp';
import promo2 from '../assets/promo2.webp';
import promo3 from '../assets/promo3.webp';
import promoFija from '../assets/promo4.webp';

const images = [promo1, promo2, promo3];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  // Cambio automático cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = index => setCurrent(index);
  const next = () => setCurrent(prev => (prev + 1) % images.length);
  const prev = () => setCurrent(prev => (prev - 1 + images.length) % images.length);

  return (
    <div className="w-full mx-auto mb-4">
      {/* Slider principal - ahora ocupa todo el ancho */}
      <div className="relative overflow-hidden rounded-xl shadow-2xl group">
        {/* Imagen activa mejorada con altura responsive */}
        <div className="relative">
          <img
            src={images[current]}
            alt={`Promo ${current + 1}`}
            className="w-full h-[50vh] min-h-[400px] max-h-[600px] object-cover transition-all duration-700 ease-out transform group-hover:scale-105"
          />
          {/* Overlay sutil para mejor contraste */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>

        {/* Flechas profesionales */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={next}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicadores elegantes */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`transition-all duration-300 rounded-full ${
                index === current 
                  ? 'w-8 h-3 bg-white shadow-lg' 
                  : 'w-3 h-3 bg-white/60 hover:bg-white/90 hover:scale-125'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Imagen fija adicional */}
      <div className="mt-4 overflow-hidden rounded-xl shadow-lg">
        <img
          src={promoFija}
          alt="Promoción Mercado Pago - 3 y 6 cuotas sin interés"
          className="w-full h-[120px] md:h-[150px] object-cover"
        />
      </div>
    </div>
  );
};

export default HeroSlider;