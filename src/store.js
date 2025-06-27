// store.js
// Configura el store global de Redux con los reducers de productos, favoritos, búsqueda, carrito y autenticación.

import { configureStore } from '@reduxjs/toolkit'; // Importa la función configureStore de Redux Toolkit
import productsReducer from './features/products/productsSlice'; // Importa el reducer de productos
import favoritesReducer from './features/favorites/favoritesSlice'; // Importa el reducer de favoritos
import searchReducer from './features/search/searchSlice'; // Importa el reducer de búsqueda
import cartReducer from './features/cart/cartSlice'; // Importa el reducer del carrito
import authReducer from './features/auth/authSlice'; // Importa el reducer de autenticación

// Configura el store de Redux
export const store = configureStore({
  reducer: {
    products: productsReducer, // Asocia el reducer de productos al estado 'products'
    favorites: favoritesReducer, // Asocia el reducer de favoritos al estado 'favorites'
    search: searchReducer, // Asocia el reducer de búsqueda al estado 'search'
    cart: cartReducer, // Asocia el reducer del carrito al estado 'cart'
    auth: authReducer, // Asocia el reducer de autenticación al estado 'auth'
  },
});
