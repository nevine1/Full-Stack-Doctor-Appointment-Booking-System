"use client";
import { assets } from '@/assets/assets';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
const Page = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.admin);
const experienceOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  const [doctor, setDoctor] = useState({
    name: '', 
    email: '',
    password: '',
    image: '', 
    iamgePreview:"",
    speciality: 'General-physician',
    degree: '',
    experience: '5 Years',
    fees: '',
    address1: '',
    address2: '',
    about: ''
  });

  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0] || ""; // file object not a string
       const imageURL = URL.createObjectURL(file); //to can see  the image preview url 
      setDoctor((prev) => ({
        ...prev,
        image: file || "", 
        imagePreview: imageURL || ""
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
    <div className="my-1 mx-auto w-[80%] max-w-6xl px-4 md:px-8 max-h-[80vh] ">
     
      <form
        onSubmit={handleSubmit}
        className="mt-5 mb-4  border shadow-lg border-gray-300 w-full max-w-4xl mx-auto p-8 md:p-10 rounded-xl"
      >
        <p className="pb-3 text-center text-xl font-semibold">Adding New Doctor</p>

        <div className="flex items-center justify-center m-1">
       
          <Link href={`${doctor.imagePreview}`}>
            <Image
              src={doctor.image ? doctor.imagePreview : assets.upload_area}
              width={60}
              height={60}
              alt="Preview"
              className="rounded-full object-cover border border-gray-200 mb-2"
            />
          </Link>
         
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <input
            name="name"
            type="text"
            onChange={handleChange}
            value={doctor.name}
            placeholder="Full Name"
            className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full text-sm"
          />

          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={doctor.email}
            placeholder="Email"
            className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full text-sm"
          />

          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={doctor.password}
            placeholder="Password"
            className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full text-sm"
            required
          />
          
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="pl-3 py-2 border text-sm border-gray-300 bg-white rounded-md w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              required
            />
          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-full">
            <input
              name="address1"
              type="text"
              onChange={handleChange}
              value={doctor.address1}
              placeholder="Address Line 1"
              className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full text-sm"
              required
            />
            <input
              name="address2"
              type="text"
              onChange={handleChange}
              value={doctor.address2}
              placeholder="Address Line 2"
              className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full text-sm"
            />
          </div>

          <input
            name="fees"
            type="number"
            onChange={handleChange}
            value={doctor.fees}
            placeholder="Fees"
            className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full text-sm"
            required
          />

          <select
            name="speciality"
            className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full text-gray-500 text-sm"
            onChange={handleChange}
            value={doctor.speciality}
            required
          >
            <option value="General-physician">General-physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
            <option value="Pediatricians">Pediatricians</option>
          </select>

          <select
              name="experience"
              className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full text-gray-500 text-sm"
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
            className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full text-sm"
          />

          
          <div className="col-span-full">
            <textarea
              name="about"
              rows="4"
              placeholder="About me ...."
              onChange={handleChange}
              value={doctor.about}
              className="pl-3 py-2 border border-gray-300 bg-white rounded-md w-full resize-none text-sm"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 py-2 px-20 mx-auto cursor-pointer  flex justify-center  text-white bg-blue-500 border hover:border-blue-600 hover:text-blue-500 hover:bg-white transition-all duration-300 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Page;
