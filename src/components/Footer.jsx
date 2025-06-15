import { FaFacebookF, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        
        {/* Marca */}
        <div>
          <h2 className="text-xl font-bold text-blue-400 mb-4">🛍️ Mi Tienda</h2>
          <p>Ofrecemos los mejores productos a precios accesibles. Comprá fácil, rápido y seguro desde cualquier lugar.</p>
        </div>

        {/* Categorías */}
        <div>
          <h3 className="font-semibold mb-3">Categorías</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Tecnología</a></li>
            <li><a href="#" className="hover:underline">Hogar</a></li>
            <li><a href="#" className="hover:underline">Moda</a></li>
            <li><a href="#" className="hover:underline">Juguetes</a></li>
          </ul>
        </div>

        {/* Ayuda */}
        <div>
          <h3 className="font-semibold mb-3">Ayuda</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Preguntas frecuentes</a></li>
            <li><a href="#" className="hover:underline">Envíos y devoluciones</a></li>
            <li><a href="#" className="hover:underline">Soporte técnico</a></li>
            <li><a href="#" className="hover:underline">Política de privacidad</a></li>
          </ul>
        </div>

        {/* Contacto + Redes */}
        <div>
          <h3 className="font-semibold mb-3">Contacto</h3>
          <p>Email: contacto@tiendavirtual.com</p>
          <p>Teléfono: +54 388 1234567</p>
          <div className="flex space-x-4 mt-4">
            <a href="#"><FaFacebookF className="hover:text-blue-500" /></a>
            <a href="#"><FaInstagram className="hover:text-pink-400" /></a>
            <a href="#"><FaTwitter className="hover:text-blue-300" /></a>
          </div>
          <div className="flex space-x-4 mt-4 text-xl">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
          </div>
        </div>

      </div>

      <div className="text-center text-gray-400 text-xs py-4 border-t border-gray-700">
        © 2025 Mi Tienda – Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
