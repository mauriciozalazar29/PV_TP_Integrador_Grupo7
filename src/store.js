// store.js
// Configura el store global de Redux con los reducers de productos, favoritos, búsqueda, carrito y autenticación.

import { configureStore } from '@reduxjs/toolkit'; // Importa la función para configurar la store de Redux
import productsReducer from './features/products/productsSlice'; // Importa el reductor para productos
import favoritesReducer from './features/favorites/favoritesSlice'; // Importa el reductor para favoritos
import searchReducer from './features/search/searchSlice'; // Importa el reductor para búsqueda
import cartReducer from './features/cart/cartSlice'; // Importa el reductor para el carrito
import authReducer from './features/auth/authSlice'; // Importa el reductor para autenticación

// Configura la store de Redux
export const store = configureStore({
  reducer: {
    products: productsReducer, // Asocia el reductor de productos al estado 'products'
    favorites: favoritesReducer, // Asocia el reductor de favoritos al estado 'favorites'
    search: searchReducer, // Asocia el reductor de búsqueda al estado 'search'
    cart: cartReducer, // Asocia el reductor del carrito al estado 'cart'
    auth: authReducer, // Asocia el reductor de autenticación al estado 'auth'
  },
});
