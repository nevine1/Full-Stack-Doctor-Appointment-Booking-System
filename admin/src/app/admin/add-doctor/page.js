"use client"
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { assets } from '@/assets/assets';
const page = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.admin)
  const [doctor, setDoctor] = useState({
    name: '', 
    email: '',
    password: "",
    image: "", 
    address: "",
    speciality: "",
    degree: "", 
    experience: "", 
    fees: "",

  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({
     ...prev, [name]: value,
   }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(doctor)
  }
  return (
    <div className="mt-10 mx-5 ">
      <form
        onSubmit={handleSubmit}
        className="mt-40 md:w-[30vw] w-[400px] mx-auto md:mt-20 sm:mt-5 sm:w-[90vw] bg-blue-50 border shadow-md border-gray-300 m-auto p-10 rounded-xl"
        >
        
        <p className="p-4 text-center">Adding new doctor</p>
        <div className="flex flex-col  gap-6 items-center justify-start">
         
          <input
            name="name"
            type="name"
            onChange={handleChange}
            value={doctor.name}
            placeholder="full name"
            className="mb-3 pl-3 py-2 border border-gray-300 bg-white w-full rounded-md"
          />
          
          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={doctor.email}
            placeholder="Email"
            className="mb-3 pl-3 py-2 border border-gray-300 bg-white w-full rounded-md"
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={doctor.password}
            placeholder="Password"
            className="mb-3 pl-3 py-2 border border-gray-300 bg-white w-full rounded-md"
            required
          />
          <div className="mb-3 pl-3 py-2 cursor-pointer border border-gray-300 bg-white w-full rounded-md">
            {
              doctor.image ? (
                <p className="text-gray-400">{doctor.image}</p>
              ): (
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  value={doctor.image}
                  placeholder="doctor image"
                    className="text-gray-400 "
                    required
                  />
              )
            }
            
          </div>
          <div className="mb-3 pl-3 py-2 cursor-pointer text-gray-500 border border-gray-300 bg-white w-full rounded-md">
            <select name="speciality" className='w-full' onChange={handleChange} required>
              <option value="" key="">Choose Speciality</option>
              <option value="Gynecologist" key="Gynecologist">Gynecologist</option>
              <option value="Dermatologist" key="Dermatologist">Dermatologist</option>
              <option value="Neurologist" key="Neurologist">Neurologist</option>
              <option value="General-physician" key="General-physician">General-physician</option>
              <option value="Gastroenterologist" key="Gastroenterologist">Gastroenterologist</option>
              <option value="Pediatricians" key="Pediatricians">Pediatricians</option>
            </select>
          </div>
          <div className="mb-3 pl-3 py-2 cursor-pointer text-gray-500 border border-gray-300 bg-white w-full rounded-md">
            <select name="experience" className='' onChange={handleChange} required>
              <option value="" key="">Experience</option>
              <option value="1" key="1">1 year</option>
              <option value="2" key="2">2 years</option>
              <option value="3" key="3">3 year</option>
              <option value="4" key="4">4 years</option>
              <option value="5" key="5">5 years</option>
              <option value="6" key="6">6 years</option>
              <option value="7" key="7">7 years</option>
              <option value="8" key="8">8 years</option>
              <option value="9" key="9">9 years</option>
              <option value="10" key="10">10 years</option>
            
            </select>
          </div>
          
          <input
            name="fees"
            type="number"
            onChange={handleChange}
            value={doctor.fees}
            placeholder="Fees"
            className="mb-3 pl-3 py-2 border border-gray-300 bg-white w-full rounded-md"
            required
          />

          <div className="mb-3 flex flex-row gap-2 pl-3 py-2 border border-gray-300 bg-white w-full rounded-md">
            <input
              name="address1"
              type="text"
              onChange={handleChange}
              value={doctor.fees}
              placeholder="Fees"
              required
              />
            <input
              name="address2"
              type="text"
              onChange={handleChange}
              value={doctor.fees}
              placeholder="Fees"
              required
            />
          </div>
          <div className="mb-3 flex flex-row gap-2 pl-3 py-2 border border-gray-300 bg-white w-full rounded-md">
            <textarea cols="30" rows="4" name="about" onChange={handleChange} className="w-full"></textarea>
          </div>
          <button
            type="submit"
            className="py-2 w-full text-white bg-blue-400 rounded-md"
            disabled={isLoading}
          >
            Submit
          </button>
          <div>
           
           
          </div>
        </div>
      </form>
    </div>
  )
}

export default page
