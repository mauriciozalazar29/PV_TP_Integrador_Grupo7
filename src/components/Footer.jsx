import { FaFacebookF, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard, FaCcPaypal, FaEnvelope } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';

const Footer = () => {
  return (
     <footer className="bg-gradient-to-b from-blue-50 to-blue-100 text-gray-800 border-t border-blue-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">SUSCRIBITE A NUESTRO NEWSLETTER</h2>
          <p className="text-gray-600 mb-6">Recibí nuestras ofertas y novedades</p>
          <div className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Ingresá tu email" 
              className="px-4 py-3 w-full rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-r-lg transition duration-300 flex items-center">
              <IoMdSend className="mr-2" />
              Enviar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Acerca De */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800 border-b border-gray-300 pb-2">ACERCA DE</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500 transition">Quienes Somos</a></li>
               <li><a href="#" className="hover:text-blue-500 transition">Políticas de Privacidad</a></li>
               <li><a href="#" className="hover:text-blue-500 transition">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-blue-500 transition">Sucursales</a></li>
            </ul>
          </div>

          {/* Información */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800 border-b border-gray-300 pb-2">INFORMACIÓN</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500 transition">Medios de pago</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Preguntas frecuentes</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Políticas de envío</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Políticas de privacidad</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Políticas de cambio y devolución</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Cómo comprar</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Guía de talles</a></li>
              <li><a href="https://autogestion.produccion.gob.ar/consumidores" className="hover:text-blue-500 transition">Defensa del Consumidor</a></li>
            </ul>
          </div>
          {/* Ayuda */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800 border-b border-gray-300 pb-2">AYUDA</h3>
            <ul className="space-y-2">
              <li className="font-semibold">0800-777-6789</li>
              <li><a href="#" className="hover:text-blue-500 transition">Compras y devoluciones</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Botón de Arrepentimiento</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Gestión de Pedidos</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Compra segura</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Sugerencias y reclamos</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-8">
        
          <div className="mb-4 md:mb-0">
            <h4 className="font-semibold text-gray-800 mb-3">SEGUINOS</h4>
            <div className="flex space-x-4">
              <a href="#" className="bg-white p-2 rounded-full border border-gray-200 hover:bg-blue-50 transition">
                <FaFacebookF className="text-blue-600" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full border border-gray-200 hover:bg-pink-50 transition">
                <FaInstagram className="text-pink-600" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full border border-gray-200 hover:bg-blue-100 transition">
                <FaTwitter className="text-blue-400" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full border border-gray-200 hover:bg-green-50 transition">
                <FaEnvelope className="text-green-600" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <FaCcVisa className="text-3xl text-gray-700" />
            <FaCcMastercard className="text-3xl text-gray-700" />
            <FaCcPaypal className="text-3xl text-gray-700" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Mercado Pago" className="h-8" />
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-8">
          <p>© {new Date().getFullYear()} Mi Tienda Online - Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;