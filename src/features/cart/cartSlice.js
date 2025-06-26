import { createSlice } from '@reduxjs/toolkit';

const loadCart = () => {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveCart = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (e) {
    console.error('Error al guardar el carrito en localStorage', e);
  }
};

const initialState = {
  items: loadCart()
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(
        item => item.id === action.payload.id && item.size === action.payload.size
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCart([]);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(
        i => i.id === action.payload.id && i.size === action.payload.size
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
      saveCart(state.items);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;