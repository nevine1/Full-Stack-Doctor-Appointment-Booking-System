import Doctor from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Appointment from '../models/appointmentModel.js'
const changeAvailability = async (req, res) => {
    try {
        
        const { docId } = req.body; 
        const docInfo = await Doctor.findById(docId).select("-password");

        const finalDoctorInfo = await Doctor.findByIdAndUpdate(docId, { available: !docInfo.available })
        return res.json({
            success: true,
            message: "Doctor availability changed successfully", 
            data: finalDoctorInfo,
        })
    } catch (err) {
        console.log(err.message);
        return res.json({
            success: false,
            message: err.message
        })
    }
}

//get all doctors

const getDoctors = async (req, res) => {
  try {
    
    const doctors = await Doctor.find({}).select(['-password', '-email'])
    
    return res.json({
      success: true, data: doctors
    })
  } catch(err) {
    return res.json({
      success: false,
      message: err.message
    })
  }
}

const getDoctorData = async (req, res) => {
  try {
    const { id } = req.params; 
    const doctor = await Doctor.findById(id).select("-password");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }
console.log("getting doctor data is", doctor )
    return res.status(200).json({
      success: true,
      message: "Doctor data fetched successfully",
      data: doctor,
    });
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const doctorLogin = async (req, res) => {

  try {
    const { email, password } = req.body; 
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.json({
        success: false,
        message: "Invalid credentials"
      })
    }

    // check if the req.body(email and password) matching with email & password at the database
    const isMatchedPassword = await bcrypt.compare(password, doctor.password); //doctor.password is the one getting from database
    //if password is the same of doctor.password it means it is true, then get the token and login  
    
    if (isMatchedPassword) {
      //it the password is the same , then return token
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      return res.json({
        success: true,
        message: "doctor logged in successfully", 
         token
      })

    } else {
      return res.json({
        success: false, 
        message: "Invalid credentials"
      })
    }

  } catch (err) {
    return res.json({
      success: false, 
      message: err.message
    })
  }
}

//api for getting doctor appointments 
 const getDoctorAppointments = async (req, res) => {
  try {
    // doctorId comes from the decoded token(when the doctor login)
    const docId = req.doctor._id;

    const appointments = await Appointment.find({ doctorId: docId });

    return res.json({
      success: true,
      data: appointments,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


//api to make the appointments completed
const makeAppointmentComplete = async (req, res) => {
  try {
    
    const doctorId  = req.doctor._id; 

    const appointment = await Appointment.find({ docId: doctorId });
    const completedAppointment = await Appointment.findByIdAndUpdate(
      { docId: doctorId }, {
      completed: true }, { new : true})
  } catch (err) {
    return res.json({
      success: false, 
      message: "Appointment is false"
    })
  }
}
export  {
    changeAvailability,
    getDoctors,
    getDoctorData,
    doctorLogin,
    getDoctorAppointments
    }