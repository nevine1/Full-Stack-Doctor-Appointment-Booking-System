import { createSlice } from "@reduxjs/toolkit";
//import { doctorsList } from "@/assets/assets";

const initialState = { 
    doctors: [], 
    isLoading: false, 
    error: null, 
}
const doctorsSlice = createSlice({
    name: "doctors",
    initialState, 
    reducers: {
        setDoctors: (state, action) => {
            state.doctors = action.payload
        }, 
       
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },

       updateDoctorDetails: (state, action) => {
        const updatedDoctor = action.payload;

        // Add a check to ensure updatedDoctor and its _id exist
        if (updatedDoctor && updatedDoctor._id) {
            const index = state.doctors.findIndex((doc) => doc._id === updatedDoctor._id);

            if (index !== -1) {
                // Update the existing doctor
                state.doctors[index] = updatedDoctor;
            } else {
                // Add the new doctor if not found
                state.doctors.push(updatedDoctor);
            }
        } else {
            console.error("Invalid payload for updateDoctorDetails:", updatedDoctor);
        }
        },
  },
        

})

export const {
    setDoctors,
    setIsLoading,
    updateDoctorDetails
    } = doctorsSlice.actions;
export default doctorsSlice.reducer; 