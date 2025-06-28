import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaUser, FaCity, FaEnvelope, FaMoneyCheckAlt } from 'react-icons/fa';

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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = (fieldValues = form) => {
    let temp = { ...errors };
    if ('nombre' in fieldValues)
      temp.nombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,30}$/.test(fieldValues.nombre)
        ? ''
        : 'Ingrese un nombre válido (solo letras, 2-30 caracteres)';
    if ('apellido' in fieldValues)
      temp.apellido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,30}$/.test(fieldValues.apellido)
        ? ''
        : 'Ingrese un apellido válido (solo letras, 2-30 caracteres)';
    if ('correo' in fieldValues)
      temp.correo = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.correo) ? '' : 'Correo inválido';
    if ('direccion' in fieldValues)
      temp.direccion = fieldValues.direccion ? '' : 'La dirección es requerida';
    if ('cp' in fieldValues)
      temp.cp = /^\d{4,8}$/.test(fieldValues.cp)
        ? ''
        : 'Código postal inválido (solo números, 4-8 dígitos)';
    if ('ciudad' in fieldValues)
      temp.ciudad = fieldValues.ciudad ? '' : 'La ciudad es requerida';
    setErrors({ ...temp });
    return Object.values(temp).every(x => x === '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    validate({ ...form, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validate(form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSuccess(true);
      setTimeout(() => {
        dispatch(clearCart());
        navigate('/success');
      }, 1200);
    } else {
      setTouched({ nombre: true, apellido: true, correo: true, direccion: true, cp: true, ciudad: true });
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg border">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        <FaMoneyCheckAlt className="inline-block mr-2 text-blue-600" />
        Formulario de Pago
      </h2>
      {success && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-center font-semibold border border-green-300 animate-pulse">
          ¡Pago exitoso! Redirigiendo...
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="text-sm text-gray-600">Nombre</label>
            <div className={`flex items-center border rounded px-3 ${errors.nombre && touched.nombre ? 'border-red-400' : 'border-gray-300'}`}>
              <FaUser className="text-gray-400 mr-2" />
              <input type="text" name="nombre" value={form.nombre} onChange={handleChange} onBlur={handleBlur} placeholder="Juan"
                required className="w-full p-2 outline-none bg-transparent" />
            </div>
            {errors.nombre && touched.nombre && <span className="text-xs text-red-500 ml-1">{errors.nombre}</span>}
          </div>
          <div className="w-full sm:w-1/2">
            <label className="text-sm text-gray-600">Apellido</label>
            <div className={`flex items-center border rounded px-3 ${errors.apellido && touched.apellido ? 'border-red-400' : 'border-gray-300'}`}>
              <FaUser className="text-gray-400 mr-2" />
              <input type="text" name="apellido" value={form.apellido} onChange={handleChange} onBlur={handleBlur} placeholder="Pérez"
                required className="w-full p-2 outline-none bg-transparent" />
            </div>
            {errors.apellido && touched.apellido && <span className="text-xs text-red-500 ml-1">{errors.apellido}</span>}
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600">Correo electrónico</label>
          <div className={`flex items-center border rounded px-3 ${errors.correo && touched.correo ? 'border-red-400' : 'border-gray-300'}`}>
            <FaEnvelope className="text-gray-400 mr-2" />
            <input type="email" name="correo" value={form.correo} onChange={handleChange} onBlur={handleBlur} placeholder="correo@ejemplo.com"
              required className="w-full p-2 outline-none bg-transparent" />
          </div>
          {errors.correo && touched.correo && <span className="text-xs text-red-500 ml-1">{errors.correo}</span>}
        </div>

        <div>
          <label className="text-sm text-gray-600">Dirección</label>
          <div className={`flex items-center border rounded px-3 ${errors.direccion && touched.direccion ? 'border-red-400' : 'border-gray-300'}`}>
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <input type="text" name="direccion" value={form.direccion} onChange={handleChange} onBlur={handleBlur} placeholder="Calle Falsa 123"
              required className="w-full p-2 outline-none bg-transparent" />
          </div>
          {errors.direccion && touched.direccion && <span className="text-xs text-red-500 ml-1">{errors.direccion}</span>}
        </div>

        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="text-sm text-gray-600">Código Postal</label>
            <div className={`flex items-center border rounded px-3 ${errors.cp && touched.cp ? 'border-red-400' : 'border-gray-300'}`}>
              <span className="text-gray-400 mr-2">📮</span>
              <input type="text" name="cp" value={form.cp} onChange={handleChange} onBlur={handleBlur} placeholder="1405"
                required className="w-full p-2 outline-none bg-transparent" />
            </div>
            {errors.cp && touched.cp && <span className="text-xs text-red-500 ml-1">{errors.cp}</span>}
          </div>
          <div className="w-full sm:w-1/2">
            <label className="text-sm text-gray-600">Ciudad</label>
            <div className={`flex items-center border rounded px-3 ${errors.ciudad && touched.ciudad ? 'border-red-400' : 'border-gray-300'}`}>
              <FaCity className="text-gray-400 mr-2" />
              <input type="text" name="ciudad" value={form.ciudad} onChange={handleChange} onBlur={handleBlur} placeholder="Buenos Aires"
                required className="w-full p-2 outline-none bg-transparent" />
            </div>
            {errors.ciudad && touched.ciudad && <span className="text-xs text-red-500 ml-1">{errors.ciudad}</span>}
          </div>
        </div>

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

        <button type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition duration-200">
          Confirmar Compra
        </button>
      </form>
    </div>
  );
};

export default Checkout;