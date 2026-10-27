import  jwt from "jsonwebtoken";
import config from "../config/config.js";
import crypto from "crypto";
import User from "../models/user.js";
import sendEmail from "../utils/sendMail.js";   


export async function register(req,res){
   const {name,email,password,role} = req.body || {};
  if(!name || !email || !password){
    return res.status(400).json({
        message:"name, email and password are required"
    })
  }
  try{
  const existingUser = await User.findOne({email});

  if(existingUser){
    return res.status(400).json({
        message:"User already exists"
    })
  }

  // agar existing nhi h toh new user bna do 

  const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

  const newUser = await User.create({
    name,
    email,
    role,
    password:hashedPassword
  })

  // ab token bnao 

  const token = jwt.sign({id: newUser._id} , config.JWT,{expiresIn:"15m"});

  // email bhejne wla..
   
  if(newUser){
   const otp = Math.floor(100000 + Math.random() * 900000);

            const message = ` Welcome to ShopZ ${name}! Your OTP for registration is ${otp}. Please use this OTP to complete your registration process. Thank you for choosing ShopZ!`;

            await sendEmail(email, "Welcome to ShopZ", message);



  // ab response bhej do 
  return res.status(201).json({
     _id: newUser._id,
    name:newUser.name,
    email:newUser.email,
    token:token

  })}
  }
  catch(err){
    console.log('server error', err);
    return res.status(500).json({message:"Internal Server error"})
        
  }
}

export async function login(req,res){
    const {email,password} = req.body || {};
    if(!email || !password){
        return res.status(400).json({
            message:"email and password are required"
        })
    }
    try{
         const user = await User.findOne({email});
        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
          if(user && user.password === hashedPassword){
            const generateToken = jwt.sign({id:user._id},config.JWT,{expiresIn:"15m"});
            return res.status(200).json({
                name:user.name,
                email:user.email,
                token: generateToken
            })
          }

          else {
            return res.status(400).json({
                message:"Invalid email or password"
            })
          }
    } 

    
    catch(err){
        console.log('server error', err);
        return res.status(500).json({message:"Internal Server error"})
    }
}


export default  {
    login,
    register
}
