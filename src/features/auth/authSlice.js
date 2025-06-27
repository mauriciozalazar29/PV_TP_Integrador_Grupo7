// authSlice.js
// Slice de autenticación. Maneja el usuario logueado, errores y persistencia en localStorage.
// Acciones: loginSuccess, loginFailure, logout, clearError.

import { createSlice } from '@reduxjs/toolkit';

// Función para leer el usuario desde localStorage al iniciar la aplicación
const getSessionUser = () => {
  const user = localStorage.getItem('sessionUser'); // Intenta obtener el usuario almacenado
  return user ? JSON.parse(user) : null; // Si existe, lo convierte de JSON a objeto; si no, retorna null
};

const authSlice = createSlice({
  name: 'auth', // Nombre del slice
  initialState: {
    user: getSessionUser(), // Rehidrata el estado con el usuario si hay sesión activa
    error: null, // Inicializa el estado de error como null
  },
  reducers: {
    // Acción que se despacha cuando el inicio de sesión es exitoso
    loginSuccess: (state, action) => {
      state.user = {
        email: action.payload.email, // Guarda el email del usuario en el estado
      };
      state.error = null; // Limpia cualquier error previo
      localStorage.setItem('sessionUser', JSON.stringify(action.payload)); // Almacena el usuario en localStorage
    },
    // Acción que se despacha cuando el inicio de sesión falla
    loginFailure: (state, action) => {
      state.user = null; // Limpia el usuario en caso de error
      state.error = action.payload; // Guarda el mensaje de error en el estado
    },
    // Acción que se despacha al cerrar sesión
    logout: (state) => {
      state.user = null; // Limpia el usuario del estado
      localStorage.removeItem('sessionUser'); // Elimina el usuario de localStorage
      localStorage.removeItem('favorites'); // Limpia los favoritos al cerrar sesión
    },
    // Acción para limpiar el estado de error
    clearError: (state) => {
      state.error = null; // Resetea el estado de error a null
    },
  },
});

// Exporta las acciones para ser utilizadas en otros componentes
export const { loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
// Exporta el reductor para ser utilizado en la configuración del store
export default authSlice.reducer;
