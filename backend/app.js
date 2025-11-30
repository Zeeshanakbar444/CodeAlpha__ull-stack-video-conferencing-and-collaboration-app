import express from "express"
import dotenv from "dotenv"
dotenv.config();
import cookieParser from 'cookie-parser'

const app = express();



app.use(express.json())
app.use(cookieParser);
export default app;