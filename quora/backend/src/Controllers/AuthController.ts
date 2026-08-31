import { type Request, type Response, type NextFunction } from "express";
import bcrypt from "bcryptjs";

import User from "../models/users.ts";
import { createSecretToken } from "../util/secretToken.ts";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password, username } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "Email or username already exists",
      });

      return;
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Create user
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    // 4. Create JWT
    const token = createSecretToken(user._id.toString());

    // 5. Store JWT in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    // 6. Send safe user data
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
