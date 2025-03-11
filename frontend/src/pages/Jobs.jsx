import FilterCard from "@/cards/FilterCard";
import Navbar from "@/components/shared/Navbar";
import React, { useEffect, useState } from "react";
import Job from "./Job";
import { useSelector } from "react-redux";
import Footer from "@/components/shared/Footer";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Jobs = () => {
  const {allJobs, searchQuery} = useSelector(store=>store.job)
  const [filterJobs, setFilterJobs] = useState(allJobs)




  useEffect(()=>{
    if(searchQuery){
      const filteredJobs = allJobs.filter((job)=>{
        return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase()) 
        
      })

      setFilterJobs(filteredJobs)
    }
    else{
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchQuery])
  return (
    <div className="min-h-screen">
  <Navbar />
  <div className="mx-auto max-w-7xl mt-5 px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Sidebar FilterCard */}
      <div className="w-full lg:w-1/4">
        <FilterCard />
      </div>

      {/* Jobs Section */}
      {filterJobs.length <= 0 ? (
        <span className="text-center text-gray-500 mt-4 lg:mt-0">
          Jobs Not Found
        </span>
      ) : (
        <div className="flex-1 h-[80vh] overflow-y-auto pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
            {filterJobs.map((job, index) => (
              <div key={index}>
                <Job job={job} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
  <Footer />
</div>

  );
};

export default Jobs;
