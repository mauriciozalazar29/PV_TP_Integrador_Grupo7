// productsSlice.js
// Slice de productos. Maneja el listado, carga desde API, agregar y editar productos.
// Acciones: fetchProducts (async), addProduct, updateProduct.

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Acción asíncrona para obtener productos desde la API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', // Nombre de la acción
  async () => {
    const res = await fetch('https://fakestoreapi.com/products'); // Realiza la solicitud a la API
    if (!res.ok) {
      throw new Error('Error al cargar los productos'); // Lanza un error si la respuesta no es correcta
    }
    return await res.json(); // Retorna los productos en formato JSON
  }
);

const productsSlice = createSlice({
  name: 'products', // Nombre del slice
  initialState: {
    items: [], // Lista de productos
    loading: false, // Estado de carga
    error: null, // Estado para manejar errores
  },
  reducers: {
    // Acción para agregar un nuevo producto
    addProduct: (state, action) => {
      const nuevo = {
        ...action.payload, // Copia los datos del nuevo producto
        id: state.items.length + 101, // Genera un ID único (considerar un método más robusto)
      };
      state.items.push(nuevo); // Agrega el nuevo producto a la lista
    },
    // Acción para actualizar un producto existente
    updateProduct: (state, action) => {
      const { id, data } = action.payload; // Desestructura el ID y los datos del producto
      state.items = state.items.map(product =>
        product.id === parseInt(id) ? { ...product, ...data } : product // Actualiza el producto si el ID coincide
      );
    },
  },
  extraReducers: builder => {
    // Manejo de estados para la acción asíncrona fetchProducts
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true; // Establece el estado de carga a true
        state.error = null; // Reinicia el error al iniciar la carga
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload; // Almacena los productos obtenidos
        state.loading = false; // Establece el estado de carga a false
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false; // Establece el estado de carga a false
        state.error = action.error.message; // Guarda el mensaje de error
      });
  },
});

// Exporta las acciones para ser utilizadas en otros componentes
export const { addProduct, updateProduct } = productsSlice.actions;
// Exporta el reductor para ser utilizado en la configuración del store
export default productsSlice.reducer;
