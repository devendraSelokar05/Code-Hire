import { ApplicationModel } from "../models/application.model.js";
import { JobModel } from "../models/job.model.js";

export const applyJob = async(req, res)=>{
    try {
        const userId = req.id
        const jobId = req.params.id //postman me test karte time job id required rahegi
        if(!jobId){
            return res.status(400).json({
                message:"Job id is required",
                success:false
            })
        }
        //checking if the user already applied for the job
        const applicationExists = await ApplicationModel.findOne({job:jobId, applicant:userId})

        if(applicationExists){
            return res.status(400).json({
                message:"You have already applied for this job",
                success:false
            })
        }
        // check if the job exists
        const job = await JobModel.findById(jobId)
        if(!job){
            return res.status(400).json({
                message:"Job not found",
                success:false
            })
        }

        //create a new  application
        const appplication = await ApplicationModel.create({
            job:jobId,
            applicant:userId
        })
        job.applications.push(appplication._id)
        await job.save()
        return res.status(201).json({
            message:"Job applied  successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:error.message,
            success:false
        })
    }
}

export const getAppliedJobs = async(req, res)=>{
    try {
        const userId = req.id
        const application = await ApplicationModel.find({applicant:userId}).sort({createdAt:-1})
        .populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:[{
                path:"company",
                options:{sort:{createdAt:-1}}
            }]
        })
        if(!application){
            return res.status(400).json({
                message:"No applications found",
                success:false
            })
        }
        return res.status(200).json({
            application,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

//admin will view how many applicants apply for job
export const getApplicants = async(req, res) =>{
    try {
        const jobId = req.params.id  // job miljayegi tho mai check karunga ki isme kitne appicants ne apply kiya hai
        console.log(jobId);
        const job = await JobModel.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant",
              
            }
        
        })
        
        console.log(job);
        if(!job){
            return res.status(400).json({
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

export const updatestatus = async(req, res) =>{
    try {
        const { status } = req.body
        const applicationId = req.params.id
        if(!status){
            return res.status(400).json({
                message:"Status is required",
                success:false
            })
        }
        //find the application by applcation id
        const application = await ApplicationModel.findById({_id:applicationId})
        if(!application){
            return res.status(400).json({
                message:"Application not found",
                success:false
            })
        }
        //update the application status
        application.status = status.toLowerCase()
        await application.save()

        return res.status(200).json({
            message:"Application status updated successfully",
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}