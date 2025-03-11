import { useDarkMode } from "@/components/context/DarkMode";
import Footer from "@/components/shared/Footer";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";
import { useSelector } from "react-redux";

// const appliedJobs = [
//   {
//     date: "2023-01-01",
//     jobRole: "Software Engineer",
//     company: "ABC Company",
//   },
//   {
//     date: "2023-05-12",
//     jobRole: "Devops Engineer",
//     company: "Google",
//   },
// ];
const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  const {isDarkMode} = useDarkMode()
  return (
    <div className="overflow-hidden min-h-screen">
  <div className="block lg:table w-full">
    <Table className="w-full table-auto hidden lg:table">
      <TableCaption className="text-lg font-semibold">List of Applied Jobs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="px-4 py-2 text-left">Date</TableHead>
          <TableHead className="px-4 py-2 text-left">Job Role</TableHead>
          <TableHead className="px-4 py-2 text-left">Company</TableHead>
          <TableHead className="px-4 py-2 text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allAppliedJobs.length <= 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-4">
              You Haven't Applied for Job Yet
            </TableCell>
          </TableRow>
        ) : (
          allAppliedJobs.map((appliedJob) => (
            <TableRow
              key={appliedJob._id}
              className={`${isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-300'} transition-colors duration-200`}
            >
              <TableCell className="px-4 py-2">
                {appliedJob?.createdAt?.split("T")[0]}
              </TableCell>
              <TableCell className="px-4 py-2">
                {appliedJob.job?.title}
              </TableCell>
              <TableCell className="px-4 py-2">
                {appliedJob.job?.company?.name}
              </TableCell>
              <TableCell className="px-4 py-2 text-right">
                <Badge
                  className={`${
                    appliedJob?.status === "rejected"
                      ? "bg-red-400 text-white"
                      : appliedJob?.status === "pending"
                      ? "bg-gray-500 text-white"
                      : "bg-green-400 text-white"
                  } px-2 py-1 rounded`}
                >
                  {appliedJob?.status.toUpperCase()}
                </Badge>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>

    {/* Responsive view for small devices */}
    <div className="block lg:hidden">
      {allAppliedJobs.length <= 0 ? (
        <p className="text-center py-4">You Haven't Applied for Job Yet</p>
      ) : (
        allAppliedJobs.map((appliedJob) => (
          <div
            key={appliedJob._id}
            className="mb-4 p-4  shadow rounded-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-white">
                {appliedJob?.createdAt?.split("T")[0]}
              </span>
              <Badge
                className={`${
                  appliedJob?.status === "rejected"
                    ? "bg-red-400 text-white"
                    : appliedJob?.status === "pending"
                    ? "bg-gray-500 text-white"
                    : "bg-green-400 text-white"
                } px-2 py-1 rounded`}
              >
                {appliedJob?.status.toUpperCase()}
              </Badge>
            </div>
            <h3 className="font-semibold text-lg">{appliedJob.job?.title}</h3>
            <p className="text-sm text-white">
              {appliedJob.job?.company?.name}
            </p>
          </div>
        ))
      )}
    </div>
  </div>

</div>



  
  );
};

export default AppliedJobTable;