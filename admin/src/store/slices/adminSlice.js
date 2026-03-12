import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  adminToken: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminLoading: (state, action) => {
      state.isLoading = action.payload;
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

export const { setAdminLoading, logout, updateAdminToken } = adminSlice.actions;
export default adminSlice.reducer;