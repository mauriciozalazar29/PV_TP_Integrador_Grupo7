import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../features/favorites/favoritesSlice';
import { addToCart } from '../features/cart/cartSlice';
import { useState, useEffect } from 'react';
import { fetchProducts } from '../features/products/productsSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(state => state.products.items);
  const favorites = useSelector(state => state.favorites.items);

  // TODOS LOS HOOKS VAN AQUÍ
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [talleSeleccionado, setTalleSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  // Cargar productos si no están listos
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  // Loader mientras se cargan los productos
  if (!products || products.length === 0) {
    return <div className="text-center py-20">Cargando producto...</div>;
  }

  const product = products.find(item => String(item.id) === String(id));
  if (!product) {
    return <div className="text-center py-20">Producto no encontrado</div>;
  }

  const isFav = favorites.some(p => p.id === product.id);

  const categoria = product?.category?.toLowerCase() || '';
  const titulo = product?.title?.toLowerCase() || '';
  const rating = product?.rating?.rate ?? 4.2;
  const reviewCount = product?.rating?.count ?? Math.floor(Math.random() * 500) + 50;

  const mostrarTalles = (
    categoria.includes("clothing") &&
    (titulo.includes("shirt") || titulo.includes("jacket") || titulo.includes("remera") || titulo.includes("campera") || titulo.includes("t-shirt"))
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

  const obtenerDetalles = () => detallesPorId[product.id] || ['No hay detalles personalizados para este producto.'];

  const calcularPrecioOriginal = (precio) => (precio * 1.176).toFixed(2);

  const calcularCuotas = (precio) => {
    const total = precio * cantidad;
    return {
      tres: (total / 3).toFixed(2),
      seis: (total / 6).toFixed(2),
      doce: (total / 12).toFixed(2),
    };
  };

  const agregarAlCarrito = () => {
    if (mostrarTalles && !talleSeleccionado) {
      alert('Seleccioná un talle antes de continuar.');
      return;
    }

    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      size: mostrarTalles ? talleSeleccionado : null,
      quantity: cantidad,
    }));

    navigate('/cart');
  };

  const handleFavorite = () => {
    if (isFav) {
      dispatch(removeFavorite(product));
    } else {
      dispatch(addFavorite(product));
    }
  };

  const precioOriginal = calcularPrecioOriginal(product.price);
  const cuotas = calcularCuotas(product.price);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow">
        <div
          onMouseMove={(e) => {
            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            setZoomPosition({ x, y });
          }}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          className="overflow-hidden border rounded-lg"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-contain transition-transform"
            style={isZoomed ? {
              transform: 'scale(2.5)',
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
            } : { transform: 'scale(1)' }}
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-500 text-sm mb-4">SKU: {product.category?.toUpperCase()}{product.id.toString().padStart(3, '0')}</p>

          <div className="mb-4">
            <p className="text-3xl font-semibold">${product.price}</p>
            <p className="text-gray-400 line-through">${precioOriginal}</p>
            <p className="text-green-600 font-medium">15% OFF</p>
          </div>

          <div className="mb-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400">
                {i < Math.floor(rating) ? '★' : '☆'}
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-600">({rating}) • {reviewCount} reseñas</span>
          </div>

          {mostrarTalles && (
            <div className="mb-4">
              <p className="font-semibold mb-2">Talles</p>
              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map(talle => (
                  <button
                    key={talle}
                    onClick={() => setTalleSeleccionado(talle)}
                    className={`px-4 py-2 border rounded ${talleSeleccionado === talle ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                  >
                    {talle}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4">
            <p className="font-semibold mb-2">Cantidad</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="px-3 py-1 bg-gray-100">-</button>
              <span>{cantidad}</span>
              <button onClick={() => setCantidad(cantidad + 1)} className="px-3 py-1 bg-gray-100">+</button>
            </div>
          </div>

          <button onClick={agregarAlCarrito} className="w-full bg-black text-white py-3 rounded-lg mt-4">Agregar al carrito</button>

          <button
            onClick={handleFavorite}
            className="w-full border mt-2 py-2 rounded-lg"
          >
            {isFav ? '❤️ En Favoritos' : '🤍 Agregar a Favoritos'}
          </button>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Especificaciones</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {obtenerDetalles().map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {mostrarGuiaDeTalles && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Guía de Talles</h3>
              <p className="text-sm text-gray-600">Consulta nuestra guía de talles completa en la sección ayuda del sitio.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;