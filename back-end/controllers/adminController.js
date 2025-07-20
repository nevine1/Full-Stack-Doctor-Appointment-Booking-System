

//API for adding new doctor 
const addDoctor = async (req, resp) => {
  try {
      
      const { name, email, password, image, speciality, degree, fees, experience, about, available, address, slots_booked } = req.body;
    //we will get these data from request  , so we need to send all these data using form data
    console.log(req.body)
    } catch (error) {
        
    }
}

export default addDoctor
