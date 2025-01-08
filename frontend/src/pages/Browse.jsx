import Navbar from "@/components/shared/Navbar";
import React, { useEffect } from "react";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchQuery } from "@/redux/jobSlice";
import Footer from "@/components/shared/Footer";

// const RandomJob= [1,2,3,4,5,6,7,8,9,10]
const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, []);
  return (
    <div className=" min-h-screen">
      <div className="max-w-7xl  mx-auto px-4  sm:px-6 lg:px-8">
        <Navbar />
        <h1 className="text-2xl font-bold my-6  text-center sm:text-left">
          Search Result: ({allJobs.length})
        </h1>
        <div className="grid grid-cols-1 mb-10 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {allJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
    
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Browse;
