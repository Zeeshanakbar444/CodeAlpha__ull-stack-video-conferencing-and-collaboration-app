import express from "express";
import {registerUser,loginUser,logoutUser, getMe} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/verify.js";
import {upload} from "../middlewares/multer.middleware.js"
const router = express.Router();

router.route("/register").post( upload.single("avatar"),registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/logout").post(verifyJWT,getMe)

export default router;