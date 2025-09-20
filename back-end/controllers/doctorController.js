import Doctor from '../models/doctorModel.js'

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
        message: "doctor is not found"
      })
    }
  } catch (err) {
    return res.json({
      success: false, 
      message: err.message
    })
  }
}
export  {
    changeAvailability,
    getDoctors,
    getDoctorData
    }