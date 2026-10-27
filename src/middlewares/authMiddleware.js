import jwt from "jsonwebtoken";
import User from "../models/user";
import config from "../config/config";


async function protect(req,res,next){
    let token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Invalid token"});
    }
     
    try{
    const decoded = jwt.verify(token,config.JWT);
    req.user = await User.findById(decoded.id).select("-password");
        next();
    }


    catch(err){
        return res.status(401).json({message:"No token found"})
    }
}