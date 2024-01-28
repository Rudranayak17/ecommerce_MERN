import bcrypt from "bcrypt";
import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";


export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    };
    otp: Number|null;
    otp_expiry: Date | null;
    role: string;
    resetPasswordOTP: number|null;
    resetPasswordOTPExpiry: Date|null;
    getJWTToken(): string;
    verified: boolean;

}


const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            maxlength: [30, "Name cannot exceed more than 30 character"],
            minlength: [3, "Name atleast 3 or more than 3 character"]
        },
        email: {
            type: String,
            required: [true, "Please enter your email id"],
            unique: true,
            validate: [validator.isEmail, "please enter vaild email"]
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
            minlength: [8, "Password must be more than 8"],
            select: false

        },
        avatar: {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },

        role: {
            type: String,
            default: "user",
        },
        verified: {
            type: Boolean,
            default: false
        },
        otp: {
            type: Number,
            default: null
        },
        otp_expiry: {
            type: Date,
            default: null
        },
        resetPasswordOTP: {
            type: Number,
            default: null
        },

        resetPasswordOTPExpiry: {
            type: Date,
            default: null
        },
    },
    {
        timestamps: true, // thsi will add "createdAt" and "UpdatedAt" fields
    }
);

userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function (this: IUser) {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string)
}
userSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 });
userSchema.index({ resetPasswordOTPExpiry: 1 }, { expireAfterSeconds: 0 });

const User = mongoose.model<IUser>("User", userSchema)
export default User

