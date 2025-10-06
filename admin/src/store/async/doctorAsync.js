import axios from "axios";
import { setIsLoading, setDoctorAppointments } from "../slices/appointmentsSlice";

const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getDocAppointments = async (dispatch, doctorToken) => {
  try {
    dispatch(setIsLoading(true));
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

export const doctorCancelAppointment = async (dispatch, appointmentId, doctorToken) => {
  try {
    dispatch(setIsLoading(true));
    const res = await axios.post(
      `${backUrl}/api/doctors/doctor-cancel-appointment`,
      { appointmentId },
      {
        headers: { Authorization: `Bearer ${doctorToken}` },
      }
    );

    if (res.data.success) {
      // Refresh appointments
      await getDocAppointments(dispatch, doctorToken);
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const doctorCompleteAppointment = async (dispatch, appointmentId, doctorToken) => {
  try {
    dispatch(setIsLoading(true));
    const res = await axios.post(
      `${backUrl}/api/doctors/doctor-complete-appointment`,
      { appointmentId },
      {
        headers: { Authorization: `Bearer ${doctorToken}` },
      }
    );

    if (res.data.success) {
      await getDocAppointments(dispatch, doctorToken);
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    dispatch(setIsLoading(false));
  }
};
