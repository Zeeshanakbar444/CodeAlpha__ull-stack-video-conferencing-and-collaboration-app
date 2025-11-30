import app from "./app.js"
import { dbConnection } from "./db/dbConnect.js";


const PORT = process.env.PORT;

dbConnection();
app.listen(PORT ,()=>{
    console.log(`port is running on port number ${PORT}`)
})