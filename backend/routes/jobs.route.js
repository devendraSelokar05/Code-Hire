import express from "express";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";
import { isAutenticated } from "../middlewares/auth.middleware.js";




const router = express.Router();
router.post('/postJob', isAutenticated, postJob)
router.get('/getJob', isAutenticated, getAllJobs)
router.get('/getJob/:id', isAutenticated, getJobById)
router.get('/getadminJobs', isAutenticated, getAdminJobs)

export default router
