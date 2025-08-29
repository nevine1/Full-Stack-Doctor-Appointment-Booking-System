
import axios from 'axios'
import { setDoctors  } from './doctorsSlice';

import { toast } from 'react-toastify'
const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL

const fetchDoctorData = async () => {
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

const fetchAllDoctors = async (dispatch) => {

    try {
       
        const res = await axios.get(`${backUrl}/api/doctors/get-doctors`/* , {} ,{
        headers: {
            Authorization: 'Bearer ${adminToken}'
        }
    } */)

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

export { 
    fetchAllDoctors,
    fetchDoctorData
}