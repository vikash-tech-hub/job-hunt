import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radio-group";
import { Link } from "react-router-dom";

const Signup = () => {
  const [input,setInput]=useState({
      fullname:"",
      email:"",
      phoneNumber:"",
      password:"",
      role:"",
      file:""
    });
    const changeEventHandler = (e) => {
    setInput({
      ...input, // pehle pura input object spread karo
      [e.target.name]: e.target.value, // fir specific field ko update karo
    });
  };
  const changeFileHandler=(e) =>{
  setInput({...input,
    file:e.target.files?.[0]
  });
}
const submithandler=async(e)=>{
  e.preventDefault();
  try {
    const res=await axios.post('${USER_API_END_POINT}/register')
  } catch (error) {
    
  }
}
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submithandler} className="w-1/2 border border-gray-300 rounded-md p-6 my-10 shadow-sm">
          <h1 className="font-bold text-2xl mb-5 text-center">Sign Up</h1>

          {/* Full Name */}
          <div className="my-3">
            <Label htmlFor="fullname">Full Name</Label>
            <Input id="fullname" type="text" placeholder="John Doe"
            value={input.fullname}
            name="fullname"
            onChange={changeEventHandler}/>
          </div>

          {/* Email */}
          <div className="my-3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="example@mail.com"
            value={input.email}
            name="email"
            onChange={changeEventHandler}/> 
          </div>
          {/* phone no */}
          <div className="my-3">
            <Label htmlFor="phone no">Phone no</Label>
            <Input id="phone no " type="phone no " placeholder="8956232363"
            value={input.phoneNumber}
            name="phoneNumber"
            onChange={changeEventHandler} />
          </div>

          {/* Password */}
          <div className="my-3">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="********" 
            value={input.password}
            name="password"
            onChange={changeEventHandler}/>
          </div>

          <div className="flex  items-center justify-between">

            <RadioGroup defaultValue="option-one " className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <input
                type="radio"
                name="role"
                value="student"
                checked={input.role=="student"}
                onChange={changeEventHandler}
                className="cursor-pointer"/>
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role=="recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer"/>
                <Label htmlFor="option-two">Recuiter</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-2">
            <Label>Profile</Label>
            <Input
            accept="image/*
            "
            type="file"
            onChange={changeFileHandler}
            className="cursor-pointer"/>
            
          </div>

      

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-4">
            Sign Up
          </Button>
          <span>Already have an account ? <Link to="/login" className="text-blue-600">Login</Link> </span>
        </form>
      </div>

    </div>
  );
};

export default Signup;
