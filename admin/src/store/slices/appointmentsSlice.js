import { createSlice } from "@reduxjs/toolkit";

const appointmentsSlice = createSlice({
    name: "appointments",
    initialState: {
        appointments: [],
        isLoading: false,
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setAllAppointments: (state, action) => {
            state.appointments = action.payload;
        },
        setDoctorAppointments: (state, action) => {
            state.appointments = action.payload;
        },
    },
});

export const { setAllAppointments, setIsLoading, setDoctorAppointments } =
    appointmentsSlice.actions;
export default appointmentsSlice.reducer;