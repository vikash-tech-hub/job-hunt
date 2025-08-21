import e from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from '../models/user.model.js';

// REGISTER
export const register = async (req, res) => {
  try {
    const { fullname, email, password, role, PhoneNumber } = req.body;

    if (!fullname || !email || !password || !role || !PhoneNumber) {
      return res.status(400).json({
        message: "Some thing is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      Fullname: fullname,
      email,
      password: hashedPassword,
      role,
      PhoneNumber
    });

    return res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Some thing is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const userData = {
      _id: user._id,
      Fullname: user.Fullname,
      email: user.email,
      PhoneNumber: user.PhoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.Fullname}`,
        user: userData,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Logged out successfully",
        success: true,
      });
  } catch (error) {
    console.error(error);
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, PhoneNumber, bio, skills } = req.body;
    const file = req.file;
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }


    const userId = req.id;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (fullname) user.Fullname = fullname;
    if (email) user.email = email;
    if (PhoneNumber) user.PhoneNumber = PhoneNumber;
    if (skills) user.profile.skills = skillsArray;
    if (bio) user.profile.bio = bio;







    // Resume upload logic comes later here

    await user.save();

    const updatedUser = {
      _id: user._id,
      Fullname: user.Fullname,
      email: user.email,
      PhoneNumber: user.PhoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};
