import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface User {
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date; // Added because timestamps are enabled
}

const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: [true, "Your email address is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Your username is required"],
      unique: true, // Crucial for user accounts
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Your password is required"],
    },
  },
  {
    // 3. Use Mongoose timestamps instead of hardcoding createdAt
    timestamps: true,
  },
);

const User = mongoose.model<User>("User", userSchema);

export default User;
