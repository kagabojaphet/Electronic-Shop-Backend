import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./Routes/index.js";
import cors from "cors";


const app=express()
dotenv.config()
app.use(cors());
app.use(bodyParser.json())
app.use("/api/v1",router)
app.use(express.static("client"));


const port=process.env.PORT
const database=process.env.DATABASE


app.listen(port,()=>{
    console.log(`Port running on....${port}`)
})
mongoose.connect(database).then(()=>{
    console.log(`Database successfully connected`)
})
.catch((error)=>{
    console.log(`database error${error}`)
})
export default app