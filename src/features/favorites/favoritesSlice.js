import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('favoritos')) || []
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (!state.items.some(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
        localStorage.setItem('favoritos', JSON.stringify(state.items));
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      localStorage.setItem('favoritos', JSON.stringify(state.items));
    },
    setFavorites: (state, action) => {
      state.items = action.payload;
      localStorage.setItem('favoritos', JSON.stringify(state.items));
    }
  }
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;