// cartSlice.js
// Slice del carrito de compras. Maneja productos agregados, cantidades y persistencia en localStorage.
// Acciones: addToCart, removeFromCart, clearCart, decrementQuantity, incrementQuantity.

import { createSlice } from '@reduxjs/toolkit'; // Importa la función createSlice de Redux Toolkit

// Estado inicial del carrito, se carga desde localStorage o se inicializa como un array vacío
const initialState = JSON.parse(localStorage.getItem('cart')) || [];

// Creación del slice para el carrito
const cartSlice = createSlice({
  name: 'cart', // Nombre del slice
  initialState, // Estado inicial
  reducers: {
    // Acción para agregar un producto al carrito
    addToCart: (state, action) => {
      // Busca si el producto ya existe en el carrito con el mismo id y tamaño
      const existing = state.find(item => item.id === action.payload.id && item.size === action.payload.size);
      if (existing) {
        existing.quantity += action.payload.quantity; // Sumar la cantidad seleccionada si ya existe
      } else {
        // Si no existe, se agrega el nuevo producto con la cantidad seleccionada
        state.push({ ...action.payload, quantity: action.payload.quantity });
      }
      // Persistir el estado actualizado en localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    // Acción para eliminar un producto del carrito
    removeFromCart: (state, action) => {
      // Filtra el carrito para eliminar el producto especificado
      const newState = state.filter(item => item.id !== action.payload.id || item.size !== action.payload.size);
      // Persistir el nuevo estado en localStorage
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState; // Retorna el nuevo estado
    },
    // Acción para limpiar el carrito
    clearCart: () => {
      localStorage.removeItem('cart'); // Elimina el carrito de localStorage
      return []; // Retorna un array vacío como nuevo estado
    },
    // Acción para decrementar la cantidad de un producto en el carrito
    decrementQuantity: (state, action) => {
      const item = state.find(
        (i) => i.id === action.payload.id && i.size === action.payload.size
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1; // Decrementa la cantidad si es mayor a 1
      }
      // Persistir el estado actualizado en localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    // Acción para incrementar la cantidad de un producto en el carrito
    incrementQuantity: (state, action) => {
      const item = state.find(
        (i) => i.id === action.payload.id && i.size === action.payload.size
      );
      if (item) {
        item.quantity += 1; // Incrementa la cantidad
      }
      // Persistir el estado actualizado en localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

// Exporta las acciones generadas por el slice
export const { addToCart, removeFromCart, clearCart, decrementQuantity, incrementQuantity } = cartSlice.actions;
// Exporta el reductor del slice para su uso en la tienda de Redux
export default cartSlice.reducer;
