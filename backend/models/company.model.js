import mongoose, {Schema} from "mongoose";

const companySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String, 
    },
    website:{
        type:String 
    },
    location:{
        type:String 
    },
    logo:{
        type:String // URL to company logo
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserModel',
        required:true
    }
}, {timestamps: true})

export const CompanyModel = mongoose.model("CompanyModel", companySchema)