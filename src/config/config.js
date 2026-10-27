import dotenv from "dotenv";
dotenv.config();

if(!process.env.PORT){
    throw new Error("PORT not found in env")
}
if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI not present")
}

if(!process.env.JWT){
    throw new Error("JWT not found")
}

const config = {
  PORT:process.env.PORT,
  MONGO_URI:process.env.MONGO_URI,
  JWT : process.env.JWT,
  EMAIL:process.env.EMAIL,
  EMAIL_PASS:process.env.EMAIL_PASS
}

export default config;
