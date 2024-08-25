import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Routes from "./routes/routes.js"
import connectDatabase from './config/database.js';
const app=express()
dotenv.config();

app.use(express.json());
app.use(cookieParser())
app.use('/',Routes)
app.listen(4200,()=>{
    connectDatabase();
    console.log("listening to the server");
})
