import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch desde la API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) {
      throw new Error('Error al cargar los productos');
    }
    return await res.json();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null, // Estado para manejar errores
  },
  reducers: {
    addProduct: (state, action) => {
      const nuevo = {
        ...action.payload,
        id: state.items.length + 101, // Considera un método diferente para IDs únicos
      };
      state.items.push(nuevo);
    },
    updateProduct: (state, action) => {
      const { id, data } = action.payload;
      state.items = state.items.map(product =>
        product.id === parseInt(id) ? { ...product, ...data } : product
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null; // Reiniciar el error al iniciar la carga
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Guardar el mensaje de error
      });
  },
});

export const { addProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
