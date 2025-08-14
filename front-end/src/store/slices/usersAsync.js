
import axios from 'axios'
import { setDoctors , setToken, setIsLoading } from './usersSlice';
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

const UserRegisterLogin = async ({dispatch, mode, setMode, name, email, password}) => {
      try {
      dispatch(setIsLoading(true))
      if (mode === "Sign Up") { //register route
        
        const res = await axios.post(`${backUrl}/api/users/register`, { name, email, password });
        if (!name || !email || !password) {
          toast.error("Please fill all fields");
            console.log("Please fill all fields");
            return;
        }
       
        if (res.data.success) {
          console.log("User:", res.data.data);
          toast.success(`${name} has been successfully registered, now you should login`);
          
          setMode('login')//to login after registration 
        } else {
          console.log("Error from backend:", res.data.message);
        }
      } else {
        // when login 
        const res = await axios.post(`${backUrl}/api/users/login`, { email, password });
        if (!email || !password) {
          toast.error("Email or password should not be empty ");
        }
        if (res.data.success && res.data.token) {
          dispatch(setToken(res.data.token))
          toast.success(`${name} has successfully logged in`);
          router.push('/auth/profile')
        } else {
          console.log(res.data.message || "Logged in failed")
        }
      }
      
    } catch (err) {
      console.log(err.message)
    } finally {
      dispatch(setIsLoading(false))
    }
}

const userDetails = async (token, user, setUser ) => {
  try {

    if (!token) {
      toast.error('This user is not logged in')
    }

    const res = await axios.get(`${backUrl}/api/users/user-details`);
    if (res.data.success) {
      setUser(res.data.data)
      toast.success('user details are ')
    }
  } catch (err) {
    console.log(err.message)
  }
}
export { fetchAllDoctors, UserRegisterLogin, userDetails }