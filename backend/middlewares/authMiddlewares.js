const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if (!authHeader || ! authHeader.startsWith("Bearer")){
        const error = new Error("Token no proporcionado")
        error.status = 401
        return next(error);
    }

    const token = authHeader.split(" ")[1];
    
    
    

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    }catch(error){
        return next(error)
    }
}

module.exports ={
    protect
}
