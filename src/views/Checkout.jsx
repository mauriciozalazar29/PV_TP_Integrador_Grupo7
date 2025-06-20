import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    direccion: '',
    cp: '',
    ciudad: '',
    metodoPago: 'tarjeta',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', form);
    dispatch(clearCart());
    navigate('/success');
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Formulario de Pago</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required className="w-full border p-2 rounded" />
        <input type="text" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Apellido" required className="w-full border p-2 rounded" />
        <input type="email" name="correo" value={form.correo} onChange={handleChange} placeholder="Correo electrónico" required className="w-full border p-2 rounded" />
        <input type="text" name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" required className="w-full border p-2 rounded" />
        <input type="text" name="cp" value={form.cp} onChange={handleChange} placeholder="Código Postal" required className="w-full border p-2 rounded" />
        <input type="text" name="ciudad" value={form.ciudad} onChange={handleChange} placeholder="Ciudad" required className="w-full border p-2 rounded" />

        <div>
          <label className="block mb-1 font-semibold">Método de Pago:</label>
          <select name="metodoPago" value={form.metodoPago} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="tarjeta">Tarjeta de crédito</option>
            <option value="paypal">PayPal</option>
            <option value="mercado">Mercado Pago</option>
            <option value="Tarjeta Naranja">Tarjeta Naranja</option>
            <option value="Modo">Modo</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Confirmar compra
        </button>
      </form>
    </div>
  );
};

export default Checkout;
