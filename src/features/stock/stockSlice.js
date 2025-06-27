// stockSlice.js
// Slice de stock. Maneja el stock disponible por producto (por id).
// Acción: disminuirStock (reduce el stock de un producto).

import { createSlice } from '@reduxjs/toolkit';

// Estado inicial que define la cantidad de stock disponible para cada producto por su ID
const initialState = {
  1: 120, 2: 259, 3: 500, 4: 430, 5: 400,
  6: 70, 7: 400, 8: 100, 9: 203, 10: 470,
  11: 319, 12: 400, 13: 250, 14: 140, 15: 235,
  16: 340, 17: 679, 18: 130, 19: 146, 20: 145,
};

const stockSlice = createSlice({
  name: 'stock', // Nombre del slice
  initialState, // Estado inicial del stock
  reducers: {
    // Acción para disminuir el stock de un producto
    disminuirStock: (state, action) => {
      const { id, cantidad } = action.payload; // Desestructura el ID del producto y la cantidad a disminuir
      if (state[id] > 0) { // Verifica que el stock sea mayor a 0
        state[id] -= cantidad; // Disminuye la cantidad del stock disponible
      }
    },
  },
});

// Exporta la acción para ser utilizada en otros componentes
export const { disminuirStock } = stockSlice.actions;
// Exporta el reductor para ser utilizado en la configuración del store
export default stockSlice.reducer;
