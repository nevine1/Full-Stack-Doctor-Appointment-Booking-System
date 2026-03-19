import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    token: null,
    isLoading: false,
    error: null,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setToken: (state, action) => {
            state.token = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        logout: (state) => {
            state.token = null;
            state.user = {};
            state.error = null;
            state.isLoading = false;
        }
    }
});

export const {
    setToken,
    setIsLoading,
    logout,
    setUser,
    setError
} = usersSlice.actions;

export default usersSlice.reducer;