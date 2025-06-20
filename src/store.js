import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import favoritesReducer from './features/favorites/favoritesSlice';
import searchReducer from './features/search/searchSlice';
import cartReducer from './features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    search: searchReducer,
    cart: cartReducer,
  },
});