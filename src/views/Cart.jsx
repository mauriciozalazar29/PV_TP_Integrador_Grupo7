import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🛒 Carrito de Compras</h1>

      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item, i) => (
              <li key={i} className="border rounded p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    {item.size && <p>Talle: {item.size}</p>}
                    <p>Cantidad: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => dispatch(removeFromCart(item))}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => dispatch(clearCart())}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Vaciar carrito
              </button>

              <button
                onClick={() => navigate('/checkout')}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Pagar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
