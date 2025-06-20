import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { addToCart } from '../features/cart/cartSlice';
import { useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector(state =>
    state.products.items.find(item => item.id === parseInt(id))
  );

  const favorites = useSelector(state => state.favorites);
  const isFav = favorites.includes(parseInt(id));

  const [tab, setTab] = useState('descripcion');
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [talleSeleccionado, setTalleSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  const categoria = product?.category?.toLowerCase() || '';
  const titulo = product?.title?.toLowerCase() || '';
  const rating = product?.rating?.rate ?? 4.2;
  const reviewCount = product?.rating?.count ?? Math.floor(Math.random() * 500) + 50;

  const mostrarTalles = (
    categoria.includes("clothing") &&
    (
      titulo.includes("shirt") ||
      titulo.includes("jacket") ||
      titulo.includes("remera") ||
      titulo.includes("campera") ||
      titulo.includes("t-shirt")
    )
  );

  const mostrarGuiaDeTalles = mostrarTalles && categoria !== 'jewelery';

  const detallesPorId = {
    1: ['Material: Algodón 100%', 'Lavado: Lavar a mano', 'Origen: Argentina'],
    2: ['Material: Algodón 100%', 'Lavado: Lavar a mano', 'Origen: Brasil'],
    3: ['Material: Cuero sintético', 'Lavado: Lavar a mano', 'Origen: Uruguay'],
    4: ['Material: Algodón 100%', 'Lavado: Lavar a mano', 'Origen: Chile'],
    5: ['Material: Plata', 'Género: Mujer', 'Estilo: Ajustable', 'Peso: 2.3g'],
    6: ['Material: Plata y Oro', 'Género: Mujer', 'Diámetro: 4 cm', 'Peso: 2.2g'],
    7: ['Material: Diamante Blanco', 'Género: Mujer', 'Ancho: 3mm', 'Grosor: 1mm', 'Peso: 2.5g'],
    8: ['Material: Acero inoxidable', 'Género: Mujer', 'Largo x Ancho 5 cm x 1.6mm'],
    9: ['Marca: WD Elements', 'Color: Negro', 'Modelo: Externo', 'Capacidad: 2TB', 'Velocidad: 5900 rpm', 'Dimensiones: 7.8cm x 1.4cm', 'Peso: 150g'],
    10: ['Marca: SanDisk', 'Color: Negro', 'Modelo: Interno', 'Capacidad: 1TB', 'Velocidad: 5400 rpm', 'Dimensiones: 4.8cm x 1.1cm', 'Peso: 120g'],
    11: ['Marca: Silicon Power', 'Color: Negro', 'Modelo: Interno', 'Capacidad: 256GB', 'Velocidad: 5400 rpm', 'Dimensiones: 4.8cm x 1.1cm', 'Peso: 120g'],
    12: ['Marca: WD', 'Color: Negro', 'Modelo: Externo', 'Capacidad: 4TB', 'Velocidad: 5400 rpm', 'Dimensiones: 4.8cm x 1cm', 'Peso: 100g'],
    13: ['Marca: Acer', 'Color: Negro', 'Voltaje: 220V', 'Pantalla: 1920 x 1080', 'Resolución: Full HD', 'Frecuencia: 75Hz', 'Tiempo de respuesta: 1ms', 'Peso: 3kg'],
    14: ['Marca: Samsung', 'Color: Negro', 'Voltaje: 220V', 'Pantalla: 3840 x 1080', 'Resolución: Full HD', 'Frecuencia: 144Hz', 'Tiempo de respuesta: 1ms', 'Peso: 5kg'],
    15: ['Material: Poliéster 100%', 'Lavado: Lavar a mano', 'Origen: EEUU'],
    16: ['Material: Poliéster 75% y Algodón 25%', 'Lavado: Lavar a mano, No planchar', 'Origen: Argentina'],
    17: ['Material: Poliéster 75% y Algodón 25%', 'Lavado: Lavar a mano, No planchar', 'Origen: Argentina'],
    18: ['Material: Rayón 95% y Spandex 5%', 'Lavado: Lavar a mano', 'Origen: EEUU'],
    19: ['Material: Poliéster 100%', 'Lavado: Lavado a lavarropas', 'Origen: Argentina'],
    20: ['Material: Algodón 95% y Spandex 5%', 'Lavado: Lavado a lavarropas', 'Origen: Argentina'],
  };

  const obtenerDetalles = () => {
    return detallesPorId[product.id] || ['No hay detalles personalizados para este producto.'];
  };

  const calcularPrecioOriginal = (precio) => {
    const aumentoFicticio = 1.176; // Para que con 15% descuento quede el precio original
    return (precio * aumentoFicticio).toFixed(2);
  };

  const calcularCuotas = (precio) => {
    const precioTotal = precio * cantidad;
    return {
      tres: (precioTotal / 3).toFixed(2),
      seis: (precioTotal / 6).toFixed(2),
      doce: (precioTotal / 12).toFixed(2)
    };
  };

  const agregarAlCarrito = () => {
    if (mostrarTalles && !talleSeleccionado) {
      alert('Seleccioná un talle antes de continuar.');
      return;
    }

    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      size: mostrarTalles ? talleSeleccionado : null,
      quantity: cantidad,
    };

    dispatch(addToCart(item));
    navigate('/cart');
  };

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl text-gray-600">Producto no encontrado</p>
    </div>
  );

  const precioOriginalFicticio = calcularPrecioOriginal(product.price);
  const cuotas = calcularCuotas(product.price);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg overflow-hidden">
        
          <div className="p-6">
            <div
              onMouseMove={(e) => {
                const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - left) / width) * 100;
                const y = ((e.clientY - top) / height) * 100;
                setZoomPosition({ x, y });
              }}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              className="relative w-full h-96 lg:h-[500px] overflow-hidden rounded-xl border border-gray-200 cursor-zoom-in"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain transition-transform duration-300 ease-out"
                style={
                  isZoomed
                    ? { transform: 'scale(2.5)', transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                    : { transform: 'scale(1)' }
                }
              />
            </div>

            <div className="flex gap-3 mt-4 lg:hidden">
              <button
                onClick={() => dispatch(toggleFavorite(product.id))}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                  isFav 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                {isFav ? '❤️ En Favoritos' : '🤍 Favoritos'}
              </button>
              
              <button
                onClick={() => navigate(`/edit/${product.id}`)}
                className="px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                ✏️
              </button>
            </div>
          </div>

          {/* Sección de Información */}
          <div className="p-6 lg:p-8">
            
            {/* Header con título y acciones */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                  {product.title}
                </h1>
                <p className="text-sm text-gray-500 uppercase tracking-wide">
                  SKU: {product.category?.replace(/\s+/g, '').toUpperCase()}{product.id.toString().padStart(3, '0')}
                </p>
              </div>
              
              {/* Botones de acción desktop */}
              <div className="hidden lg:flex gap-3">
                <button
                  onClick={() => dispatch(toggleFavorite(product.id))}
                  className={`p-3 rounded-lg transition-colors ${
                    isFav 
                      ? 'bg-red-100 text-red-700 border border-red-200' 
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  {isFav ? '❤️' : '🤍'}
                </button>
                
                <button
                  onClick={() => navigate(`/edit/${product.id}`)}
                  className="p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  ✏️
                </button>
              </div>
            </div>

            {/* Precio y valoración */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${precioOriginalFicticio}
                </span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                  15% OFF
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      {i < Math.floor(rating) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({rating.toFixed(1)}) • {reviewCount} reseñas
                </span>
              </div>
            </div>

            {/* Opciones de pago */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">💳 Opciones de pago</h3>
              <div className="space-y-1 text-sm text-blue-800">
                <p>3 cuotas sin interés de <strong>${cuotas.tres}</strong></p>
                <p>6 cuotas sin interés de <strong>${cuotas.seis}</strong></p>
                <p>12 cuotas fijas de <strong>${cuotas.doce}</strong></p>
              </div>
              <button className="text-blue-600 text-sm font-medium mt-2 hover:underline">
                Ver todos los medios de pago →
              </button>
            </div>

            {/* Selección de talle */}
            {mostrarTalles && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-900">Talle Argentino</h3>
                  <button 
                    onClick={() => setTab('guia')}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    ¿Tu talle está agotado?
                  </button>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map(talle => (
                    <button
                      key={talle}
                      onClick={() => setTalleSeleccionado(talle)}
                      className={`py-3 px-4 border rounded-lg font-medium transition-all ${
                        talleSeleccionado === talle 
                          ? 'border-blue-500 bg-blue-50 text-blue-700' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {talle}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selector de cantidad */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Cantidad</h3>
              <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-2 font-medium min-w-[50px] text-center">
                  {cantidad}
                </span>
                <button
                  onClick={() => setCantidad(cantidad + 1)}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={agregarAlCarrito}
                className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors"
              >
                AGREGAR AL CARRITO
              </button>
            </div>

            {/* Información adicional */}
            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <p>✅ Envío gratis a todo el país</p>
              <p>🔄 Devolución gratuita hasta 30 días</p>
              <p>🛡️ Garantía de fábrica</p>
            </div>
          </div>
        </div>

        {/* Tabs de información */}
        <div className="bg-white rounded-2xl shadow-lg mt-8 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              {[
                { id: 'descripcion', label: 'Descripción' },
                { id: 'detalles', label: 'Especificaciones' },
                ...(mostrarGuiaDeTalles ? [{ id: 'guia', label: 'Guía de Talles' }] : [])
              ].map((tabItem) => (
                <button
                  key={tabItem.id}
                  onClick={() => setTab(tabItem.id)}
                  className={`px-6 py-4 font-medium transition-colors ${
                    tab === tabItem.id
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tabItem.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {tab === 'descripcion' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {tab === 'detalles' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {obtenerDetalles().map((detalle, i) => {
                  const [key, value] = detalle.split(': ');
                  return (
                    <div key={i} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-900">{key}</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {tab === 'guia' && mostrarGuiaDeTalles && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Guía de Talles</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-4">Talle</th>
                        <th className="text-left py-2 px-4">Pecho (cm)</th>
                        <th className="text-left py-2 px-4">Cintura (cm)</th>
                        <th className="text-left py-2 px-4">Cadera (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 px-4 font-medium">S</td>
                        <td className="py-2 px-4">86-91</td>
                        <td className="py-2 px-4">76-81</td>
                        <td className="py-2 px-4">91-96</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 px-4 font-medium">M</td>
                        <td className="py-2 px-4">92-97</td>
                        <td className="py-2 px-4">82-87</td>
                        <td className="py-2 px-4">97-102</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 px-4 font-medium">L</td>
                        <td className="py-2 px-4">98-104</td>
                        <td className="py-2 px-4">88-94</td>
                        <td className="py-2 px-4">103-109</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 px-4 font-medium">XL</td>
                        <td className="py-2 px-4">105-112</td>
                        <td className="py-2 px-4">95-102</td>
                        <td className="py-2 px-4">110-117</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-medium">XXL</td>
                        <td className="py-2 px-4">113-120</td>
                        <td className="py-2 px-4">103-110</td>
                        <td className="py-2 px-4">118-125</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;