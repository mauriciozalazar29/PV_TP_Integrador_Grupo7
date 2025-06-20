import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch desde la API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    return await res.json();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    addProduct: (state, action) => {
      const nuevo = {
        ...action.payload,
        id: state.items.length + 101, // ID ficticio para no chocar con la API
      };
      state.items.push(nuevo);
    },
    updateProduct: (state, action) => {
      const { id, data } = action.payload;
      const index = state.items.findIndex(p => p.id === parseInt(id));
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...data };
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, state => {
        state.loading = false;
      });
  },
});

export const { addProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
