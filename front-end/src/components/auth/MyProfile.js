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
  const { appointments } = useSelector((state) => state.appointments);
  const [isEditable, setIsEditable] = useState(false);
  const [userData, setUserData] = useState(user || {});
  const [fileImage, setFileImage] = useState(null)
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    setUserData(user || {})
  }, [user])

  const getUserDetails = async () => {
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
    if (token) {
      getUserDetails();
    }
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

      console.log('updated user is ', res.data.data)
    } catch (err) {
      console.log(err.message)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">


        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 flex items-center gap-6">
          <div className="relative">
            {isEditable ? (
              <input
                type="file"
                onChange={handleImageChange}
                className="text-sm text-white"
              />
            ) : (
              <Image
                src={userData?.image || assets.profile_pic}
                alt="profile"
                width={100}
                height={100}
                className="rounded-full border-4 border-white shadow-md"
              />
            )}
          </div>

          <div className="text-white">
            <h2 className="text-2xl font-semibold">{userData.name}</h2>
            <p className="text-sm opacity-90">{userData.email}</p>
          </div>
        </div>


        <div className="p-8 grid md:grid-cols-2 gap-6">

          {/* left side */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-700">Personal Info</h3>


            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              {isEditable ? (
                <input
                  type="text"
                  name="name"
                  value={userData.name || ""}
                  onChange={handleChange}
                  className="input-style"
                />
              ) : (
                <p className="value-style">{userData.name}</p>
              )}
            </div>


            <div>
              <label className="text-sm text-gray-500">Email</label>
              {isEditable ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email || ""}
                  onChange={handleChange}
                  className="input-style"
                />
              ) : (
                <p className="value-style">{userData.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-500">Date of Birth</label>
              {isEditable ? (
                <input
                  type="date"
                  name="DOB"
                  value={userData.DOB || ""}
                  onChange={handleChange}
                  className="input-style"
                />
              ) : (
                <p className="value-style">{userData.DOB}</p>
              )}
            </div>


            {/* <div>
              <label className="text-sm text-gray-500">Gender</label>
              {isEditable ? (
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  className="input-style"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              ) : (
                <p className="value-style capitalize">{userData.gender}</p>
              )}
            </div> */}
          </div>

          {/* -- right side ---  */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-700">Address</h3>


            <div>
              <label className="text-sm text-gray-500">Line 1</label>
              {isEditable ? (
                <input
                  type="text"
                  value={userData.address?.line1 || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  className="input-style"
                />
              ) : (
                <p className="value-style">{userData.address?.line1}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-500">Line 2</label>
              {isEditable ? (
                <input
                  type="text"
                  value={userData.address?.line2 || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  className="input-style"
                />
              ) : (
                <p className="value-style">{userData.address?.line2}</p>
              )}
            </div>


            <div className="pt-4">
              {appointments.length > 0 ? (
                <Link
                  href="/auth/myAppointments"
                  className="text-blue-500 hover:underline"
                >
                  My appointments&apos; lists
                </Link>
              ) : (
                <div className="text-sm text-gray-500">
                  No appointments yet.
                  <Link
                    href="/doctors"
                    className="block text-blue-500 mt-2 hover:underline"
                  >
                    Book your first appointment →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>


        <div className="flex justify-end p-6 border-t">
          <button
            onClick={() => {
              if (isEditable) updateUserData();
              setIsEditable(!isEditable);
            }}
            className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            {isEditable ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
