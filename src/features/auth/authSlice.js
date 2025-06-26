import { createSlice } from '@reduxjs/toolkit';

const getSession = () => {
  const session = localStorage.getItem('sessionUser');
  return session ? JSON.parse(session) : null;
};

const initialState = {
  user: getSession(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem('sessionUser', JSON.stringify(action.payload));
    
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('sessionUser');
    }, 
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
