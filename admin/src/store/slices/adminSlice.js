import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  adminToken: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,

  reducers: {
    setIsLogin: (state, action) => {
      state.isLoggedIn = true;
    },
    updateAdminToken: (state, action) => {
      state.adminToken = action.payload;
    
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.adminToken = null;
    },
  },
});

export const { setIsLogin, logout, updateAdminToken } = adminSlice.actions;
export default adminSlice.reducer;
