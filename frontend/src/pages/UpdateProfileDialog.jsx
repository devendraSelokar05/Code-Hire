import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setUser } from "@/redux/authSlice";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import {  Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useDarkMode } from "@/components/context/DarkMode";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth)
    const{isDarkMode} = useDarkMode()

    const[input,setInput] = useState({ // the input state is used to filled the inintal state of the input field
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file:null
    });
    const dispatch = useDispatch()

    const handleInput = (e) => {
        setInput({...input, [e.target.name]: e.target.value}) // name yeahpar jho hai wo lable ko kaha gaya hai
      }
    
      const fileHandle = (e) => {
        const file = e.target.files[0];
            
            setInput({...input, file: file});
        }
    
      const submitHandler = async(e) => {
        e.preventDefault()
        // console.log(input)
        const formdata = new FormData()
        // formdata.append("profileImage", input.profileImage)
        formdata.append("fullname", input.fullname)
        formdata.append("email", input.email)
        formdata.append("phoneNumber", input.phoneNumber)
        formdata.append("bio", input.bio)
        formdata.append("skills", input.skills)
       
        if (input.file) {
          formdata.append("file", input.file);
      }
      


        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/profile/update`, formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            if (response.data.success) {
                dispatch(setUser(response.data.user));
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
      }
  return (
    <div>
  <Dialog open={open} onOpenChange={setOpen} >
    <DialogContent
      className={`sm:max-w-[425px] w-full p-4 sm:p-6 ${isDarkMode ? 'bg-gray-700 text-white  ' : "bg-white" }`}
      onInteractOutside={() => setOpen(false)}
    >
      <DialogHeader>
        <DialogTitle className="text-lg sm:text-xl font-bold">Update Profile</DialogTitle>
      </DialogHeader>
      <form onSubmit={submitHandler} >
        <div className="grid gap-6 py-4 ">
          {/* Name Field */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left sm:text-right">
              Name
            </Label>
            <Input
              id="name"
              name="fullname"
              value={input.fullname}
              onChange={handleInput}
              type="text"
              className={`sm:col-span-3 ${isDarkMode && ' text-black'}`}
            />
          </div>
          {/* Email Field */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-left sm:text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              value={input.email}
              onChange={handleInput}
              type="email"
              className={`sm:col-span-3 ${isDarkMode && ' text-black'}`}
            />
          </div>
          {/* Phone Number Field */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="phonenumber" className="text-left sm:text-right">
              Phone No.
            </Label>
            <Input
              id="phonenumber"
              name="phonenumber"
              value={input.phoneNumber}
              onChange={handleInput}
              type="number"
              className={`sm:col-span-3 ${isDarkMode && ' text-black'}`}
            />
          </div>
          {/* Bio Field */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-left sm:text-right">
              Bio
            </Label>
            <Input
              id="bio"
              name="bio"
              value={input.bio}
              onChange={handleInput}
              type="text"
              className={`sm:col-span-3 ${isDarkMode && ' text-black'}`}
            />
          </div>
          {/* Skills Field */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="skills" className="text-left sm:text-right">
              Skills
            </Label>
            <Input
              id="skills"
              name="skills"
              type="text"
              value={input.skills}
              onChange={handleInput}
              className={`sm:col-span-3 ${isDarkMode && ' text-black'}`}
            />
          </div>
          {/* Resume Field */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-left sm:text-right">
              Resume
            </Label>
            <Input
              id="file"
              name="file"
              type="file"
              onChange={fileHandle}
              accept="application/pdf"
              className="sm:col-span-3 cursor-pointer text-black"
            />
          </div>
        </div>
        <DialogFooter>
          {loading ? (
            <Button className="w-full my-5">
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full font-semibold">
              Update
            </Button>
          )}
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</div>

  );
};

export default UpdateProfileDialog;
