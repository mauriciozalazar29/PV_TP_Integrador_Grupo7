import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { addToCart } from '../features/cart/cartSlice';
import { disminuirStock } from '../features/stock/stockSlice';
import { useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector(state =>
    state.products.items.find(item => item.id === parseInt(id))
  );

  const stockActual = useSelector(state => state.stock[product?.id]);
  const favorites = useSelector(state => state.favorites);
  const isFav = favorites.includes(parseInt(id));

  const [tab, setTab] = useState('descripcion');
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [talleSeleccionado, setTalleSeleccionado] = useState(null);

  const categoria = product?.category?.toLowerCase() || '';
  const titulo = product?.title?.toLowerCase() || '';
  const rating = product?.rating?.rate ?? 4.2;

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
    3: ['Material: Cuero sintetico', 'Lavado: Lavar a mano', 'Origen: Uruguay'],
    4: ['Material: Algodón 100%', 'Lavado: Lavar a mano', 'Origen: Chile'],
    5: ['Material: Plata', 'Genero: Mujer', 'Estilo: Ajustable','Peso: 2.3g'],
    6: ['Material: Plata y Oro', 'Genero: Mujer', 'Diametro: 4 cm','Peso: 2.2g'],
    7: ['Material: Diamante Blanco', 'Genero: Mujer', 'Ancho: 3mm', 'Grosor: 1mm', 'Peso: 2.5g'],
    8: ['Material: Acero inoxidable', 'Genero: Mujer', 'Largo x Ancho 5 cm x 1.6mm'],
    9: ['Marca: WD Elements', 'Color: Negro', 'Modelo detallado: Externo','Capacidad: 2TB','Velocidad de rotacion: 5900 rpm','Ancho: 7.8cm','altura: 1,4cm','Peso: 150g' ],
    10:['Marca: SanDisck', 'Color: Negro', 'Modelo detallado: Interno','Capacidad: 1TB','Velocidad de rotacion: 5400 rpm','Ancho: 4.8cm','altura: 1,1cm','Peso: 120g' ],
    11:['Marca: Silicon Power', 'Color: Negro', 'Modelo detallado: Interno','Capacidad: 256GB','Velocidad de rotacion: 5400 rpm','Ancho: 4.8cm','altura: 1,1cm','Peso: 120g'],
    12:['Marca: WD', 'Color: Negro', 'Modelo detallado: Externo','Capacidad: 4TB','Velocidad de rotacion: 5400 rpm','Ancho: 4.8cm','altura: 1cm','Peso: 100g'],
    13:['Marca: Acer', 'Color: Negro', 'Voltaje: 220V','Tamañode la pantalla: 1920 x 1080','Tipo de resolucion full HD','Freciencia de actializacion: 75hz','Tiempo de respuesta: 1ms','Peso: 3kg'],
    14:['Marca: Samsung', 'Color: Negro', 'Voltaje: 220V','Tamañode la pantalla: 3840 x 1080','Tipo de resolucion full HD','Freciencia de actializacion: 144hz','Tiempo de respuesta: 1ms','Peso: 5kg'],
    15:['Material: Poliester 100%', 'Lavado: Lavar a mano', 'Origen: EEUU'],
    16:['Material: Poliester 75% y Algodon 25%', 'Lavado: Lavar a mano y No planchar', 'Origen: Argentina'],
    17:['Material: Poliester 75% y Algodon 25%', 'Lavado: Lavar a mano y No planchar', 'Origen: Argentina'],
    18:['Material: Rayon 95% y Spandex 5%', 'Lavado: Lavar a mano ', 'Origen: EEUU'],
    19:['Material: Poliester 100%', 'Lavado: Lavado a lavarropa ', 'Origen: Argentina'],
    20:['Material: Algodon 95% y Spandex 5%', 'Lavado: Lavado a lavarropa ', 'Origen: Argentina'],
  };

  const obtenerDetalles = () => {
    return detallesPorId[product.id] || ['No hay detalles personalizados para este producto.'];
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
    };

    dispatch(addToCart(item));
    dispatch(disminuirStock({ id: product.id, cantidad: 1 }));
    navigate('/cart');
  };

  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white border rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <button onClick={() => dispatch(toggleFavorite(product.id))}>
            {isFav ? '💖' : '🤍'}
          </button>
        </div>

        {/* Imagen con lupa */}
        <div
          onMouseMove={(e) => {
            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            setZoomPosition({ x, y });
          }}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          className="relative w-60 h-60 mx-auto overflow-hidden border rounded group mb-4"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-200"
            style={
              isZoomed
                ? { transform: 'scale(2)', transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                : { transform: 'scale(1)' }
            }
          />
        </div>

        <p><strong>Precio:</strong> ${product.price}</p>
        <p><strong>Categoría:</strong> {product.category}</p>
        <p><strong>Stock disponible:</strong> {stockActual ?? 'N/D'} unidades</p>
        <p>
          <strong>Valoración:</strong>{' '}
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < Math.floor(rating) ? '⭐' : '☆'}</span>
          ))} ({rating.toFixed(1)} / 5)
        </p>

        {/* Talles */}
        {mostrarTalles ? (
          <div className="my-4">
            <p><strong>Talles disponibles:</strong></p>
            <div className="flex gap-2 mt-2">
              {['S', 'M', 'L', 'XL'].map(talle => (
                <button
                  key={talle}
                  onClick={() => setTalleSeleccionado(talle)}
                  className={`border rounded px-3 py-1 ${
                    talleSeleccionado === talle ? 'bg-blue-300 text-white' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {talle}
                </button>
              ))}
            </div>
            <button
              onClick={agregarAlCarrito}
              className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Agregar al carrito
            </button>
          </div>
        ) : (
          <>
          
            <button
              onClick={agregarAlCarrito}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Agregar al carrito
            </button>
          </>
        )}

        {/* Solapas */}
        <div className="mt-6">
          <div className="flex gap-4 border-b mb-2">
            <button onClick={() => setTab('descripcion')} className={tab === 'descripcion' ? 'font-bold' : ''}>
              Descripción
            </button>
            <button onClick={() => setTab('detalles')} className={tab === 'detalles' ? 'font-bold' : ''}>
              Detalles
            </button>
            {mostrarGuiaDeTalles && (
              <button onClick={() => setTab('guia')} className={tab === 'guia' ? 'font-bold' : ''}>
                Guía de Talles
              </button>
            )}
          </div>

          {tab === 'descripcion' && <p className="mt-2">{product.description}</p>}
          {tab === 'detalles' && (
            <ul className="list-disc pl-6 mt-2">
              {obtenerDetalles().map((detalle, i) => (
                <li key={i}>{detalle}</li>
              ))}
            </ul>
          )}
          {tab === 'guia' && mostrarGuiaDeTalles && (
            <div className="mt-2">
              <p><strong>Guía de Talles:</strong></p>
              <ul className="list-disc pl-6">
                <li>S: Pecho 86-91 cm</li>
                <li>M: Pecho 92-97 cm</li>
                <li>L: Pecho 98-104 cm</li>
                <li>XL: Pecho 105-112 cm</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;