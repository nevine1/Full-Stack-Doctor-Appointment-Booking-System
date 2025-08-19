import { combineReducers } from "@reduxjs/toolkit"
import usersReducer from './slices/usersSlice'
import doctorsReducer from './slices/doctorsSlice'



const rootReducer = combineReducers({
   users: usersReducer,
   doctors: doctorsReducer
  
})
  
export default rootReducer;