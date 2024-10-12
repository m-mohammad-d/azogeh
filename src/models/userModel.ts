import { model, Schema } from "mongoose";
import validator from "validator";
import { IUser } from "../types";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
    required: [true, "Please enter your email address"],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  active: {
    type: Boolean,
    select: false,
    default: true,
  },

  password: {
    type: String,
    minLength: 8,
    select: false,
    required: [true, "Please enter your password"],
  },
  passwordConfirmation: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (this: IUser, value: string): boolean {
        return value === this.password;
      },
      message: "Passwords are not the same!",
    },
    required: [true, "Please enter your password confirmation"],
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
});

const User = model("User", userSchema);
export default User;
