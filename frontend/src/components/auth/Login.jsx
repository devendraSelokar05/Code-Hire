import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { LucideLoader2 } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Navbar from "../shared/Navbar";
import { BASE_URL } from "@/lib/config";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value }); // name yeahpar jho hai wo lable ko kaha gaya hai
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(input)

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${BASE_URL}/users/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        // console.log(response.data)
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    // console.log(credentialResponse);
    try {
      // Extract the token from the Google response
      const token = credentialResponse.credential;
  
      // Debugging the token
      // console.log("Google Token:", token);
  
      // Send the token to the backend
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/googleLogin`,
        { token }, // Send token in the request body
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include cookies if necessary
        }
      );
  
      // Handle the response from the backend
      console.log(response);
      if (response.data.success) {
        // Set user in the state and navigate
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Google login failed");
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
          className="w-[400px] bg-gray-800 mt-6 sm:mt-6 text-white border border-gray-700 rounded-lg p-6 shadow-md"
        >
          <h1 className="font-bold text-2xl text-center mb-5">Login</h1>

          <div className="space-y-4">
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
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? (
              <LucideLoader2 className="animate-spin mr-2 h-4 w-4" />
            ) : (
              "Login"
            )}
          </Button>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="px-4 text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          <div className="w-full flex justify-center">
          <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log("Login Failed");
                toast.error("Google Login failed");
              }}
       
            />
          </div>

          <p className="text-center text-sm mt-5 text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
