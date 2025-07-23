import jwt from 'jsonwebtoken'

//admin authentication middleware
const authAdmin = async (req, res, next) => {

    try {
        //if the req has the token , so the doctor can login and can make the api request
        const { adminToken } = req.header;
        if (!adminToken) {
            return res.json({
                success: false,
                message: "Not authorized, try again please"
            })
        } 

        //if token is existing, verify and decode it to get the email and password
    } catch (err) {
        console.log(err);
        return res.json({
            success: false, 
            message: err.message
        })
    }
}

export default authAdmin; 