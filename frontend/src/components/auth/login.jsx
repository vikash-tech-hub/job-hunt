import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radio-group";
import { Link } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({

    email: "",
    password: "",
    role: "",
  });
  const changeEventHandler = (e) => {
    setInput({
      ...input, // pehle pura input object spread karo
      [e.target.name]: e.target.value, // fir specific field ko update karo
    });
  };

  const submithandler=async(e)=>{
  e.preventDefault();
  console.log(input)
}
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submithandler}className="w-1/2 border border-gray-300 rounded-md p-6 my-10 shadow-sm">
          <h1 className="font-bold text-2xl mb-5 text-center">Login</h1>



          {/* Email */}
          <div className="my-3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="example@mail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler} />
          </div>


          {/* Password */}
          <div className="my-3">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="********"
              value={input.password}
              name="password"
              onChange={changeEventHandler} />
          </div>

          <div className="flex  items-center justify-between">

            <RadioGroup defaultValue="option-one " className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role == "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer" />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role == "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer" />
                <Label htmlFor="option-two">Recuiter</Label>
              </div>
            </RadioGroup>
          </div>




          {/* Submit Button */}
          <Button type="submit" className="w-full mt-4">
            Login
          </Button>
          <span>Don't have an account ? <Link to="/signup" className="text-blue-600">Sign up</Link> </span>
        </form>
      </div>

    </div>
  );
};

export default Login;
