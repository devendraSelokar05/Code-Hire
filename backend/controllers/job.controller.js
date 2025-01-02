import { JobModel } from "../models/job.model.js";

//postJobs for student
export const postJob = async(req, res)=>{
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        // console.log( title, description, requirements, salary, location, jobType, experience, position, companyId)
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await JobModel.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const getAllJobs = async(req,res)=>{
    try {
        const keywords = req.query.keywords || "";
        const query={
            $or:[ //filtering of keywords
                {title:{$regex:keywords,$options:"i"}}, //meaning of i is case insensitive
                {description:{$regex:keywords,$options:"i"}},
            ]
        }
        const jobs = await JobModel.find(query).populate({
            path:"company"
        }).sort({createdAt:-1}) // populate is used to get the info about which comapny is posted the
        if(!jobs){
            return res.status(404).json({
                message:"No jobs found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}

export const getJobById = async(req,res)=>{
    try {
        const jobId = req.params.id
        // console.log("Job Id:",jobId);
        const job = await JobModel.findById(jobId).populate({
            path:"applications",
        })
        // console.log("JOB:",job);
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

//Admin post the job
export const getAdminJobs = async(req, res)=>{
    try {
        const adminId = req.id
        // console.log('Admin ID:', adminId); // Log the
        const jobs = await JobModel.find({created_by:adminId}).populate({
            path:"company",
            createdAt:-1
        })
        // console.log('Admin Jobs:', jobs); // Log the retrieved jobs

        if(!jobs){
            return res.status(404).json({
                message:"No jobs found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}
   