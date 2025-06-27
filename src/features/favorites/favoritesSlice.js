import { createSlice } from '@reduxjs/toolkit';

// Cargar favoritos desde localStorage al inicio
const loadFavorites = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: loadFavorites(), // Estado inicial desde localStorage
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      
      // Verificar si el ID ya está en el estado
      if (state.includes(id)) {
        // Si está, lo eliminamos
        const updatedFavorites = state.filter(favId => favId !== id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Persistir
        return updatedFavorites;
      } else {
        // Si no está, lo agregamos
        const updatedFavorites = [...state, id];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Persistir
        return updatedFavorites;
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
