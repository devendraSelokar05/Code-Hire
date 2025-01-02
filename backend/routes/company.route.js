import express from "express";
import { getCompany,  getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { isAutenticated } from "../middlewares/auth.middleware.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register",isAutenticated, registerCompany)
router.get("/getCompany", isAutenticated, getCompany)
router.get("/getCompany/:id", isAutenticated, getCompanyById)
router.put('/updateCompany/:id', isAutenticated,singleUpload, updateCompany)
export default router
