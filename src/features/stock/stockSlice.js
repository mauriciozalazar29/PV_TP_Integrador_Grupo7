import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  1: 120, 2: 259, 3: 500, 4: 430, 5: 400,
  6: 70, 7: 400, 8: 100, 9: 203, 10: 470,
  11: 319, 12: 400, 13: 250, 14: 140, 15: 235,
  16: 340, 17: 679, 18: 130, 19: 146, 20: 145,
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    disminuirStock: (state, action) => {
      const { id, cantidad } = action.payload;
      if (state[id] > 0) {
        state[id] -= cantidad;
      }
    },
  },
});

export const { disminuirStock } = stockSlice.actions;
export default stockSlice.reducer;
