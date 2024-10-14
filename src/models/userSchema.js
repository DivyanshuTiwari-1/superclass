import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,


    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        default: "pcm"
    },
    isPCM: {
        type: Boolean,
        default: "true",

    },
    paymentdone: {
        type: Boolean,
        default: "false"
    },
    role: {
        type: String,
        default: "student"
    },
    orderId:{
        type:"string",
        default:"NUll"
    },
    paymentId:{
        type:"string",
        default:"NUll"
    }




})

export const userModel = mongoose.models.user || mongoose.model('user', userSchema);