import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart, decrementQuantity, incrementQuantity } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiTrash2, FiMinus, FiPlus, FiX, FiCreditCard, FiShoppingBag } from 'react-icons/fi';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-2 sm:px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <FiShoppingCart className="text-4xl text-blue-600 drop-shadow" />
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Carrito de Compras</h1>
          {cart.length > 0 && (
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
              {cart.length} {cart.length === 1 ? 'producto' : 'productos'}
            </span>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-14 text-center flex flex-col items-center gap-4">
            <FiShoppingBag className="text-7xl text-gray-300 mx-auto mb-2" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-1">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-4">¡Agrega algunos productos para comenzar!</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow"
            >
              Explorar productos
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-blue-50">
                  <h2 className="text-xl font-bold text-gray-800">Productos en tu carrito</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {cart.map((item, i) => (
                    <div key={i} className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row gap-4 items-center">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-24 h-24 object-contain rounded-xl border border-gray-200 bg-white shadow-sm" 
                        />
                      </div>
                      {/* Product Info */}
                      <div className="flex-1 min-w-0 w-full">
                        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 text-lg">{item.title}</h3>
                        {item.size && (
                          <div className="flex items-center gap-1 mb-2">
                            <span className="text-sm text-gray-500">Talle:</span>
                            <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                              {item.size}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-col sm:flex-row items-center justify-between mt-3 gap-2">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">Cantidad:</span>
                            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                              <button
                                className="p-1 hover:bg-gray-200 rounded transition-colors disabled:opacity-50"
                                onClick={() => dispatch(decrementQuantity({ id: item.id, size: item.size }))}
                                disabled={item.quantity === 1}
                              >
                                <FiMinus className="text-base" />
                              </button>
                              <span className="px-3 py-1 font-medium min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                                onClick={() => dispatch(incrementQuantity({ id: item.id, size: item.size }))}
                              >
                                <FiPlus className="text-base" />
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => dispatch(removeFromCart(item))}
                            className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                          >
                            <FiX className="text-lg" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                      {/* Price */}
                      <div className="text-right flex-shrink-0 min-w-[90px]">
                        <div className="text-lg font-bold text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-sm text-gray-500">
                            ${item.price.toFixed(2)} c/u
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-6 flex flex-col gap-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Resumen del pedido</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span className="font-semibold text-green-600">Gratis</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 shadow"
                  >
                    <FiCreditCard />
                    Proceder al pago
                  </button>
                  <button
                    onClick={() => dispatch(clearCart())}
                    className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <FiTrash2 />
                    Vaciar carrito
                  </button>
                </div>
                <div className="mt-2 p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                  <p className="text-sm text-green-700 font-medium">
                    🚚 Envío gratis en compras superiores a $100
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;