import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  adminToken: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,

  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = true;
    },
    updateAdminToken: (state, action) => {
      state.adminToken = action.payload;
    
    },
    logout: (state) => {
      state.isLoading = false;
      state.adminToken = null;
    },
  },
});

export const { setIsLoading, logout, updateAdminToken } = adminSlice.actions;
export default adminSlice.reducer;
