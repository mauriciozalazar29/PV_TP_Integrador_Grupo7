// favoritesSlice.js
// Slice de favoritos. Maneja IDs de productos favoritos y los persiste en localStorage.
// Acción: toggleFavorite (agrega o quita un producto de favoritos).

import { createSlice } from '@reduxjs/toolkit';

// Función para cargar los favoritos desde localStorage al iniciar la aplicación
const loadFavorites = () => {
  const favorites = localStorage.getItem('favorites'); // Intenta obtener los favoritos almacenados
  return favorites ? JSON.parse(favorites) : []; // Si existen, los convierte de JSON a array; si no, retorna un array vacío
};

const favoritesSlice = createSlice({
  name: 'favorites', // Nombre del slice
  initialState: loadFavorites(), // Estado inicial cargado desde localStorage
  reducers: {
    // Acción para agregar o quitar un producto de favoritos
    toggleFavorite: (state, action) => {
      const id = action.payload; // Obtiene el ID del producto a agregar o quitar
      
      // Verifica si el ID ya está en el estado de favoritos
      if (state.includes(id)) {
        // Si está, lo eliminamos del estado
        const updatedFavorites = state.filter(favId => favId !== id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Persistir el nuevo estado en localStorage
        return updatedFavorites; // Retorna el nuevo estado actualizado
      } else {
        // Si no está, lo agregamos al estado
        const updatedFavorites = [...state, id];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Persistir el nuevo estado en localStorage
        return updatedFavorites; // Retorna el nuevo estado actualizado
      }
    },
  },
});

// Exporta la acción para ser utilizada en otros componentes
export const { toggleFavorite } = favoritesSlice.actions;
// Exporta el reductor para ser utilizado en la configuración del store
export default favoritesSlice.reducer;
