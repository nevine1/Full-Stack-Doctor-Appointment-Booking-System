import { useState } from 'react';
import { updateAvailability } from '../../libs/doctorsAsync';
import { useSelector } from 'react-redux';

const Doctor = ({ doc }) => {
  const { adminToken } = useSelector((state) => state.admin);
  const [isAvailable, setIsAvailable] = useState(doc.available);
  const [loading, setLoading] = useState(false);

  const handleChangeAvailability = async () => {
    setLoading(true);
    const success = await updateAvailability(doc._id, adminToken);
    if (success) {
      setIsAvailable((prev) => !prev);
    }
    setLoading(false);
  };

  return (
    <div className="border border-gray-300 shadow-md flex flex-col gap-y-2 rounded-md">
      <img
        src={doc.image}
        alt={doc.name}
        className="w-full mb-1 bg-blue-50 rounded-md transition-all duration-300 hover:bg-blue-500"
      />
      <div className="px-3">
        <p className="text-black text-sm p-1 font-extrabold">{doc.name}</p>
        <p className="text-gray-600 text-xs p-1">{doc.speciality}</p>
        <div className="p-1 flex flex-row gap-2 pb-2">
          <input
            type="checkbox"
            checked={isAvailable}
            disabled={loading}
            onChange={handleChangeAvailability}
          />
          <p
            className={`${isAvailable ? "text-gray-600" : "text-gray-400"} text-xs`}
          >
            {isAvailable ? "Available" : "Not available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
