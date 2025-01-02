import express from "express";
import { isAutenticated } from "../middlewares/auth.middleware.js";
import { applyJob, getApplicants, getAppliedJobs, updatestatus } from "../controllers/application.controller.js";


const router = express.Router();
router.get('/apply/:id', isAutenticated, applyJob)
router.get('/get', isAutenticated, getAppliedJobs)
router.get('/:id/applicants', isAutenticated, getApplicants)
router.put('/status/:id/update', isAutenticated, updatestatus)

export default router
