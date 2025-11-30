import mongoose from "mongoose";

export const dbConnection = async()=>{
try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`mongoDb connected`);
} catch (error) {
    console.log("mongoDb is not connected")
}
}