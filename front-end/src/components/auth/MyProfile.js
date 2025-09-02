"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useDispatch, useSelector } from "react-redux";
//import { getUserDetails } from "@/store/slices/usersAsync";
import { setIsLoading, setUser } from "@/store/slices/usersSlice";
import { toast } from "react-toastify";
import Link from "next/link";
const MyProfile = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.users);
  const [isEditable, setIsEditable] = useState(false);
  const [userData, setUserData] = useState(user || {});
  const [fileImage, setFileImage ] = useState(null)
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    setUserData(user || {} )
  }, [user])
  
const getUserDetails = async ( ) => {
  try {
    dispatch(setIsLoading(true))
    if (!token) {
      toast.error('This user is not logged in')
    }

    const res = await axios.get(`${backUrl}/api/users/user-details`, {
      headers: {
        Authorization: `Bearer ${token}`
      }

    });
   
    if (res.data.success) {
      toast.success("User info updated successfully");
      dispatch(setUser(res.data.data))
      router.refresh();
    } else {
      console.log(res.data.message)
    }
    
      } catch (err) {
        console.log(err.message)
  } finally {
    dispatch(setIsLoading(false))
      }
}
  
   
  useEffect(() => {
    getUserDetails( );
  }, [token]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
   //  handle image upload preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileImage(file);
      setUserData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };
  //updating user data and save it to mongoose db 
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
  return (
    <div className="flex flex-col  items-center justify-center p-8 w-full min-h-screen">
      {/* Profile image */}

      <div className="mb-6">
        {
          isEditable ? (
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full mt-1 p-2  outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
            />
          ): (
            <Image
                src={userData?.image || assets.profile_pic}
                alt="profile pic"
                width={150}
                height={150}
                className="rounded-full shadow-lg p-2 bg-gray-100"
              />
          )
        }

      </div>

      
      <div className="bg-gray-100 py-5 px-10 rounded-xl border border-gray-300 shadow-lg w-full max-w-md space-y-5">
       
        <div >
          <label className="font-bold text-gray-500">Name</label>
          {isEditable ? (
            <input
              type="text"
              name="name"
              value={userData.name || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2  outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
            />
          ) : (
            <p className="text-gray-700 mt-1">{userData.name}</p>
          )}
        </div>

       
        <div>
          <label className="font-bold text-gray-500">Email</label>
          {isEditable ? (
            <input
              type="email"
              name="email"
              value={userData.email || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2  outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
            />
          ) : (
            <p className="text-gray-700 mt-1">{userData.email}</p>
          )}
        </div>

       
        <div>
          <label className="font-bold text-gray-500">Address</label>
          {isEditable ? (
            <>
              <input
                type="text"
                name= "address.line1"
                value={userData.address?.line1 || " "}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                className="w-full mt-1 p-2  outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
              />
              <input
                type="text"
                value={userData.address?.line2 || ""}
                name="address.line2"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              className="w-full mt-1 p-2  outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
              />
            </>
          ) : (
            <p className="text-gray-700 mt-1">
              {userData.address?.line1}, {userData.address?.line2}
            </p>
          )}
        </div>

        
        <div>
          <label className="font-bold text-gray-500">Date of Birth</label>
          {isEditable ? (
            <input
              type="date"
              name="DOB"
              value={userData.DOB || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2  outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
            />
          ) : (
            <p className="text-gray-700 mt-1">{userData.DOB}</p>
          )}
        </div>

      
        <div>
          <label className="font-bold text-gray-500">Gender</label>
          {isEditable ? (
            <select
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              className="w-full mt-1 p-2  outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          ) : (
            <p className="text-gray-700 mt-1 capitalize">
              {userData.gender}
            </p>
          )}
        </div>

     
        <div className="flex flex-col  pt-4">
          <button onClick={() => {
                if (isEditable) {
                  updateUserData();   
                }
                setIsEditable(!isEditable);
              }}
            className="px-8 py-2 mb-5 text-[16px] width-auto
              rounded-full shadow  transition-all duration-500
             bg-white text-blue-500 border border-blue-500" 
          >
            {isEditable ? "Save Changes" : "Edit Profile"}
          </button>
          <Link href={`/doctors`}
            className="flex justify-center hover:text-blue-500 duration-300 transition-all pb-3"
            >All doctors' list 
          </Link>
          <Link href={`/auth/myAppointments`}
            className="flex justify-center hover:text-blue-500 duration-300 transition-all pb-5"
            >All my appointments 
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
