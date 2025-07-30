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
      state.isLoading = action.payload;
    },
    updateAdminToken: (state, action) => {
      state.adminToken = action.payload;
      localStorage.setItem('token', state.adminToken); // i do not need to use it because I am using redux-persist
    
    },
    logout: (state) => {
      state.isLoading = false;
      state.adminToken = null;
    },
  },
});

export const { setIsLoading, logout, updateAdminToken } = adminSlice.actions;
export default adminSlice.reducer;
