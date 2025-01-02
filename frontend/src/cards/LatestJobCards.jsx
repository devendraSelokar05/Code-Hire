import { useDarkMode } from '@/components/context/DarkMode'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import React from 'react'
import { useNavigate } from 'react-router-dom'


const LatestJobCards = ({job}) => {
  const {isDarkMode} = useDarkMode()
  const navigate = useNavigate() 
  return (
    <div onClick={()=> navigate(`/description/${job?._id}`)} className={`p-5 rounded-md shadow-2xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-300'} border-gray-200 cursor-pointer mx-2 my-3`}>
          <Avatar className={`h-20 w-20 mr-7 rounded-none`}>
                <AvatarImage  src={job?.company?.logo} />
            </Avatar>
        <h1 className='font-medium text-lg mt-4'>{job?.company?.name}</h1>
        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : "text-black"}`}>{job?.location}</p>
        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className={`text-sm`}>{job?.description}</p>
        </div>
        <div className='flex items-center gap-3 mt-5'>
            <Badge className={`text-blue-500 font-bold ${isDarkMode  ? 'border-2 border-gray-400' : 'border border-black'}`} variant="ghost" >{job?.position} Positions</Badge>
            <Badge className={`text-[#F83002] font-bold  ${isDarkMode  ? 'border-2 border-gray-400' : 'border border-black'}`} variant="ghost" >{job?.jobType} </Badge>
            <Badge className={`text-[#735cac] font-bold ${isDarkMode  ? 'border-2 border-gray-400' : 'border border-black'}`} variant="ghost" >{job?.salary} LPA</Badge>
        </div>
    </div>
  )
}

export default LatestJobCards