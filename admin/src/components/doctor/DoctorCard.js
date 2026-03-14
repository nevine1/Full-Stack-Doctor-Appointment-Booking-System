"use client"
import { useState } from 'react';
import { updateAvailability } from '../../libs/doctorsAsync';
import { useSelector } from 'react-redux';
import Image from 'next/image';

const DoctorCard = ({ doc }) => {
  const { adminToken } = useSelector((state) => state.admin);
  const [isAvailable, setIsAvailable] = useState(doc.available);
  const [loading, setLoading] = useState(false);

  const handleChangeAvailability = async () => {
    setLoading(true);
    try {
      const success = await updateAvailability(doc._id, adminToken);
      if (success) setIsAvailable((prev) => !prev);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-300 shadow-md flex flex-col gap-y-2 rounded-md">
      <div className="relative w-full h-40">
        <Image
          src={doc.image || '/placeholder.png'}
          alt={doc.name}
          fill
          className="object-cover rounded-t-md transition-all duration-300 hover:opacity-80"
        />
      </div>
      <div className="px-3 py-2">
        <p className="text-black text-sm font-extrabold">{doc.name}</p>
        <p className="text-gray-600 text-xs">{doc.speciality}</p>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={isAvailable}
            disabled={loading}
            onChange={handleChangeAvailability}
            className={`accent-green-500 w-4 h-4 cursor-pointer`}
          />
          <p className={`${isAvailable ? "text-green-700" : "text-gray-400"} text-xs`}>
            {isAvailable ? "Available" : "Not available"}
          </p>
          {loading && <span className="text-xs text-blue-500 ml-2">Updating...</span>}
        </div>
      </div>
    </div >
  );
};

export default DoctorCard;