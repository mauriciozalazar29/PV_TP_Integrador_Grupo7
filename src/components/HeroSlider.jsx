import { useEffect, useState } from 'react';
import promo1 from '../assets/promo1.webp';
import promo2 from '../assets/promo2.webp';
import promo3 from '../assets/promo3.webp';
import promoFija from '../assets/promo4.webp';

const images = [promo1, promo2, promo3];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

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
    <div className="w-full mx-auto mb-4 max-w-screen-2xl px-2 sm:px-4">

      <div className="relative overflow-hidden rounded-xl shadow-2xl group 
                      w-full
                      h-40 xs:h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96
                      min-h-[160px] max-h-[400px] bg-gray-100">
        
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === current 
                  ? 'opacity-100 scale-100 z-10' 
                  : 'opacity-0 scale-105 z-0'
              }`}
            >
              <img
                src={image}
                alt={`Promoción ${index + 1}`}
                className="w-full h-full object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"}
                style={{ objectPosition: 'center center' }}
              />
            </div>
          ))}
   
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent z-20"></div>
        </div>

        <button
          onClick={prev}
          className="absolute top-1/2 left-1 sm:left-2 transform -translate-y-1/2 
                     bg-white/95 hover:bg-white backdrop-blur-md
                     p-1.5 sm:p-2 rounded-full shadow-xl border border-white/20
                     transition-all duration-300 hover:scale-110 hover:shadow-2xl
                     opacity-0 group-hover:opacity-100 focus:opacity-100 
                     focus:outline-none focus:ring-2 focus:ring-white/50
                     z-30"
          aria-label="Slide anterior"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={next}
          className="absolute top-1/2 right-1 sm:right-2 transform -translate-y-1/2 
                     bg-white/95 hover:bg-white backdrop-blur-md
                     p-1.5 sm:p-2 rounded-full shadow-xl border border-white/20
                     transition-all duration-300 hover:scale-110 hover:shadow-2xl
                     opacity-0 group-hover:opacity-100 focus:opacity-100 
                     focus:outline-none focus:ring-2 focus:ring-white/50
                     z-30"
          aria-label="Slide siguiente"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 
                        flex gap-1.5 sm:gap-2 bg-black/20 backdrop-blur-md rounded-full px-2 py-1.5 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`transition-all duration-300 rounded-full
                         focus:outline-none focus:ring-2 focus:ring-white/50 ${
                index === current 
                  ? 'w-4 sm:w-5 h-1.5 sm:h-2 bg-white shadow scale-110' 
                  : 'w-2 sm:w-3 h-1.5 sm:h-2 bg-white/50 hover:bg-white/70 hover:scale-105'
              }`}
              aria-label={`Ir a promoción ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 sm:mt-4 overflow-hidden rounded-lg sm:rounded-xl shadow-lg
                      h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28
                      min-h-[56px] max-h-[120px] bg-gray-50
                      hover:shadow-xl transition-shadow duration-300">
        <img
          src={promoFija}
          alt="Promoción Mercado Pago - 3 y 6 cuotas sin interés"
          className="w-full h-full object-cover object-center 
                     hover:scale-[1.02] transition-transform duration-300"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default HeroSlider;