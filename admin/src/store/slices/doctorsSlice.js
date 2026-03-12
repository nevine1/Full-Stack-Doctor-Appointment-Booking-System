import { createSlice } from "@reduxjs/toolkit";

const doctorsSlice = createSlice({
    name: "doctors",
    initialState: {
        doctors: [],
        doctorToken: "",
        isLoading: false,
    },

    reducers: {
        setDoctorsLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setAllDoctors: (state, action) => {
            state.doctors = action.payload;
        },

        setDoctorToken: (state, action) => {
            state.doctorToken = action.payload;
        },

        updateDoctorInfo: (state, action) => {
            const docId = action.payload._id;
            const doctor = state.doctors.find((doc) => doc._id === docId);

            if (doctor) {
                Object.assign(doctor, action.payload);
            }
        },
    },
});

export const {
    setAllDoctors,
    setDoctorsLoading,
    setDoctorToken,
} = doctorsSlice.actions;

export default doctorsSlice.reducer;