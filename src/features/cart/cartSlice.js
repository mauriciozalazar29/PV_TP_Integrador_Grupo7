import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.find(item => item.id === action.payload.id && item.size === action.payload.size);
      if (existing) {
        existing.quantity += action.payload.quantity; // Sumar la cantidad seleccionada
      } else {
        state.push({ ...action.payload, quantity: action.payload.quantity }); // Usar la cantidad seleccionada
      }
      // Persistir en localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const newState = state.filter(item => item.id !== action.payload.id || item.size !== action.payload.size);
      // Persistir en localStorage
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    },
    clearCart: () => {
      localStorage.removeItem('cart'); // Limpiar localStorage
      return [];
    },
    decrementQuantity: (state, action) => {
      const item = state.find(
        (i) => i.id === action.payload.id && i.size === action.payload.size
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      // Persistir en localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    incrementQuantity: (state, action) => {
      const item = state.find(
        (i) => i.id === action.payload.id && i.size === action.payload.size
      );
      if (item) {
        item.quantity += 1;
      }
      // Persistir en localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, clearCart, decrementQuantity, incrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
