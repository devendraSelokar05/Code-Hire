
import { useDarkMode } from '@/components/context/DarkMode'
import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { setSingleJob } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'


const JobDescription = () => {
     // agr true hoga tho candidate ne apply kar chuka hai tho button ka color gray hoga otherwise button ka color violetdikhayi dega
    const params = useParams()
    const jobId = params.id 
    const dispatch = useDispatch()
    const { singleJob } = useSelector(store=>store.job)
    const {user} = useSelector(store=>store.auth)
    //jho applications model me applicant hai uski userid agr matc ho jaati hai logged in user se tho use true dikhana hai matlab ki use isapplied ki button dikhegi otherwise  false dikhana hai jis se ki use applynow ki button dikhegi
    const isInitiallyApplied = singleJob?.applications?.some(applications =>applications.applicant ===user?._id) || false
    const[isApplied, setIsApplied] = useState(isInitiallyApplied)
    const {isDarkMode} = useDarkMode()

    const applyJobHandler = async()=>{
       
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/applications/apply/${jobId}`,{
                withCredentials: true
            })
            console.log(response)
            if(response.data.success){
                dispatch(setSingleJob(response.data.job))
                toast.success(response.data.message)
                // console.log(response.data.jobs)
                setIsApplied(true) //update the local state

                const updateSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]} //help use to realtime updation
                dispatch(setSingleJob(updateSingleJob))
            }
        } catch (error) {
           console.log(error)
           toast.error(error.response.data.message) 
        }
    }

    useEffect(() => {
        const fetechSingleJob = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/jobs/getJob/${jobId}`,{
                    withCredentials: true
                })
                console.log(response)
                if(response.data.success){
                    dispatch(setSingleJob(response.data.job))
                    // console.log(response.data.jobs)
                    setIsApplied(response.data.job.applications.some(applications =>applications.applicant ===user?._id) || false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetechSingleJob() //call kar diya 
     }, [jobId, dispatch, user?._id])
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col flex-grow min-h-screen">
    <Navbar />

    {/* Main Content */}
    <div className="flex-grow">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-6 sm:my-8 lg:my-10">
            <div className="space-y-4">
                <h1 className="font-bold text-lg sm:text-xl lg:text-2xl">{singleJob?.title}</h1>
                <div className="flex flex-wrap items-center gap-2">
                    <Badge className="text-blue-700 font-bold text-sm" variant="ghost">
                        {singleJob?.position} position
                    </Badge>
                    <Badge className="text-[#F83002] font-bold text-sm" variant="ghost">
                        {singleJob?.jobType}
                    </Badge>
                    <Badge className="text-[#735cac] font-bold text-sm" variant="ghost">
                        {singleJob?.salary} LPA
                    </Badge>
                </div>
            </div>

            <Button 
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied} 
                className={`w-full sm:w-auto rounded-lg ${
                  isApplied ? 'bg-gray-800 text-white cursor-not-allowed' : 'bg-[#4f3489] hover:bg-[#418046]'
                }`}
            >
                {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
        </div>

        {/* Description Section */}
        <h1 className="font-bold text-lg sm:text-xl py-4 border-b-2 border-gray-300">
            Job Description
        </h1>

        <div className="my-4 space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row">
                    <h1 className="font-bold min-w-[120px]">Role:</h1>
                    <span className="pl-0 sm:pl-1 font-medium">{singleJob?.title}</span>
                </div>
                <div className="flex flex-col sm:flex-row">
                    <h1 className="font-bold min-w-[120px]">Location:</h1>
                    <span className="pl-0 sm:pl-1 font-medium">{singleJob?.location}</span>
                </div>
                <div className="flex flex-col sm:flex-row">
                    <h1 className="font-bold min-w-[120px]">Experience:</h1>
                    <span className="pl-0 sm:pl-1 font-medium">{singleJob?.experienceLevel} yrs</span>
                </div>
                <div className="flex flex-col sm:flex-row">
                    <h1 className="font-bold min-w-[120px]">Salary:</h1>
                    <span className="pl-0 sm:pl-1 font-medium">{singleJob?.salary} LPA</span>
                </div>
                <div className="flex flex-col sm:flex-row">
                    <h1 className="font-bold min-w-[120px]">Applicants:</h1>
                    <span className="pl-0 sm:pl-1 font-medium">{singleJob?.applications?.length}</span>
                </div>
                <div className="flex flex-col sm:flex-row">
                    <h1 className="font-bold min-w-[120px]">Posted Date:</h1>
                    <span className="pl-0 sm:pl-1 font-medium">{singleJob?.createdAt?.split("T")[0]}</span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row mt-4">
                <h1 className="font-bold min-w-[120px]">Description:</h1>
                <span className="pl-0 sm:pl-1 font-medium">{singleJob?.description}</span>
            </div>
        </div>
    </div>

    {/* Footer */}
    <footer className={`mt-auto p-4 text-center ${isDarkMode ? 'text-white font-medium' : 'text-black font-medium'}`}>
        © 2024 Code Hire. All rights reserved.
    </footer>
</div>

  )
}

export default JobDescription