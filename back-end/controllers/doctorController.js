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

export  {
    changeAvailability,
    getDoctors
    }