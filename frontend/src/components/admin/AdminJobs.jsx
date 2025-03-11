import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import AdminJobsTable from "./AdminJobsTable";
import { useDarkMode } from "../context/DarkMode";
import Footer from "../shared/Footer";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  const { isDarkMode } = useDarkMode();
  return (
    <div className="flex flex-col min-h-screen">
  <Navbar />
  <div className="flex-grow">
  <div className=" max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col sm:flex-row items-start justify-start gap-3 my-5">
      <Input
        type="text"
        className={`w-full placeholder:font-semibold sm:w-[50%] py-4 sm:py-7 ${
          isDarkMode && "text-white bg-gray-800"
        }`}
        placeholder="Filter by name, role, location"
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        className="rounded-md w-full sm:w-[200px] py-4 sm:py-7 mt-4 sm:mt-0"
        onClick={() => navigate("/admin/jobs/create")}
      >
        New Jobs
      </Button>
    </div>
    <AdminJobsTable />
  </div>

  </div>
  <Footer />
</div>

  );
};

export default AdminJobs;
