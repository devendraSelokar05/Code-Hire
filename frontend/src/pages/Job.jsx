
import { Button } from '@/components/ui/button'
import {  Bookmark } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'
import { useDarkMode } from '@/components/context/DarkMode'



const Job = ({job}) => {
    const navigate = useNavigate()
    // const jobId = "hdfbbdjbhgfb" // it will be a dynamic value

    const {isDarkMode} = useDarkMode()

    //calclulating days ago using dayAgofunction and in thse function we take time from mongodb
    const dayAgoFunction = (mongodbTime)=>{
        const createdAt = new Date(mongodbTime)
        const currenTime = new Date();
        const timeDifference = currenTime - createdAt;
        const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysAgo
    }
  


  return (
    <div className={`p-6 rounded-md shadow-xl  ${isDarkMode ? 'bg-gray-800 text-white border  border-white' : 'bg-gray-300'}`}>
        <div className='flex items-center justify-between'>
        <p className={`text-sm text-gray-500 ${isDarkMode ? 'text-white' : "text-black"}`}>{dayAgoFunction(job?.createdAt) === 0 ? "Today": dayAgoFunction(job?.createdAt)} days ago</p>
        <Button className="rounded-full" variant="outline" size="icon"><Bookmark/></Button>
        </div>

        <div className='flex items-center gap-4 my-2 mx-4 p-4 $'>
        <Button className=" rounded-full" variant="outline" size="icon">
            <Avatar className="h-20 w-20 mr-7 rounded-none">
                <AvatarImage  src={job?.company?.logo} />
            </Avatar>
        </Button>
        <div className='mt-5'>
            <h1 className='text-lg font-medium ml-2'>{job?.company?.name}</h1>
            <p className={`text-sm ml-2 ${isDarkMode ? 'text-white' : "text-black"} font-medium`}>{job?.location}</p>
        </div>

        </div>

        <div>
            <h1 className='font-medium text-lg my-2'>{job?.title}</h1>
            <p className='text-sm font-medium'>{job?.description}</p>
        </div>

        <div className='flex items-center gap-2 mt-4'>
                <Badge className={`text-blue-700 font-bold  ${isDarkMode  ? 'border-2 border-gray-400' : 'border border-black'}`} variant="ghost">{job?.position}Positions</Badge>
                <Badge className={`text-[#F83002] font-bold ${isDarkMode  ? 'border-2 border-gray-400' : 'border border-black'}`} variant="ghost">{job?.jobType}</Badge>
                <Badge className={`text-[#7209b7] font-bold ${isDarkMode  ? 'border-2 border-gray-400' : 'border border-black'}`} variant="ghost">{job?.salary}LPA</Badge>
        </div>

        <div className='flex items-center gap-4 mt-4'>
            <Button onClick={() => navigate(`/description/${job?._id}`)}
             >Details</Button>
            <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">Save For Later</Button>
        </div>

        
    </div>
  )
}

export default Job