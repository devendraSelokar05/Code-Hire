import React from 'react'
import LatestJobCards from '../cards/LatestJobCards'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const jobs = [1, 2, 3, 4, 5, 6, 7, 8]
const LatestJob = () => {
  // const navigate = useNavigate()
  const {allJobs} = useSelector(store=>store.job)
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
      <span className="text-[#4f3489]">Latest</span> & Top Job Openings
    </h1>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10 my-6 sm:my-8 lg:my-10">
      {allJobs.length <= 0 ? (
        <div className="col-span-full text-center text-gray-500 py-10">
          Jobs Not Found
        </div>
      ) : (
        allJobs.slice(0, 6).map((job) => (
          <LatestJobCards key={job._id} job={job} />
        ))
      )}
    </div>
  </div>
  )
}

export default LatestJob