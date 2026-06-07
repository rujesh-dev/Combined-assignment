const jwt = require("jsonwebtoken");
const User = require("../models/User");


module.exports = async(req, res, next)=>{
    try{
        const token = req.headers.token;

    if(!token){
        res.status(402).send("No token found!")
    }
    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );
    
    console.log(decoded, "decoded");
    
     req.user =decoded;
   

    next();
    }catch(e){
        res.status(401).json({
            message: "Invalid token"
        })
    }

    
}