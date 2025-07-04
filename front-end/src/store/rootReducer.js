import { combineReducers } from "@reduxjs/toolkit"
import  doctorsReducer  from './slices/doctorsSlice'


const rootReducer = combineReducers({
   doctors: doctorsReducer,
})
  
export default rootReducer;