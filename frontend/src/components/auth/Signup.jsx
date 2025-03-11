import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Loader, LucideLoader2 } from "lucide-react";
import { setLoading } from "@/redux/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import Navbar from "../shared/Navbar";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value }); // name yeahpar jho hai wo lable ko kaha gaya hai
  };

  const fileHandle = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("fullname", input.fullname);
    formdata.append("email", input.email);
    formdata.append("phoneNumber", input.phoneNumber);
    formdata.append("password", input.password);
    formdata.append("role", input.role);
    formdata.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        // console.log(response.data)
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        toast.error(error.response.data.message || "Registration failed");
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response from server");
      } else {
        // Something happened in setting up the request
        toast.error("Error in registration");
      }
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
  <Navbar />
  <div className="flex justify-center items-center px-4 sm:px-1 lg:px-8">
    <form
      onSubmit={submitHandler}
      className="w-[400px]  bg-gray-800 text-white border border-gray-700 rounded-lg p-6 shadow-md"
    >
      <h1 className="font-bold text-2xl text-center mb-5">Signup</h1>

      <div className="space-y-4">
        <div>
          <Label className="text-sm sm:text-base">Full Name</Label>
          <Input
            type="text"
            value={input.fullname}
            onChange={handleInput}
            name="fullname"
            className="mt-1.5 w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <Label className="text-sm sm:text-base">Email</Label>
          <Input
            type="email"
            value={input.email}
            onChange={handleInput}
            name="email"
            className="mt-1.5 w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your Email"
          />
        </div>

        <div>
          <Label className="text-sm sm:text-base">Password</Label>
          <Input
            type="password"
            className="mt-1.5 w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={input.password}
            onChange={handleInput}
            name="password"
            placeholder="Password"
          />
        </div>

        <div>
          <h1 className="text-md font-medium">Role</h1>
          <RadioGroup className="flex items-center gap-4">
            <div className="flex items-center">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={handleInput}
                className="cursor-pointer"
              />
              <Label className="text-sm ml-2">Student</Label>
            </div>
            <div className="flex items-center">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={handleInput}
                className="cursor-pointer"
              />
              <Label className="text-sm ml-2">Recruiter</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="text-sm sm:text-base">Profile</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={fileHandle}
            className="mt-1.5 w-full cursor-pointer bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? (
          <LucideLoader2 className="animate-spin mr-2 h-4 w-4" />
        ) : (
          "Signup"
        )}
      </Button>

      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-600"></div>
        <span className="px-4 text-gray-400">OR</span>
        <div className="flex-1 h-px bg-gray-600"></div>
      </div>

      <div className="w-full flex justify-center">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            // console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        />
      </div>

      <p className="text-center text-sm mt-5 text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </form>
  </div>
</div>

  );
};

export default Signup;
