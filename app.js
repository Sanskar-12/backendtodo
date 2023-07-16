import express from "express";
import router from "./routes/User.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskrouter from "./routes/Task.js"
import cors from "cors"


export const app = express();

config({path:"./config/config.env"})

app.use(express.json());
app.use(cookieParser())

app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
}))
app.use("/api/v1/users", router);
app.use("/api/v1/tasks", taskrouter);

app.use((err,req,res,next)=>{
  err.message=err.message|| "Internal Server Error"
  err.statusCode=err.statusCode || 500
  res.status(err.statusCode).json({
    success:false,
    message:err.message
  })
})



