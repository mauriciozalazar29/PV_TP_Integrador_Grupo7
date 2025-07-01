// searchSlice.js
// Slice de búsqueda. Maneja el término de búsqueda global y lo persiste en localStorage.
// Acciones: setSearchTerm, clearSearchTerm.

import { createSlice } from '@reduxjs/toolkit'; // Importa la función createSlice de Redux Toolkit

// Carga el término de búsqueda desde localStorage al iniciar
const persistedSearch = localStorage.getItem('search') || ''; // Obtiene el término de búsqueda o inicializa como cadena vacía

// Creación del slice para la búsqueda
const searchSlice = createSlice({
  name: 'search', // Nombre del slice
  initialState: persistedSearch, // Estado inicial cargado desde localStorage
  reducers: {
    // Acción para establecer el término de búsqueda
    setSearchTerm: (_, { payload }) => {
      localStorage.setItem('search', payload); // Almacena el término de búsqueda en localStorage
      return payload; // Retorna el nuevo término de búsqueda
    },
    // Acción para limpiar el término de búsqueda
    clearSearchTerm: () => {
      localStorage.removeItem('search'); // Elimina el término de búsqueda de localStorage
      return ''; // Retorna una cadena vacía como nuevo estado
    },
  },
});

// Exporta las acciones generadas por el slice
export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;
// Exporta el reductor del slice para su uso en la tienda de Redux
export default searchSlice.reducer;
