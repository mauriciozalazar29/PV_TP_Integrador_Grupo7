import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="max-w-xl mx-auto mt-12 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-600">¡Gracias por tu compra! 🎉</h1>
      <p className="mb-6">Tu pedido fue procesado correctamente.</p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default Success;
