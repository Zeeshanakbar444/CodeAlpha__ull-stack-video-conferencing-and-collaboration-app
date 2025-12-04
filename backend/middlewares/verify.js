import { UserApp } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
const token = req.cookies?.token||req.header("Authorization").replace("Bearer ","");

if(!token){
    return res.status(400).json({
        message:"Unauthorized attempt",
        success:false
    })
}

const decoded = await jwt.verify(token,process.env.JWT_ACCESS_SECRET);
const user = await UserApp.findById(decoded._id).select("-password");
if(!user){
    return res.status(400).json({
        message:"unautorized token",
        success:false
    })
}
req.user = user;
next()



  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: "error in verify jwt controller",
      success: false,
    });
  }
});
