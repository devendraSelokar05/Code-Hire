import { LogOut, Menu, Moon, Sun, User2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { useDarkMode } from "../context/DarkMode";
import { googleLogout,  } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  // let user = false;
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const{isDarkMode, toggleDarkMode} = useDarkMode()



  const logoutHandler = async () => {
    try {
      if(user?.googleId){
        googleLogout()
     
      }
      else{
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/logout`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          
          toast.success(response.data.message);
        }
      }
      dispatch(setUser(null));
          navigate("/");
          window.google?.accounts.id.disableAutoSelect();
      
     
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };



  return (
    <div className={`sticky top-0 z-10 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
    <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-4 sm:px-6 lg:px-8">
      {/* Logo Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Code <span className="text-[#db4949]">Hire</span>
        </h1>
      </div>
  
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-10">
        <ul className="flex items-center gap-5 font-semibold">
          {user && user.role === 'recruiter' ? (
            <>
              <li><Link to="/admin/companies">Companies</Link></li>
              <li><Link to="/admin/jobs">Jobs</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/jobs">Jobs</Link></li>
              <li><Link to="/browse">Browse</Link></li>
            </>
          )}
        </ul>
  
        {/* User section (Login/Signup or Avatar with Popover) */}
        {!user ? (
          <div className="flex items-center gap-5">
            <Link to="/login">
              <Button variant="">Login</Button>
            </Link>
            <Link to="/signup">
              {/* <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">Signup</Button> */}
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={user?.profile?.profileImage}
                  alt="@shadcn"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className={`w-80 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}>
              <div className="flex items-center gap-3">
                <Avatar className="h-20 w-20 cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profileImage}
                    alt="@shadcn"
                  />
                </Avatar>
                <div>
                  <h4 className="font-semibold">{user?.fullname}</h4>
                  <p className="text-md font-semibold">{user?.email}</p>
                  <p className="text-sm">
                    {user?.profile?.bio}
                  </p>
                </div>
              </div>
              <div className={`flex flex-col gap-3 my-2 ${isDarkMode && 'text-white'}`}>
                {user && user.role === "student" && (
                  <div className="flex items-center cursor-pointer w-fit">
                    <User2 />
                    <Button variant="link">
                      <Link to="/profile" className={isDarkMode && 'text-white'}>View Profile</Link>
                    </Button>
                  </div>
                )}
                <div className="flex items-center cursor-pointer w-fit">
                  <LogOut />
                  <Button className={isDarkMode && 'text-white'} onClick={logoutHandler} variant="link">
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
  
        {/* Dark Mode Toggle */}
        <Button
          onClick={toggleDarkMode}
          className="p-4 rounded-full  dark:hover:bg-gray-700"
        >
          {isDarkMode ? <Sun /> : <Moon />}
        </Button>
      </div>
  
      {/* Mobile Hamburger Menu */}
      <div className="md:hidden flex items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="link" className="text-lg">
              <Menu />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <ul className="flex flex-col gap-4">
              {user && user.role === 'recruiter' ? (
                <>
                  <li><Link to="/admin/companies">Companies</Link></li>
                  <li><Link to="/admin/jobs">Jobs</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/jobs">Jobs</Link></li>
                  <li><Link to="/browse">Browse</Link></li>
                </>
              )}
  
              {!user ? (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/signup">Signup</Link></li>
                </>
              ) : (
                <>
                  {user.role === "student" && (
                    <li><Link to="/profile">View Profile</Link></li>
                  )}
                  <li>
                    <button onClick={logoutHandler}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </div>
  
  

  );
};

export default Navbar;
