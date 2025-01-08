import express from "express";
import { deleteResume, googleLogin, login, logout, register, updateProfile } from "../controllers/user.controller.js";
import { isAutenticated } from "../middlewares/auth.middleware.js";
import { singleUpload } from "../middlewares/multer.js";


const router = express.Router();  

router.post("/register",singleUpload, register)
router.post("/login", login)
router.post("/googleLogin", googleLogin)
router.post("/profile/update", isAutenticated, singleUpload, updateProfile)
router.get("/logout", isAutenticated, logout)
router.delete("/delete", isAutenticated, deleteResume)

export default router