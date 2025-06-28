import { Link } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaHeadset } from 'react-icons/fa';

const Success = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">

        <div className="bg-white rounded-2xl shadow-lg p-10 sm:p-12 text-center flex flex-col items-center gap-6">
   
          <div className="mx-auto mb-2 text-green-500 animate-bounce">
            <FaCheckCircle size={70} />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            ¡Gracias por tu compra! <span className="text-green-500">🎉</span>
          </h2>

          <p className="text-gray-600 max-w-md mx-auto text-base sm:text-lg">
            Tu pedido ha sido procesado correctamente.<br />
            Hemos enviado los detalles a tu correo electrónico y actualizaremos el estado del envío tan pronto como sea procesado.
          </p>

          {/* Botón principal */}
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow hover:shadow-md font-semibold text-base sm:text-lg mt-2"
          >
            <FaHome size={18} />
            Volver al inicio
          </Link>

          {/* Acción secundaria */}
          <a
            href="https://wa.me/5491112345678?text=Hola,%20necesito%20ayuda%20con%20mi%20pedido"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium text-sm mt-2"
          >
            <FaHeadset size={15} />
            ¿Necesitas ayuda?
          </a>

          {/* Mensaje adicional */}
          <div className="w-full mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700 font-medium">
              📦 Tu pedido será enviado en un plazo de 3-5 días hábiles
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;