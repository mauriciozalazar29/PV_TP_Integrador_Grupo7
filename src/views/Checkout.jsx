import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaUser, FaCity, FaEnvelope,FaCreditCard, FaPaypal, FaIdCard} from 'react-icons/fa';
import { SiMercadopago } from 'react-icons/si';
import { GiOrange } from 'react-icons/gi';
import { BsPhone, BsCheckCircleFill } from 'react-icons/bs';
import { MdPayment } from 'react-icons/md';
import { Bs123 } from 'react-icons/bs';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    dni: '',
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
    if ('dni' in fieldValues)
      temp.dni = fieldValues.dni
        ? (/^\d{7,9}$/.test(fieldValues.dni)
            ? ''
            : 'Ingrese un DNI válido (7-9 dígitos numéricos)')
        : 'El DNI es obligatorio';
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
      setTouched({ nombre: true, apellido: true, dni: true, correo: true, direccion: true, cp: true, ciudad: true });
      setSuccess(false);
    }
  };

  const PaymentMethodCard = ({ method, selected, onClick }) => {
    const methodData = {
      tarjeta: {
        icon: <FaCreditCard className="text-blue-700" size={24} />,
        title: "Tarjeta de crédito/débito",
        subtitle: "Visa, MasterCard, Amex, etc.",
        borderColor: selected ? "border-blue-500" : "border-gray-200",
        ringColor: selected ? "ring-2 ring-blue-200" : "",
        bgColor: selected ? "bg-blue-50" : "",
        iconBgColor: selected ? "bg-blue-100" : "bg-gray-100",
        checkBgColor: "bg-blue-500"
      },
      paypal: {
        icon: <FaPaypal className="text-blue-500" size={24} />,
        title: "PayPal",
        subtitle: "Paga con tu cuenta PayPal",
        borderColor: selected ? "border-blue-500" : "border-gray-200",
        ringColor: selected ? "ring-2 ring-blue-200" : "",
        bgColor: selected ? "bg-blue-50" : "",
        iconBgColor: selected ? "bg-blue-100" : "bg-gray-100",
        checkBgColor: "bg-blue-500"
      },
      mercado: {
        icon: <SiMercadopago className="text-cyan-500" size={24} />,
        title: "Mercado Pago",
        subtitle: "Pagá con Mercado Pago",
        borderColor: selected ? "border-cyan-500" : "border-gray-200",
        ringColor: selected ? "ring-2 ring-cyan-200" : "",
        bgColor: selected ? "bg-cyan-50" : "",
        iconBgColor: selected ? "bg-cyan-100" : "bg-gray-100",
        checkBgColor: "bg-cyan-500"
      },
      'Tarjeta Naranja': {
        icon: <GiOrange className="text-orange-500" size={24} />,
        title: "Tarjeta Naranja",
        subtitle: "Solo Tarjeta Naranja",
        borderColor: selected ? "border-orange-500" : "border-gray-200",
        ringColor: selected ? "ring-2 ring-orange-200" : "",
        bgColor: selected ? "bg-orange-50" : "",
        iconBgColor: selected ? "bg-orange-100" : "bg-gray-100",
        checkBgColor: "bg-orange-500"
      },
      Modo: {
        icon: <BsPhone className="text-purple-500" size={24} />,
        title: "Modo",
        subtitle: "Pagá desde tu app bancaria",
        borderColor: selected ? "border-purple-500" : "border-gray-200",
        ringColor: selected ? "ring-2 ring-purple-200" : "",
        bgColor: selected ? "bg-purple-50" : "",
        iconBgColor: selected ? "bg-purple-100" : "bg-gray-100",
        checkBgColor: "bg-purple-500"
      }
    };

    const currentMethod = methodData[method] || {};
    
    return (
      <div 
        className={`relative p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:border-gray-300 flex items-start gap-3 ${currentMethod.borderColor} ${currentMethod.ringColor} ${currentMethod.bgColor}`}
        onClick={onClick}
      >
        {selected && (
          <div className={`absolute -top-2 -right-2 text-white rounded-full p-1 ${currentMethod.checkBgColor}`}>
            <BsCheckCircleFill size={16} />
          </div>
        )}
        <div className={`p-2 rounded-lg ${currentMethod.iconBgColor}`}>
          {currentMethod.icon}
        </div>
        <div>
          <h4 className="font-medium text-gray-800">{currentMethod.title}</h4>
          <p className="text-xs text-gray-500">{currentMethod.subtitle}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-start mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
            <MdPayment size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Finalizar Compra</h1> 
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            {success && (
              <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-800 text-center font-semibold border border-green-200 animate-pulse flex items-center justify-center gap-2">
                <BsCheckCircleFill size={18} />
                ¡Pago exitoso! Redirigiendo...
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Sección Información Personal */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <FaUser size={14} />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Información Personal
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <div className={`relative flex items-center border rounded-lg px-3 py-2 ${errors.nombre && touched.nombre ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}>
                      <FaUser className="text-gray-400 mr-2" />
                      <input 
                        type="text" 
                        name="nombre" 
                        value={form.nombre} 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        placeholder="Juan"
                        className="w-full outline-none bg-transparent placeholder-gray-400"
                      />
                    </div>
                    {errors.nombre && touched.nombre && <span className="text-xs text-red-500 ml-1">{errors.nombre}</span>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                    <div className={`relative flex items-center border rounded-lg px-3 py-2 ${errors.apellido && touched.apellido ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}>
                      <FaUser className="text-gray-400 mr-2" />
                      <input 
                        type="text" 
                        name="apellido" 
                        value={form.apellido} 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        placeholder="Pérez"
                        className="w-full outline-none bg-transparent placeholder-gray-400"
                      />
                    </div>
                    {errors.apellido && touched.apellido && <span className="text-xs text-red-500 ml-1">{errors.apellido}</span>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                    <div className={`relative flex items-center border rounded-lg px-3 py-2 ${errors.dni && touched.dni ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}>
                      <FaIdCard className="text-gray-400 mr-2" />
                      <input 
                        type="text" 
                        name="dni" 
                        value={form.dni} 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        placeholder="12345678"
                        className="w-full outline-none bg-transparent placeholder-gray-400"
                        maxLength={9}
                      />
                    </div>
                    {errors.dni && touched.dni && <span className="text-xs text-red-500 ml-1">{errors.dni}</span>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                    <div className={`relative flex items-center border rounded-lg px-3 py-2 ${errors.correo && touched.correo ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}>
                      <FaEnvelope className="text-gray-400 mr-2" />
                      <input 
                        type="email" 
                        name="correo" 
                        value={form.correo} 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        placeholder="correo@ejemplo.com"
                        className="w-full outline-none bg-transparent placeholder-gray-400"
                      />
                    </div>
                    {errors.correo && touched.correo && <span className="text-xs text-red-500 ml-1">{errors.correo}</span>}
                  </div>
                </div>
              </div>

              {/* Sección Dirección */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <FaMapMarkerAlt size={14} />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Dirección de Envío
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                    <div className={`relative flex items-center border rounded-lg px-3 py-2 ${errors.direccion && touched.direccion ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}>
                      <FaMapMarkerAlt className="text-gray-400 mr-2" />
                      <input 
                        type="text" 
                        name="direccion" 
                        value={form.direccion} 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        placeholder="Calle Falsa 123"
                        className="w-full outline-none bg-transparent placeholder-gray-400"
                      />
                    </div>
                    {errors.direccion && touched.direccion && <span className="text-xs text-red-500 ml-1">{errors.direccion}</span>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
                    <div className={`relative flex items-center border rounded-lg px-3 py-2 ${errors.cp && touched.cp ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}>
                      <Bs123 className="text-gray-400 mr-2" />
                      <input 
                        type="text" 
                        name="cp" 
                        value={form.cp} 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        placeholder="1405"
                        className="w-full outline-none bg-transparent placeholder-gray-400"
                      />
                    </div>
                    {errors.cp && touched.cp && <span className="text-xs text-red-500 ml-1">{errors.cp}</span>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                    <div className={`relative flex items-center border rounded-lg px-3 py-2 ${errors.ciudad && touched.ciudad ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}>
                      <FaCity className="text-gray-400 mr-2" />
                      <input 
                        type="text" 
                        name="ciudad" 
                        value={form.ciudad} 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        placeholder="Buenos Aires"
                        className="w-full outline-none bg-transparent placeholder-gray-400"
                      />
                    </div>
                    {errors.ciudad && touched.ciudad && <span className="text-xs text-red-500 ml-1">{errors.ciudad}</span>}
                  </div>
                </div>
              </div>

              {/* Sección Método de Pago */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <FaCreditCard size={14} />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Método de Pago
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['tarjeta', 'paypal', 'mercado', 'Tarjeta Naranja', 'Modo'].map((method) => (
                    <PaymentMethodCard
                      key={method}
                      method={method}
                      selected={form.metodoPago === method}
                      onClick={() => setForm(prev => ({ ...prev, metodoPago: method }))}
                    />
                  ))}
                </div>
              </div>

              {/* Botón de compra y seguridad */}
              <div className="space-y-4">
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  Finalizar Compra
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;