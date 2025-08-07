import React from 'react'
import { updateAvailability } from '../../libs/doctorsAsync'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'
const Doctor = ({ doc }) => {
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
 const { adminToken } = useSelector((state) => state.admin)
 console.log('doctor page admin token is:', adminToken)
  return (
    <div className=" border border-gray-300 shadow-md flex flex-col gap-y-2 rounded-md">
          <img
              src={doc.image}
              alt={doc.name}
              className="w-full mb-1 bg-blue-50 rounded-md transition-all duration-300 hover:bg-blue-500"
          />
          <div className="px-3">
              <p className='text-black text-sm p-1 font-extrabold'>{doc.name}</p>
              <p className='text-gray-600 text-xs p-1'> {doc.speciality}</p>
              <div className="p-1 flex flex-row gap-2 pb-2">
                  <input type="checkbox"
                      checked={doc.available}
                      onChange={() =>updateAvailability(doc._id, adminToken)}
                  />
                  <p className={`${doc.available? "text-gray-600": "text-gray-400"} text-xs`} >Available</p>
              </div>
          </div>
    </div>
  )
}

export default Doctor
