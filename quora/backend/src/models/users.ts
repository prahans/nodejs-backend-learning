import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface Users {
  email: string;
  username: string;
  password: string;
  createdAt: Date;
}

const userSchema = new Schema<Users>({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
  // If password isn't modified, just exit the function early
  if (!this.isModified("password")) return;

  // Hash the password securely
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model<Users>("User", userSchema);

export default User;
