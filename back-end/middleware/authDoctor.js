import jwt from 'jsonwebtoken';
const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    //console.log('Full Authorization header:', authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, missing or invalid token',
      });
    }
    // Extract the token from "Bearer <token>"
    const doctorToken = authHeader.split(' ')[1];

    const decodedToken = jwt.verify(doctorToken, process.env.JWT_SECRET);
    
      req.doctorId = decodedToken.id;
    
      next();

  } catch (err) {
   // console.error(' JWT verification error:', err.message);
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token failed',
    });
  }
};

export default authDoctor;
