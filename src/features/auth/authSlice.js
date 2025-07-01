// authSlice.js
// Slice de autenticación. Maneja el usuario logueado, errores y persistencia en localStorage.
// Acciones: loginSuccess, loginFailure, logout, clearError.

import { createSlice } from '@reduxjs/toolkit'; // Importa la función createSlice de Redux Toolkit

// Función para leer el usuario desde localStorage al iniciar la aplicación
const getSessionUser  = () => {
  const user = localStorage.getItem('sessionUser '); // Intenta obtener el usuario de localStorage
  return user ? JSON.parse(user) : null; // Si existe, lo parsea; si no, retorna null
};

// Creación del slice para la autenticación
const authSlice = createSlice({
  name: 'auth', // Nombre del slice
  initialState: {
    user: getSessionUser (), // Rehidrata el estado con el usuario de la sesión si existe
    error: null, // Estado para almacenar errores de autenticación
  },
  reducers: {
    // Acción para manejar el éxito del inicio de sesión
    loginSuccess: (state, action) => {
      state.user = {
        email: action.payload.email, // Guarda el email en el estado
      };
      state.error = null; // Limpia cualquier error previo
      localStorage.setItem('sessionUser ', JSON.stringify(action.payload)); // Almacena el usuario en localStorage
    },
    // Acción para manejar el fallo del inicio de sesión
    loginFailure: (state, action) => {
      state.user = null; // Limpia el usuario en caso de error
      state.error = action.payload; // Almacena el mensaje de error
    },
    // Acción para manejar el cierre de sesión
    logout: (state) => {
      state.user = null; // Limpia el usuario
      localStorage.removeItem('sessionUser '); // Elimina el usuario de localStorage
      localStorage.removeItem('favorites'); // Limpia los favoritos al cerrar sesión
    },
    // Acción para limpiar el error de autenticación
    clearError: (state) => {
      state.error = null; // Limpia el mensaje de error
    },
  },
});

// Exporta las acciones generadas por el slice
export const { loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
// Exporta el reductor del slice para su uso en la tienda de Redux
export default authSlice.reducer;
