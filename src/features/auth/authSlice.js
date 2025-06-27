import { createSlice } from '@reduxjs/toolkit';

// Lee el usuario desde localStorage al iniciar
const getSessionUser = () => {
  const user = localStorage.getItem('sessionUser');
  return user ? JSON.parse(user) : null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getSessionUser(), // rehidrata si hay sesión
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = {
        email: action.payload.email, // Guarda el email en el estado
      };
      state.error = null;
      localStorage.setItem('sessionUser', JSON.stringify(action.payload)); // Almacena en localStorage
      },
    loginFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
   
      localStorage.removeItem('sessionUser');
      localStorage.removeItem('favorites'); // limpia favs al logout
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
