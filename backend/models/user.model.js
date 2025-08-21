import express from "express";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    Fullname:{
        type: String,
        required: true,
    
    },
    email:{
        type: String,
        required: true,
        unique: true,
    
    },
    PhoneNumber:{
        type: Number,
        required: true,
    
    },
    password:{
        type: String,
        required: true,
    
    },
    role:{
        type: String,
        enum: ['student', 'recruiter'],
        required: true,
    },
    profile:{
        bio:{type:String},
        skills:{type:String},
        resume:{type:String},
        resumeoriginalname:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref: 'Company'},
        profilephoto:{
            type: String,
            default: '',
        }

    },
},{ timestamps: true });
export default mongoose.model('User', userSchema);
      