import mongoose, {Schema} from "mongoose";

const applicationSchema = new Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobModel",
        required: true
    },
    applicant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default:"pending"
    }
}, {timestamps: true})

export const ApplicationModel = mongoose.model("ApplicationModel", applicationSchema)