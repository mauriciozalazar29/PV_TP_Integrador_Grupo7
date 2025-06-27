// searchSlice.js
// Slice de búsqueda. Maneja el término de búsqueda global y lo persiste en localStorage.
// Acciones: setSearchTerm, clearSearchTerm.

import { createSlice } from '@reduxjs/toolkit';

// Carga el término de búsqueda persistido desde localStorage al iniciar
const persistedSearch = localStorage.getItem('search') || ''; // Si no hay término, inicializa como cadena vacía

const searchSlice = createSlice({
  name: 'search', // Nombre del slice
  initialState: persistedSearch, // Estado inicial cargado desde localStorage
  reducers: {
    // Acción para establecer el término de búsqueda
    setSearchTerm: (_, { payload }) => {
      localStorage.setItem('search', payload); // Almacena el nuevo término en localStorage
      return payload; // Retorna el nuevo término como el nuevo estado
    },
    // Acción para limpiar el término de búsqueda
    clearSearchTerm: () => {
      localStorage.removeItem('search'); // Elimina el término de búsqueda de localStorage
      return ''; // Retorna una cadena vacía como nuevo estado
    },
  },
});

// Exporta las acciones para ser utilizadas en otros componentes
export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;
// Exporta el reductor para ser utilizado en la configuración del store
export default searchSlice.reducer;
