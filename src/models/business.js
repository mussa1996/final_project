import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
require("dotenv").config();
const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    owner_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
    },
    category: {
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
    },
    website: {
        type: String,
        required: false,
    },
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    rating: {
        type: Number, 
        required: false, 
    },
    award:[ 
        {
            type:Object ,
            required:false,
 
        }],
    

    isVerified: {
        type: Boolean,
        default: true,
    },

    token: {
        type: String,
    },


    role: {
        type: String,
        required: true,


    },
});
//generating auth token
businessSchema.methods.generateAuthToken = async function() {
        const business = this
        const token = jwt.sign({ _id: business._id.toString(), role: business.role,photo:business.photo,name:business.name}, process.env.SECRET_KEY, { expiresIn: '50m' })

        business.token = token
        await business.save();
        return token
    }
    //find if email and password are exists
businessSchema.statics.findByCredentials = async(email, password) => {
        const business = await Business.findOne({ email })
            //console.log(business)
        if (!business) {
            throw new Error('unable to login')
        }
        if (business.isVerified === false) {
            throw new Error('Account not verified')
        }
        const isMatch = await bcrypt.compare(password, business.password)

        if (!isMatch) {
            throw new Error("password or email is incorrect")
        }
        return business
    }
    //hash the plain text password
businessSchema.pre('save', async function(next) {
    const business = this
    if (business.isModified('password')) {
        business.password = await bcrypt.hash(business.password, 8)
    }
    next()
})
const Business = mongoose.model('business', businessSchema)
module.exports = Business;