import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import favoritesReducer from './features/favorites/favoritesSlice';
import cartReducer from './features/cart/cartSlice';
import stockReducer from './features/stock/stockSlice';
export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    cart:cartReducer,
    stock: stockReducer
  },
});