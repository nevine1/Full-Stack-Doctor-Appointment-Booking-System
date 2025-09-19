import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users', 
    initialState: {
        doctors: [], 
        isLoading: null,

    }, 
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setAllUsers: (state, action) => {
            state.users = action.payload; 
        }
    }
})

export const { setAllAppointments, setIsLoading } = usersSlice.actions;
export default usersSlice.reducer