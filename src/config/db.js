import mongoose from "mongoose";
import config from "./config.js";

async function ConnectDB(){
    try{
        await mongoose.connect(config.MONGO_URI);
        console.log('db connected successfully');
        
    }
    catch(err){
        console.log("db connection error", err.message);
        process.exit(1);
    }
}

export default ConnectDB;
