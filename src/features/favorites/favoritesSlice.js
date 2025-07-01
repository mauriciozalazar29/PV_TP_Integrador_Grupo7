// favoritesSlice.js
// Slice de favoritos. Maneja IDs de productos favoritos y los persiste en localStorage.
// Acción: toggleFavorite (agrega o quita un producto de favoritos).

import { createSlice } from '@reduxjs/toolkit'; // Importa la función createSlice de Redux Toolkit

// Función para cargar los favoritos desde localStorage al iniciar la aplicación
const loadFavorites = () => {
  const favorites = localStorage.getItem('favorites'); // Intenta obtener los favoritos de localStorage
  return favorites ? JSON.parse(favorites) : []; // Si existen, los parsea; si no, retorna un array vacío
};

// Creación del slice para los favoritos
const favoritesSlice = createSlice({
  name: 'favorites', // Nombre del slice
  initialState: loadFavorites(), // Estado inicial cargado desde localStorage
  reducers: {
    // Acción para alternar el estado de un favorito
    toggleFavorite: (state, action) => {
      const id = action.payload; // Obtiene el ID del producto a alternar
      
      // Verificar si el ID ya está en el estado
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

// Exporta la acción generada por el slice
export const { toggleFavorite } = favoritesSlice.actions;
// Exporta el reductor del slice para su uso en la tienda de Redux
export default favoritesSlice.reducer;
