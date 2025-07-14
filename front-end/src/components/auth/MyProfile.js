"use client"
import { useState, useEffect } from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image'
const MyProfile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [userData, setUserData] = useState({
    name: "nevine vena", 
    image: "assets.profile", 
    email: "vena@gmail.com", 
    phone: "(123) - 869-9087", 
    address: {
      line1: "123 Richmond",
      line2: "new york city, USA"
    }, 
    dob: "Dec 20, 1998"
  })
  return (
    <div className="flex flex-col gap-6 mx-10 my-6">
      <div>
        <Image
          src={assets.profile_pic}
          alt="profile pic"
          width={100}
          height={100}
          className="w-48 h-48 p-1 rounded-lg shadow-lg"
        />
        {
          isEditable ? (
            
          <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData(prev => ({...prev, name: e.target.value}))}
              className="md:mx-10 sm:mx-2 mb-3 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"
                    />
          ) : (
             <p className="text-2xl font-bold text-gray-800 mt-6">{userData.name}</p> 
          )
        }
      </div>
      <hr/>
      <div>
        {
          isEditable ? (
            
          <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData(prev => ({...prev, email: e.target.value}))}
              className="md:mx-10 sm:mx-2 mb-3 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"
                    />
          ) : (
             <p className="text-2xl font-bold text-gray-800 mt-6">{userData.email}</p> 
          )
        }
        
        {
          isEditable ? (
           <> 
          <input
              type="text"
              value={userData.address.line1}
              onChange={(e) => setUserData(prev => ({...prev, address: { ...prev.address, line1: e.target.value}}))}
              className="md:mx-10 sm:mx-2 mb-3 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"
            />
            <input
              type="text"
              value={userData.address.line2}
              onChange={(e) => setUserData(prev => ({...prev, address: { ...prev.address, line2: e.target.value}}))}
              className="md:mx-10 sm:mx-2 mb-3 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"
                    />
            </>
          ) : (
             <p className="">{userData.address}</p> 
          )
        }
        
         {
          isEditable ? (
            
          <input
              type="date"
              value={userData.dob}
              onChange={(e) => setUserData(prev => ({...prev, dob: e.target.value}))}
              className="md:mx-10 sm:mx-2 mb-3 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"
                    />
          ) : (
             <p className="text-2xl font-bold text-gray-800 mt-6">{userData.dob}</p> 
          )
        }
      </div>
      <button type="button" onClick={() => setIsEditable(!isEditable)}
        className='px-6 py-2 w-48 bg-blue-500 text-white rounded-full shadow-md cursor-pointer'
      >Edit user data</button>
    </div>
  )
}

export default MyProfile;
