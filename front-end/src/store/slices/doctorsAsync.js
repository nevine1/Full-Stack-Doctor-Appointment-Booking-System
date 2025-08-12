
import axios from 'axios'
import { setDoctors , setToken } from './doctorsSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL

const fetchAllDoctors = async (dispatch) => {

    try {
       
        const res = await axios.get(`${backUrl}/api/doctors/get-doctors`/* , {} ,{
        headers: {
            Authorization: 'Bearer ${adminToken}'
        }
    } */)

    if (res.data) {
        toast.success("getting all doctors successfully")
        
        const doctorsList = res.data.data; 
        dispatch(setDoctors(doctorsList))
    }
    } catch (err) {
        toast.error(err.message)
   }
}

const doctorLogin = async () => {
    try {
        const res = await axios.post(`${backUrl}/api/doctors/login`, { email, password }, {
            
        })
    } catch (err) {
        console.log(err.message)
    }
}
export { fetchAllDoctors, doctorLogin }