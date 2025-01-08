import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Contact, Mail, Pen, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import AppliedJobTable from "@/cards/AppliedJobTable";
import UpdateProfileDialog from "@/pages/UpdateProfileDialog";
import useGetAllAppliedJobs from "@/hooks/useGetAllAppliedJobs";
import { useDarkMode } from "@/components/context/DarkMode";
import { toast } from "sonner";
import axios from "axios";

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
  useGetAllAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  // console.log(user.profile.resume)
  // console.log(user.fullname)
  const{isDarkMode} = useDarkMode()

  // const handleDeleteResume = async () => {
  //   try {
  //     // Make sure public_id is available in the user profile
  //     const publicId = user?.profile?.resumePublicId;  // Assuming you store public_id in the profile
  //     // console.log(publicId);
  //     if (!publicId) {
  //       toast.error("No resume found to delete.");
  //       return;
  //     }
  
  //     const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/users/deleteResume`, {
  //       withCredentials: true,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       data: JSON.stringify({
  //         userId: user._id,
  //         public_id: publicId,  // Send public_id to backend
  //       })
  //     });
  
  //     console.log(response);
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.response?.data?.message || 'Error occurred');
  //   }
  // }
  
  return (
    <div className={` ${isDarkMode ? 'text-white' : 'text-black'} min-h-screen`}>
      <Navbar />
      <div className={`max-w-4xl mx-auto  border  rounded-2xl my-5 p-6 md:p-8 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 md:h-24 md:w-24 rounded-full">
              <AvatarImage src={user?.profile?.profileImage} alt="profile" />
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="text-sm  break-words whitespace-normal">
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="w-full md:w-auto"
            variant="outline"
          >
            <Pen className="mr-2" /> Edit Profile
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2 text-sm ${isDarkMode ? 'text-white' : 'text-black'}">
            <Mail className="text-gray-600" />
            <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2 text-sm">
            <Contact className="text-gray-600" />
            <span className="font-medium">{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <h1 className="font-semibold text-lg mb-3">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index} className="px-3 py-1 text-sm">
                  {item}
                </Badge>
              ))
            ) : (
              <span className="font-medium">NA</span>
            )}
          </div>
        </div>

        <div className="grid w-full gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <div className="flex items-center justify-between">
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="text-blue-500 hover:underline"
            >
              {user?.profile?.resumeOriginalName}
            </a>
            <Button onClick={handleDeleteResume} className="mt-2" variant="destructive">
            <Trash className="mr-2" /> Delete Resume
          </Button>
          </div>
          ) : (
            <span className="text-gray-600">NA</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto rounded-2xl my-5 p-6 md:p-8">
        <h1 className={`font-bold text-lg mb-5 ${isDarkMode ? 'text-white' : 'text-black'}`}>Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
