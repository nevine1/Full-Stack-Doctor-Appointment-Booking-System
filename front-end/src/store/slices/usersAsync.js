
import axios from 'axios'
import {  setToken, setIsLoading } from './usersSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL



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

const getUserDetails = async ( token, setUserData ) => {
  try {

    if (!token) {
      toast.error('This user is not logged in')
    }

    const res = await axios.get(`${backUrl}/api/users/user-details`, {
      headers: {
        Authorization: `Bearer ${token}`
      }

    });
   
    if (res.data.success) {
      setUserData(res.data.data)
    console.log(res.data.data)
    } else {
      console.log(res.data.message)
    }
    
      } catch (err) {
        console.log(err.message)
      }
}
  
 const updateUserData = async () => {
   
     try {
       dispatch(setIsLoading(true));
      
       //formData should be used here  because:  user data has text and image;
       const formData = new FormData();
       formData.append("userId", user._id);
       formData.append("name", userData.name);
       formData.append("email", userData.email);
       formData.append("phone", userData.phone);
       formData.append("DOB", userData.DOB);
       formData.append("gender", userData.gender);
       formData.append("address", JSON.stringify(userData.address) || {}); 

      if (fileImage) {
        formData.append("image", fileImage);
      }
      const res = await axios.put(`${backUrl}/api/users/update-user`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, 
            "Content-Type": "multipart/form-data"
        }
      })

       
       if (res.data.success) {
        console.log('updated user data is:', (res.data.data))
      dispatch(setUser(res.data.data));    
      setUserData(res.data.data);
        setIsEditable(false);
      toast.success(`${user.name} information has been successfully updated!`)
    }

      console.log('updated user is ',res.data.data)
    } catch (err) {
      console.log(err.message)
    } finally {
      dispatch(setIsLoading(false))
    }
} 
  

export {  UserRegisterLogin, getUserDetails }