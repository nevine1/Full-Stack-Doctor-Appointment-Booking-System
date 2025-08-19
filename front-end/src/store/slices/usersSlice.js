import { createSlice } from "@reduxjs/toolkit";


const initialState = { 
    user: {},
    token: null,
    isLoading: false, 
    error: null, 
}
const usersSlice = createSlice({
    name: "users",
    initialState, 
    reducers: {
        
        setUser: (state, action) => {
            state.user = action.payload;
            console.log('userslice user info is:', state.user)
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload
        }, 
        logout: (state, action) => {
            state.token = null; 
           
        }
    }

})

export const {
    setToken,
    setIsLoading,
    logout,
    setUser
    } = usersSlice.actions;
export default usersSlice.reducer; 