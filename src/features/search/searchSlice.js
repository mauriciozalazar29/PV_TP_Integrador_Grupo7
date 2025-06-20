import { createSlice } from '@reduxjs/toolkit';

const persistedSearch = localStorage.getItem('search') || '';

const searchSlice = createSlice({
  name: 'search',
  initialState: persistedSearch,
  reducers: {
    setSearchTerm: (_, { payload }) => {
      localStorage.setItem('search', payload);
      return payload;
    },
    clearSearchTerm: () => {
      localStorage.removeItem('search');
      return '';
    },
  },
});

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;