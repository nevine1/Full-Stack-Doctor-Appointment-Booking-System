import { createSlice } from "@reduxjs/toolkit";
//import { doctorsList } from "@/assets/assets";

const initialState = {
    doctors: [],
    isDoctorLoading: false,
    error: null,
}
const doctorsSlice = createSlice({
    name: "doctors",
    initialState,
    reducers: {
        setDoctors: (state, action) => {
            if (action.payload && action.payload.lenght > 0) {
                state.doctors.action.payload;
            }
        },

        setIsDoctorLoading: (state, action) => {
            state.isDoctorLoading = action.payload;
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
    setIsDoctorLoading,
    updateDoctorDetails
} = doctorsSlice.actions;
export default doctorsSlice.reducer; 