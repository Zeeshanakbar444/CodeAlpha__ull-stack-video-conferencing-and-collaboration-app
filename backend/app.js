import express from "express"
import dotenv from "dotenv"
dotenv.config();
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.route.js'

const app = express();



app.use(express.json())
app.use(cookieParser);



// routes
app.use("/api/v1/user",userRouter)
export default app;