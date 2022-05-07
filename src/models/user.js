import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
require("dotenv").config();
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
   role: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        },
    },
    address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        minlength: 6,
    },
    photo: {
        type: String,
        required: false,
        default: "https://res.cloudinary.com/dzqbzqgqw/image/upload/v1599098981/default_user_profile_image_xqjqjy.png",
    },

    token: {
        type: String,
    },


});

//generating auth token
userSchema.methods.generateAuthToken = async function () {
    const user = this; 
    console.log(user)
    const token = jwt.sign({ _id: user._id.toString(), role: user.role,photo:user.photo,name:user.fullname}, process.env.SECRET_KEY, { expiresIn: '50m' })
    user.token = token
    await user.save();
    return token;
  };
  //find if email and password are exists
  userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    console.log("user found are:",user) 
    if (!user) { 
      throw new Error("user not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("password is incorrect");
    }
    return user;
  };
  //hash the plain text password
  userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  });
  
  const User = mongoose.model("user", userSchema);
  module.exports = User;
  