import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
import { OAuth2Client } from "google-auth-library";

//register
export const register = async(req, res)=>{
try {
    const{fullname,email,password,phoneNumber,role} = req.body
    // console.log(fullname,email,password,phoneNumber,role)
    //validation
    if(!fullname || !email || !password || !phoneNumber || !role){
        return res.status(400).json({
            message:"All fields are required",
            success:false
        })

    }

    //cloudinary
    const file = req.file
    const fileUri = getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

    //check user
    const IsuserExist = await UserModel.findOne({email})

    //response
    if(IsuserExist){
        return res.status(400).json({
            message:"User already exists with the email",
            success:false
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    //create user
    const user = await UserModel.create({
        fullname,
        email,
        password:hashedPassword,
        phoneNumber,
        role,
        profile:{
            profileImage:cloudResponse.secure_url
        }
    })
    res.status(201).json({
        message:"User registered successfully",
        success:true,
        user:user
    })
} catch (error) {
    res.status(500).json({
        message:error.message,
        success:false
    })}

}

export const login = async(req, res)=>{
    try {
        const{email,password, role} = req.body
        // console.log(email,password, role)
        //validaton
        if(!email || !password || !role){
            return res.status(400).json({
                message:"All fields are required",
                success:false
            })
        }
        //check user 
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"User does not exist",
                success:false
            })
        }
        //check password
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Invalid credentials",
                success:false
            })
        }

        //check role
        if(role !== user.role){
            return res.status(400).json({
                message:"Account does not exist with current role",
                success:false
            })
        }
        //create token
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn:"1d"})
     
        
        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        res.status(200).cookie("token", token,{
            maxAge:24*60*60*1000,
            httpOnly:true,
            secure:true
        }).json({
            message:`Welcome back ${user.fullname}`,
            success:true,
            user:userResponse,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}

// export const googleLogin = async (req, res) => {
//     try {
//       const { token } = req.body; // Google JWT token
//       if (!token) {
//         return res.status(400).json({
//           message: "Token is required",
//           success: false,
//         });
//       }
  
//       // Create a new OAuth2Client with your Google client ID
//       const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  
//       // Verify the token
//       const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.GOOGLE_CLIENT_ID,
//       });
  
//       const payload = ticket.getPayload();
      
//       const fullname = payload.name;
//       const picture = payload.picture;
//       const googleId = payload.sub;
//       const email = payload.email;
  
//       // Check if the user already exists
//       let user = await UserModel.findOne({ googleId });
  
//       if (!user) {
//         // Create a new user
//         user = await UserModel.create({
//           fullname,
//           email,
//           googleId,
//           profile: {
//             profileImage: picture,
//           },
//         });
//       }
  
//       // Create a token for session
//       const tokenData = { userId: user._id };
//       const jwtToken = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });
  
//       res.status(200).cookie("token", jwtToken, {
//         maxAge: 24 * 60 * 60 * 1000,
//         httpOnly: true,
//         secure: true,
//       }).json({
//         message: "Logged in successfully",
//         success: true,
//         user,
//         token: jwtToken,
//       });
//     } catch (error) {
//       console.error("Google Login Error:", error);
//       res.status(500).json({
//         message: "Authentication failed",
//         success: false,
//         error: error.message
//       });
//     }
//   };

export const googleLogin = async (req, res) => {
    try {
      const { token } = req.body; // Google JWT token
      if (!token) {
        return res.status(400).json({
          message: "Token is required",
          success: false,
        });
      }
  
      // Create a new OAuth2Client with your Google client ID
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  
      // Verify the token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
  
      const payload = ticket.getPayload();
      
      const fullname = payload.name;
      const picture = payload.picture;
      const googleId = payload.sub;
      const email = payload.email;
  
      // Check if the user already exists
      let user = await UserModel.findOne({ googleId });
  
      if (!user) {
        // Create a new user
        user = await UserModel.create({
          fullname,
          email,
          googleId,
          profile: {
            profileImage: picture, // Ensure this matches the Navbar's expectation
          },
        });
      } else {
        // Update existing user's profile image if it's different
        if (user.profile.profileImage !== picture) {
          user.profile.profileImage = picture;
          await user.save();
        }
      }
  
      // Create a token for session
      const tokenData = { userId: user._id };
      const jwtToken = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });
  
      res.status(200).cookie("token", jwtToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      }).json({
        message: "Logged in successfully",
        success: true,
        user,
        token: jwtToken,
      });
    } catch (error) {
      console.error("Google Login Error:", error);
      res.status(500).json({
        message: "Authentication failed",
        success: false,
        error: error.message
      });
    }
  };

export const updateProfile = async(req, res)=>{
    try {
        const{fullname, phoneNumber,bio, skills} = req.body
        //validation
       
        const file = req.file
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
      
        let skillsArray;
        if(skills){
            skillsArray = skills.split(",")
        }
        const userId = req.id
        const user = await UserModel.findById(userId)
        if(!user){
            return res.status(400).json({
                message:"User does not exist",
                success:false
            })
        };

        if(fullname) user.fullname = fullname
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        //reumse comes later here...

        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url //cloudinary url
            user.profile.resumeOriginalName = file.originalname //save the original file name
            
        }

        await user.save()
       const updatedResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        res.status(200).json({
            message:"User profile updated successfully",
            success:true,
            user:updatedResponse
        })

        
    }catch (error) {
        console.log(error)
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}

//logout
export const logout = async(req, res)=>{
    try {
        res.status(200).clearCookie("token").json({
            message:"User logged out successfully",
            success:true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}