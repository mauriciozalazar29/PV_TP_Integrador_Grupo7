import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaUser , FaCity, FaEnvelope, FaMoneyCheckAlt } from 'react-icons/fa';

// Checkout.jsx
// Componente que muestra el formulario de pago. Recoge datos del usuario y método de pago.
// Al enviar el formulario, limpia el carrito y navega a la página de éxito.
// Botón principal: "Confirmar Compra".

const Checkout = () => {
  const dispatch = useDispatch(); // Hook para despachar acciones de Redux
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // Estado local para manejar los datos del formulario
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    direccion: '',
    cp: '',
    ciudad: '',
    metodoPago: 'tarjeta', // Método de pago por defecto
  });

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target; // Desestructura el nombre y valor del campo
    setForm(prev => ({ ...prev, [name]: value })); // Actualiza el estado del formulario
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    console.log('Formulario enviado:', form); // Muestra los datos del formulario en la consola
    dispatch(clearCart()); // Limpia el carrito al enviar el formulario
    navigate('/success'); // Redirige a la página de éxito
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg border">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        <FaMoneyCheckAlt className="inline-block mr-2 text-blue-600" />
        Formulario de Pago
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Sección para nombre y apellido */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="text-sm text-gray-600">Nombre</label>
            <div className="flex items-center border rounded px-3">
              <FaUser  className="text-gray-400 mr-2" />
              <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Juan"
                required className="w-full p-2 outline-none" />
            </div>
          </div>
          <div className="w-1/2">
            <label className="text-sm text-gray-600">Apellido</label>
            <div className="flex items-center border rounded px-3">
              <FaUser  className="text-gray-400 mr-2" />
              <input type="text" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Pérez"
                required className="w-full p-2 outline-none" />
            </div>
          </div>
        </div>

        {/* Sección para correo electrónico */}
        <div>
          <label className="text-sm text-gray-600">Correo electrónico</label>
          <div className="flex items-center border rounded px-3">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input type="email" name="correo" value={form.correo} onChange={handleChange} placeholder="correo@ejemplo.com"
              required className="w-full p-2 outline-none" />
          </div>
        </div>

        {/* Sección para dirección */}
        <div>
          <label className="text-sm text-gray-600">Dirección</label>
          <div className="flex items-center border rounded px-3">
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <input type="text" name="direccion" value={form.direccion} onChange={handleChange} placeholder="Calle Falsa 123"
              required className="w-full p-2 outline-none" />
          </div>
        </div>

        {/* Sección para código postal y ciudad */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="text-sm text-gray-600">Código Postal</label>
            <div className="flex items-center border rounded px-3">
              <span className="text-gray-400 mr-2">📮</span>
              <input type="text" name="cp" value={form.cp} onChange={handleChange} placeholder="1405"
                required className="w-full p-2 outline-none" />
            </div>
          </div>
          <div className="w-1/2">
            <label className="text-sm text-gray-600">Ciudad</label>
            <div className="flex items-center border rounded px-3">
              <FaCity className="text-gray-400 mr-2" />
              <input type="text" name="ciudad" value={form.ciudad} onChange={handleChange} placeholder="Buenos Aires"
                required className="w-full p-2 outline-none" />
            </div>
          </div>
        </div>

        {/* Sección para método de pago */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Método de Pago</label>
          <select name="metodoPago" value={form.metodoPago} onChange={handleChange}
            className="w-full border p-3 rounded outline-none">
            <option value="tarjeta">💳 Tarjeta de crédito</option>
            <option value="paypal">🅿️ PayPal</option>
            <option value="mercado">💰 Mercado Pago</option>
            <option value="Tarjeta Naranja">🟠 Tarjeta Naranja</option>
            <option value="Modo">📱 Modo</option>
          </select>
        </div>

        {/* Botón para confirmar la compra */}
        <button type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition duration-200">
          Confirmar Compra
        </button>
      </form>
    </div>
  );
};

export default Checkout;
