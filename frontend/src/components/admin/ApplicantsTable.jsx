import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {  MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

const shortListingstatus= ["accepted", "rejected"]
const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  
  // console.log(applicants);
  const statusHandler =async (status, id)=>{
    // console.log(status,id);
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/applications/status/${id}/update`, {status}, {
        withCredentials: true
      })
      console.log(response);
      if(response.data.success){
        toast.success(response.data.message)
      }
    
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }

  }


  return (
<div className="overflow-x-auto w-full">
  <Table className="w-full">
    <TableCaption>A list of your recent Applied Users</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>FullName</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Contact</TableHead>
        <TableHead>Resume</TableHead>
        <TableHead>Date</TableHead>
        <TableHead className="text-right">Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {applicants &&
        applicants?.applications?.map((item) => (
          <tr key={item._id}>
            <TableCell className="text-sm sm:text-base">{item?.applicant?.fullname}</TableCell>
            <TableCell className="text-sm sm:text-base">{item?.applicant?.email}</TableCell>
            <TableCell className="text-sm sm:text-base">{item?.applicant?.phoneNumber}</TableCell>
            <TableCell className="text-sm sm:text-base">
              {item.applicant?.profile?.resume ? (
                <a
                  className="text-blue-600 cursor-pointer"
                  href={item?.applicant?.profile?.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item?.applicant?.profile?.resumeOriginalName}
                </a>
              ) : (
                <span>NA</span>
              )}
            </TableCell>
            <TableCell className="text-sm sm:text-base">{item?.createdAt.split('T')[0]}</TableCell>
            <TableCell className="text-sm sm:text-base text-right cursor-pointer">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal />
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  {shortListingstatus.map((status, index) => {
                    return (
                      <div
                        onClick={() => statusHandler(status, item._id)}
                        key={index}
                        className="flex w-fit items-center my-2 cursor-pointer"
                      >
                        <span>{status}</span>
                      </div>
                    );
                  })}
                </PopoverContent>
              </Popover>
            </TableCell>
          </tr>
        ))}
    </TableBody>
  </Table>
</div>


  
  );
};

export default ApplicantsTable;
