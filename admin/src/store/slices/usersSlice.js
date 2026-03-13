import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        isUserLoading: false,
    },
    reducers: {
        setIsUserLoading: (state, action) => {
            state.isUserLoading = action.payload;
        },
        setAllUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});

export const { setAllUsers, setIsUserLoading } = usersSlice.actions;
export default usersSlice.reducer;