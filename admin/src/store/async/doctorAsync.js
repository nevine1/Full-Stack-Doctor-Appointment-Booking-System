import axios from "axios";
import { setIsLoading, setDoctorAppointments } from "../slices/appointmentsSlice";
import { setAllDoctors } from "../slices/doctorsSlice";

const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getDoctorAppointments = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));

      const doctorToken = getState().doctors.doctorToken;
      const res = await axios.get(`${backUrl}/api/doctors/doctor-appointments`, {
        headers: {
          Authorization: `Bearer ${doctorToken}`,
        },
      });

      if (res.data.success) {
        dispatch(setDoctorAppointments(res.data.data));
      }
    } catch (err) {
      console.log("Error:", err.response?.data || err.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const doctorCancelAppointment = (appointmentId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));
      const doctorToken = getState().doctors.doctorToken;

      const res = await axios.post(
        `${backUrl}/api/doctors/doctor-cancel-appointment`,
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${doctorToken}` },
        }
      );

      if (res.data.success) {
        await dispatch(getDoctorAppointments());
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const doctorCompleteAppointment = (appointmentId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));
      const doctorToken = getState().doctors.doctorToken;

      const res = await axios.post(
        `${backUrl}/api/doctors/doctor-complete-appointment`,
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${doctorToken}` },
        }
      );

      if (res.data.success) {
        await dispatch(getDoctorAppointments());
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const fetchAllDoctors = () => {
  return async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const res = await axios.get(`${backUrl}/api/doctors/get-doctors`);
      if (res.data.success) {
        dispatch(setAllDoctors(res.data.data));
      }
    } catch (err) {
      console.log(`Getting doctor list error: ${err.message}`);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};