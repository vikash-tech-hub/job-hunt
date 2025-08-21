import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = false; // toggle this to true for logged-in view

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-6">
        {/* Left Side Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#f83002]">Portal</span>
          </h1>
        </div>

        {/* Right Side Menu */}
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-8">
            <li className="cursor-pointer hover:text-[#f83002]">Home</li>
            <li className="cursor-pointer hover:text-[#f83002]">Jobs</li>
            <li className="cursor-pointer hover:text-[#f83002]">Browse</li>
          </ul>

          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b06ee]">Signup</Button></Link>
              
              
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Vikash MERN Stack</h4>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col text-gray-800">
                  <Button
                    variant="link"
                    className="flex items-center gap-2 w-fit "
                  >
                    <User2 className="h-4 w-4" />
                    View Profile
                  </Button>

                  <Button
                    variant="link"
                    className="flex items-center gap-2 w-fit "
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
