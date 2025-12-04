import { UserApp } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const generateToken = async (uid) => {
  const data = await UserApp.findById(uid);
  let token = await data.generateAccessToken();
  return token;
};
export const registerUser = asyncHandler(async (req, res) => {
  try {
    let { name, email, password } = req.body;
    const avatar = req.file;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "all fields are required",
        success: false,
      });
    }

    if (!avatar) {
      return res.status(400).json({
        message: "avatar file is required",
        success: false,
      });
    }
    const upload = await uploadOnCloudinary(avatar.path);

    if (!upload) {
      return res.status(400).json({
        message: "image is not uploaded on clouduinary",
        success: false,
      });
    }

    const user = await UserApp.create({
      name,
      email,
      password,
      avatar: upload.url,
    });

    return res.status(200).json({
      message: "user created Successfully",
      success: true,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "error in register user controller",
      success: false,
    });
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "both email or password fields are required",
        success: false,
      });
    }

    const findUser = await UserApp.findOne({ email });
    if (!findUser) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }

    const checkPassword = await findUser.comparePassword(
      password,
      findUser.password
    );

    if (!checkPassword) {
      return res.status(400).json({
        message: "password is not matched",
        success: false,
      });
    }

    const user = await UserApp.findOne({ email }).select("-password");

    const token = await generateToken();
    if (!token) {
      return res.status(400).json({
        message: "token not generated",
        success: false,
      });
    }
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).cookie("token", token, options).json({
      message: "user Login Successfully",
      success: false,
      user,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "error in login user controller",
      success: false,
    });
  }
});





export const logoutUser = asyncHandler(async(req,res)=>{
try {
    if(!req.user){
        return res.status(400).json({
            message:"unauthorized access",
            success:false
        })
    }
    let options={
        httpOnly:true,
        secure:true
    }
return res.status(200).clearCookies("token",options).json({
    message:"user logout successfully",
    success:true
})







} catch (error) {
    
}
})


export const getMe = asyncHandler(async(req,res)=>{
try {
    let user = await UserApp.findById(req.user?._id).select("-password");
    if(!user){
        return res.status(400).json({
            message:"user not found",
            success:false
        })
    }


    return res.status(200).json({
        message:"user fetch successfully",
        success:true,
        user
    })
} catch (error) {
    console.log(error);
    return res.status(500).json({
        message:"error in getMe controller",
        success:false
    })
}
})