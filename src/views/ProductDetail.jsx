import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { addToCart } from '../features/cart/cartSlice';
import { useState, useMemo, useEffect } from 'react';
import { fetchProducts } from '../features/products/productsSlice';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorTalle, setErrorTalle] = useState('');

  // Nuevo: obtener loading y error
  const { items, loading, error } = useSelector(state => state.products);
  const product = items.find(item => item.id === parseInt(id));

  const favorites = useSelector(state => state.favorites);
  const isFav = favorites.includes(parseInt(id));

  const [tab, setTab] = useState('descripcion');
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [talleSeleccionado, setTalleSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  // Nuevo: cargar productos si no hay
  useEffect(() => {
    if (!items || items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items]);

  const categoria = product?.category?.toLowerCase() || '';
  const titulo = product?.title?.toLowerCase() || '';
  const rating = product?.rating?.rate ?? 4.2;
  const reviewCount = product?.rating?.count ?? Math.floor(Math.random() * 500) + 50;

  const mostrarTalles = useMemo(() => (
    categoria.includes("clothing") &&
    (
      titulo.includes("shirt") ||
      titulo.includes("jacket") ||
      titulo.includes("remera") ||
      titulo.includes("campera") ||
      titulo.includes("t-shirt")
    )
  ), [categoria, titulo]);

  const mostrarGuiaDeTalles = mostrarTalles && categoria !== 'jewelery';

  const detallesPorId = {
    1: ['Material: Algodón 100%', 'Lavado: Lavar a mano', 'Origen: Argentina'],
    2: ['Material: Algodón 100%', 'Lavado: Lavar a mano', 'Origen: Brasil'],
    // ... otros detalles
  };

  const obtenerDetalles = () => {
    return detallesPorId[product?.id] || ['No hay detalles personalizados para este producto.'];
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
      setErrorTalle('Seleccioná un talle antes de continuar.');
      return;
    }
    setErrorTalle('');
    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      size: mostrarTalles ? talleSeleccionado : null,
      quantity: cantidad,
    };
    dispatch(addToCart(item));
    toast.success('Producto agregado al carrito');
    navigate('/cart');
  };


  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl text-gray-600">Cargando producto...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl text-red-600">Error: {error}</p>
    </div>
  );

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
              onClick={() => setIsZoomed(z => !z)}
              onMouseMove={e => {
                if (!isZoomed) return;
                const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - left) / width) * 100;
                const y = ((e.clientY - top) / height) * 100;
                setZoomPosition({ x, y });
              }}
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
                onTouchMove={e => {
                  if (!isZoomed) return;
                  const touch = e.touches[0];
                  const target = e.currentTarget.parentElement;
                  if (target) {
                    const { left, top, width, height } = target.getBoundingClientRect();
                    const x = ((touch.clientX - left) / width) * 100;
                    const y = ((touch.clientY - top) / height) * 100;
                    setZoomPosition({ x, y });
                  }
                }}
              />
            </div>

            <div className="flex gap-3 mt-4 lg:hidden justify-end">
              <button
                onClick={() => dispatch(toggleFavorite(product.id))}
                className={`p-3 rounded-lg font-medium transition-colors ${
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
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map(talle => (
                    <button
                        key={talle}
                        onClick={() => {
                          setTalleSeleccionado(talle);
                          setErrorTalle('');
                        }}
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
                  {errorTalle && (
                    <p className="text-sm text-red-600 mt-2 font-medium">
                      {errorTalle}
                    </p>
                  )}
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
