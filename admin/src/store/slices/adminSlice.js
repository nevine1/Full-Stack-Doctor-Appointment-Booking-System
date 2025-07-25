import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  adminToken: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.adminToken = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.adminToken = null;
    },
  },
});

export const { login, logout } = adminSlice.actions;
export default adminSlice.reducer;
