"use client";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Page = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.admin);
const experienceOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  const [doctor, setDoctor] = useState({
    name: '', 
    email: '',
    password: '',
    image: '', 
    speciality: '',
    degree: '',
    experience: '',
    fees: '',
    address1: '',
    address2: '',
    about: ''
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setDoctor((prev) => ({
        ...prev,
        [name]: files[0]?.name || "", // show filename only
      }));
    } else {
      setDoctor((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(doctor);
  };

  return (
    <div className="my-3 mx-auto w-full max-w-6xl px-4 md:px-8 max-h-[80vh] ">
      <form
        onSubmit={handleSubmit}
        className="mt-13 mb-4 bg-blue-50 border shadow-md border-gray-300 w-full max-w-4xl mx-auto p-8 md:p-10 rounded-xl"
      >
        <p className="pb-6 text-center text-xl font-semibold">Adding New Doctor</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <input
            name="name"
            type="text"
            onChange={handleChange}
            value={doctor.name}
            placeholder="Full Name"
            className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full"
          />

          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={doctor.email}
            placeholder="Email"
            className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full"
          />

          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={doctor.password}
            placeholder="Password"
            className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full"
            required
          />
          
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              required
            />
          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-full">
            <input
              name="address1"
              type="text"
              onChange={handleChange}
              value={doctor.address1}
              placeholder="Address Line 1"
              className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full"
              required
            />
            <input
              name="address2"
              type="text"
              onChange={handleChange}
              value={doctor.address2}
              placeholder="Address Line 2"
              className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full"
            />
          </div>

          <input
            name="fees"
            type="number"
            onChange={handleChange}
            value={doctor.fees}
            placeholder="Fees"
            className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full"
            required
          />

          <select
            name="speciality"
            className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full text-gray-500"
            onChange={handleChange}
            value={doctor.speciality}
            required
          >
            <option value="">Choose Speciality</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="General-physician">General-physician</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
            <option value="Pediatricians">Pediatricians</option>
          </select>

          <select
              name="experience"
              className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full text-gray-500"
              onChange={handleChange}
              value={doctor.experience}
              required
            >
              <option value="">Experience</option>
              {experienceOptions.map((year) => (
                <option key={year} value={year}>
                  {year} {year === 1 ? 'year' : 'years'}
                </option>
              ))}
            </select>


          <input
            name="degree"
            type="text"
            onChange={handleChange}
            value={doctor.degree}
            placeholder="Degree"
            className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full"
          />

          
          <div className="col-span-full">
            <textarea
              name="about"
              rows="4"
              placeholder="About"
              onChange={handleChange}
              value={doctor.about}
              className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full resize-none"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 py-2 px-4 w-full text-white bg-blue-500 hover:bg-blue-600 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Page;
