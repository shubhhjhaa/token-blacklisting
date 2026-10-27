import express from "express";
import config from "./config/config.js";
import ConnectDB from "./config/db.js";
import authRouter from "./routes/authRouter.js";

const app = express();

ConnectDB();

app.use(express.json());

app.use("/api/auth",authRouter);



app.listen(config.PORT,()=>{
    
    console.log(`server is running on port ${config.PORT}`);
})

export default app;
