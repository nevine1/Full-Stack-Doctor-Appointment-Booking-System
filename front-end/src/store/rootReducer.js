import { combineReducers } from "@reduxjs/toolkit"
import usersReducer from './slices/usersSlice'
import doctorsReducer from './slices/doctorsSlice'
import appointmentsReducer from "./slices/appointmentsSlice"


const rootReducer = combineReducers({
   users: usersReducer,
   doctors: doctorsReducer, 
   appointments: appointmentsReducer
  
})
  
export default rootReducer;