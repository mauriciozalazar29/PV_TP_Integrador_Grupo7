import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import favoritesReducer from './features/favorites/favoritesSlice';
 feat/product/-detail
import cartReducer from './features/cart/cartSlice';
import stockReducer from './features/stock/stockSlice';

 develop

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
 feat/product/-detail
    cart:cartReducer,
    stock: stockReducer,
    
  },
});

  },
});
 develop
