import { createSlice } from "@reduxjs/toolkit";
//import { doctorsList } from "@/assets/assets";

const initialState = { 
    doctors: [], 
    token: null,
    isLoading: false, 
    error: null
}
const usersSlice = createSlice({
    name: "users",
    initialState, 
    reducers: {
        setDoctors: (state, action) => {
            state.doctors = action.payload
        }, 
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload
        }, 
        logout: (state, action) => {
            state.token = null; 
            state.doctors = [];
        }
    }

})

export const {
    setDoctors,
    setToken,
    setIsLoading,
    logout
    } = usersSlice.actions;
export default usersSlice.reducer; 