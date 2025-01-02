import mongoose, {Schema} from "mongoose";

 const userSchema = new Schema({

    fullname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required:[true, 'Email is required'],
        unique:true
    },
    password:{
        type: String,
        // required:[true, 'Password is required'],
        required: function () {
            // Only require phoneNumber if googleId is not present
            return !this.googleId;
          },
        minlength: [8, 'Password must be at least 8 characters long']
    },
    phoneNumber:{
        type: Number,
        // required:[true, 'Phone number is required'],
        required: function () {
            // Only require phoneNumber if googleId is not present
            return !this.googleId;
          },
    },
    role:{
        type:String,
        enum:['student','recruiter', 'user'],
        required:true,
        default:'user'
    },
    profile:{
        bio:{
            type: String,
        },
        skills:[{type:String}],
        resume:{
            type: String,
        },
        resumeOriginalName:{
            type: String,
        },
       profileImage:{
            type: String,
            default: ""
       },
        company:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'CompanyModel'
        }
     
    },
    googleId: {
        type: String,  // Google ID for OAuth users
        unique: true,  // Ensuring the Google ID is unique in case of multiple logins
      },
  

    
}, {timestamps:true})

// userSchema.methods.AuthToken = function(){
//     const token = jwt.sign({id: this._id}, process.env.SECRET_KEY, {expiresIn: '1d'})
//     return token
// }
// userSchema.methods.comparePassword = async function(password){
//     return await bcrypt.compare(password, this.password)
// }
// userSchema.statics.hashPassword = async function(password){
//     return await bcrypt.hash(password, 10)
// }

export const UserModel = mongoose.model('UserModel', userSchema)