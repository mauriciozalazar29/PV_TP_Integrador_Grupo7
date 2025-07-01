// stockSlice.js
// Slice de stock. Maneja el stock disponible por producto (por id).
// Acción: disminuirStock (reduce el stock de un producto).

import { createSlice } from '@reduxjs/toolkit'; // Importa la función createSlice de Redux Toolkit

// Estado inicial del stock, representado como un objeto donde las claves son IDs de productos y los valores son cantidades
const initialState = {
  1: 120, 2: 259, 3: 500, 4: 430, 5: 400,
  6: 70, 7: 400, 8: 100, 9: 203, 10: 470,
  11: 319, 12: 400, 13: 250, 14: 140, 15: 235,
  16: 340, 17: 679, 18: 130, 19: 146, 20: 145,
};

// Creación del slice para el stock
const stockSlice = createSlice({
  name: 'stock', // Nombre del slice
  initialState, // Estado inicial
  reducers: {
    // Acción para disminuir el stock de un producto
    disminuirStock: (state, action) => {
      const { id, cantidad } = action.payload; // Desestructura el ID del producto y la cantidad a disminuir
      if (state[id] > 0) { // Verifica que el stock sea mayor que 0
        state[id] -= cantidad; // Disminuye la cantidad del stock
      }
    },
  },
});

// Exporta la acción generada por el slice
export const { disminuirStock } = stockSlice.actions;
// Exporta el reductor del slice para su uso en la tienda de Redux
export default stockSlice.reducer;
