import { model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "../types";
import crypto from "node:crypto";
import ms from "ms";

const userSchema = new Schema<IUser>(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

//////////// Instance Methods ////////////

userSchema.methods.signToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

userSchema.methods.correctPassword = async function (this: IUser, candidate_password: string) {
  return await bcrypt.compare(candidate_password, this.password);
};

userSchema.methods.changePasswordAfter = function (this: IUser, jwtTimeStamp: number) {
  return this.passwordChangedAt ? this.passwordChangedAt.getTime() / 1000 >= jwtTimeStamp : false;
};

userSchema.methods.createPasswordResetToken = function (this: IUser) {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.passwordResetExpires = Date.now() + ms("10m");
  return resetToken;
};

//////////// Query Middleware ////////////

// userSchema.pre(/^find/, function (next) {
//   this.find({ active: { $ne: false } });
//   next();
// });

//////////// Document Middleware ////////////

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirmation = undefined;
    return next();
  }
  return next();
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password") && !this.isNew) {
    let currentTime = new Date();
    currentTime.setSeconds(currentTime.getSeconds() - 2);
    this.passwordChangedAt = currentTime;
    return next();
  }
  return next();
});

const User = model<IUser>("User", userSchema);
export default User;
