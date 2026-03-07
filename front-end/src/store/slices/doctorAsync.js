
import axios from 'axios'
import { setDoctors, setIsLoading } from './doctorsSlice';

import { toast } from 'react-toastify'
const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const fetchDoctorData = async () => {
  try {
    const res = await axios.get(`${backUrl}/api/doctors/get-doctor`, {
      params: { id }
    });

    if (res.data.success) {
      toast.success("Get Doctor Data successfully!");
      return res.data.data;
    } else {
      toast.error(res.data.message);
    }
  } catch (err) {
    toast.error("Cannot fetch doctor by id");
  }
};


export const fetchAllDoctors = () => {
  return async (dispatch) => {
    try {
      dispatch(setIsLoading(true));

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors/get-doctors`, { withCredentials: true }
      );

      if (res.data.success) {
        console.log('all dctoras are', res.data.data)
        dispatch(setDoctors(res.data.data));
      } else {
        toast.error(res.data.message);
      }

    } catch (err) {
      toast.error(`Error getting doctors: ${err.message}`);
      console.log("Error getting doctors:", err.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};
/* const fetchAllDoctors = async (dispatch) => {

    try {
       
        const res = await axios.get(`${backUrl}/api/doctors/get-doctors`)

    if (res.data.success) {
        toast.success("getting all doctors successfully")
        console.log("all doctors list at top page is: ", res.data.data)
        dispatch(setDoctors(res.data.data)) 
    } else {
        toast.error(res.data.message)
        }
    } catch (err) {
        toast.error(err.message)
   }
}
 */
