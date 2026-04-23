"use client";
import { assets } from "@/assets/assets";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import axios from "axios";
import { setAdminLoading } from "../../../../store/slices/adminSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { isLoading, adminToken } = useSelector((state) => state.admin);
  const experienceOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const [showModal, setShowModal] = useState(false);

  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
    imagePreview: "",
    speciality: "General-physician",
    degree: "",
    experience: "5",
    fees: "",
    address1: "",
    address2: "",
    about: "",
    available: true,
    slots_booked: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0] || null;
      const imageURL = file ? URL.createObjectURL(file) : "";
      setDoctor((prev) => ({
        ...prev,
        image: file,
        imagePreview: imageURL,
      }));
    } else {
      setDoctor((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const validateDoctor = () => {
    const requiredFields = [
      "name",
      "email",
      "password",
      "degree",
      "fees",
      "address1",
      "experience",
      "speciality",
    ];

    for (let field of requiredFields) {
      if (!doctor[field] || doctor[field].toString().trim() === "") {
        toast.error(`Please fill ${field}`);
        return false;
      }
    }

    if (!doctor.image) {
      toast.error("Please upload an image");
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adminToken) return toast.error("You are not logged in as admin.");

    if (!validateDoctor()) return;

    dispatch(setAdminLoading(true));

    try {
      const formData = new FormData();

      Object.entries(doctor).forEach(([key, value]) => {
        if (key === "address1" || key === "address2") return;
        formData.append(key, value);
      });

      formData.append(
        "address",
        JSON.stringify({
          address1: doctor.address1,
          address2: doctor.address2,
        })
      );

      const res = await axios.post(
        `${backUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success(`${doctor.name} added successfully`);

        setDoctor({
          name: "",
          email: "",
          password: "",
          image: null,
          imagePreview: "",
          speciality: "General-physician",
          degree: "",
          experience: "5",
          fees: "",
          address1: "",
          address2: "",
          about: "",
          available: true,
          slots_booked: 0,
        });
      } else {
        toast.error(res.data.message || "Failed to add doctor");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Error adding doctor");
    } finally {
      dispatch(setAdminLoading(false));
    }
  };

  return (
    <div className="my-4 mx-auto w-[95%] max-w-6xl px-4 md:px-8 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="mt-5 mb-6 border shadow-lg border-gray-300 w-full max-w-4xl mx-auto p-6 md:p-10 rounded-xl bg-white"
      >
        <p className="pb-4 text-center text-2xl font-semibold">Adding New Doctor</p>

        <div className="flex items-center justify-center mb-4">
          <Image
            src={doctor.imagePreview || assets.upload_area}
            width={80}
            height={80}
            alt="Preview"
            className="rounded-full object-cover border border-gray-200"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter full name"
              value={doctor.name}
              onChange={handleChange}
              className="pl-3 py-2 border border-gray-300 rounded-md w-full text-sm"
              required
            />
          </div>


          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              value={doctor.email}
              onChange={handleChange}
              className="pl-3 py-2 border border-gray-300 rounded-md w-full text-sm"
              required
            />
          </div>


          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={doctor.password}
              onChange={handleChange}
              className="pl-3 py-2 border border-gray-300 rounded-md w-full text-sm"
              required
            />
          </div>


          <div className="flex flex-col">
            <label htmlFor="image" className="mb-1 text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              id="image"
              type="file"
              name="image"
              onChange={handleChange}
              className="pl-3 py-2 border text-sm border-gray-300 rounded-md w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              required
            />
          </div>


          <div className="flex flex-col">
            <label htmlFor="address1" className="mb-1 text-sm font-medium text-gray-700">
              Address Line 1
            </label>
            <input
              id="address1"
              name="address1"
              type="text"
              placeholder="Address line 1"
              value={doctor.address1}
              onChange={handleChange}
              className="pl-3 py-2 border border-gray-300 rounded-md w-full text-sm"
              required
            />
          </div>


          <div className="flex flex-col">
            <label htmlFor="address2" className="mb-1 text-sm font-medium text-gray-700">
              Address Line 2
            </label>
            <input
              id="address2"
              name="address2"
              type="text"
              placeholder="Address line 2"
              value={doctor.address2}
              onChange={handleChange}
              className="pl-3 py-2 border border-gray-300 rounded-md w-full text-sm"
            />
          </div>


          <div className="flex flex-col">
            <label htmlFor="fees" className="mb-1 text-sm font-medium text-gray-700">
              Fees $:
            </label>
            <input
              id="fees"
              name="fees"
              type="number"
              placeholder="Fees"
              value={doctor.fees}
              onChange={handleChange}
              className="pl-3 py-2 border border-gray-300 rounded-md w-full text-sm"
              required
            />
          </div>


          <div className="flex flex-col">
            <label htmlFor="speciality" className="mb-1 text-sm font-medium text-gray-700">
              Speciality
            </label>
            <select
              id="speciality"
              name="speciality"
              value={doctor.speciality}
              onChange={handleChange}
              className="pl-3 py-2 border border-gray-300 rounded-md w-full text-sm text-gray-500"
            >
              <option value="General-physician">General-physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
              <option value="Pediatricians">Pediatricians</option>
            </select>
          </div>


          <div className="flex flex-col">
            <label htmlFor="experience" className="mb-1 text-sm font-medium text-gray-700">
              Experience
            </label>
            <select
              id="experience"
              name="experience"
              value={doctor.experience}
              onChange={handleChange}
              className="pl-3 py-2 border border-gray-300 rounded-md w-full text-sm text-gray-500"
            >
              <option value="">Experience</option>
              {experienceOptions.map((year) => (
                <option key={year} value={year}>
                  {year} {year === 1 ? "year" : "years"}
                </option>
              ))}
            </select>
          </div>


          <div className="flex flex-col">
            <label htmlFor="degree" className="mb-1 text-sm font-medium text-gray-700">
              Degree
            </label>
            <input
              id="degree"
              name="degree"
              type="text"
              placeholder="Degree"
              value={doctor.degree}
              onChange={handleChange}
              className="pl-3 py-2 border border-gray-300 rounded-md w-full text-sm"
              required
            />
          </div>


          <div className="flex flex-col md:col-span-2">
            <label htmlFor="about" className="mb-1 text-sm font-medium text-gray-700">
              About
            </label>
            <textarea
              id="about"
              name="about"
              rows="4"
              placeholder="About me ..."
              value={doctor.about}
              onChange={handleChange}
              className="pl-3 py-2 border border-gray-300 rounded-md w-full text-sm resize-none"
              required
            />
          </div>
        </div>

        {
          adminToken ? (
            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 py-2 px-6 w-full md:w-auto mx-auto block text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-white hover:text-blue-500 hover:border-blue-600 transition-all duration-300"
            >
              {isLoading ? "Adding..." : "Submit"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              disabled={isLoading}
              className="mt-6 py-2 px-6 w-full md:w-auto mx-auto block text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-white hover:text-blue-500 hover:border-blue-600 transition-all duration-300"
            >
              {isLoading ? "Adding..." : "Submit"}
            </button>
          )
        }

      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md text-center shadow-lg">

            <h2 className="text-xl font-semibold mb-3">
              Admin Access Required
            </h2>

            <p className="text-gray-600 mb-5">
              You must be logged in as admin to perform this action.
            </p>

            <div className="flex justify-center gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={() => router.push("/auth/login")}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Go to Login
              </button>

            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default page;