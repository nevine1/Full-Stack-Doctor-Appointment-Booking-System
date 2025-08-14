"use client";
import { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "@/store/slices/usersAsync";
const MyProfile = () => {
  const { token } = useSelector((state) => state.users)
 
  const [isEditable, setIsEditable] = useState(false);
  const [userData, setUserData] = useState({
   /*  name: "nevine vena",
    image: "assets.profile",
    email: "vena@gmail.com",
    phone: "(123) - 869-9087",
    address: {
      line1: "123 Richmond",
      line2: "new york city, USA"
    },
    dob: "1998-12-20", // use YYYY-MM-DD for <input type="date">
    gender: "female" */
  });

  const userDetails = async (token, user, setUser ) => {
  try {

    if (!token) {
      toast.error('This user is not logged in')
    }

    const res = await axios.get(`${backUrl}/api/users/user-details`);
    if (res.data.success) {
      setUserData(res.data.data)
      toast.success('user details are ')
    }
    
      } catch (err) {
        console.log(err.message)
      }
  }
  console.log('all user data is ', userData)
 /*  useEffect(() => {
   userDetails(token)
  }, [token])
   */
  return (
    <div className="flex flex-col  items-center justify-center p-8 w-full min-h-screen">
      {/* Profile image */}
      <div className="mb-6">
        <Image
          src={assets.profile_pic}
          alt="profile pic"
          width={150}
          height={150}
          className="rounded-full shadow-lg p-2 bg-gray-100"
        />
      </div>

      
      <div className="bg-gray-100 py-5 px-10 rounded-xl border border-gray-300 shadow-lg w-full max-w-md space-y-5">
       
        <div >
          <label className="font-bold text-gray-500">Name</label>
          {isEditable ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full mt-1 p-2  outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
            />
          ) : (
            <p className="text-gray-700 mt-1">{userData.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="font-bold text-gray-500">Email</label>
          {isEditable ? (
            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full mt-1 p-2  outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
            />
          ) : (
            <p className="text-gray-700 mt-1">{userData.email}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="font-bold text-gray-500">Address</label>
          {isEditable ? (
            <>
              <input
                type="text"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value }
                  }))
                }
              className="w-full mt-1 p-2  outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
              />
              <input
                type="text"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value }
                  }))
                }
              className="w-full mt-1 p-2  outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
              />
            </>
          ) : (
            <p className="text-gray-700 mt-1">
              {userData.address.line1}, {userData.address.line2}
            </p>
          )}
        </div>

        {/* DOB */}
        <div>
          <label className="font-bold text-gray-500">Date of Birth</label>
          {isEditable ? (
            <input
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              className="w-full mt-1 p-2  outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
            />
          ) : (
            <p className="text-gray-700 mt-1">{userData.dob}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="font-bold text-gray-500">Gender</label>
          {isEditable ? (
            <select
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
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

        {/* Buttons */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setIsEditable(!isEditable)}
            className="px-8 py-2 mb-5 bg-blue-600 text-[18px]
             text-white rounded-full shadow  transition-all duration-500
             hover:bg-white hover:text-blue-500 border hover:border-blue-500"
          >
            {isEditable ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
