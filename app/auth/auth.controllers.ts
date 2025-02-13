import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "./auth.services";

export const registerHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    res.status(201).json({ message: "User registered successfully", user });
  }
);

export const loginHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    
    const tokens = await loginUser(email, password);
    res.json(tokens);
  }
);

export const refreshTokenHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { token } = req.body;
    const accessToken = await refreshAccessToken(token);
    res.json({ accessToken });
  }
);

export const logoutHandler = asyncHandler(
  async (req: Request, res: Response) => {
    await logoutUser(req.user?.id);
    res.json({ message: "Logged out successfully" });
  }
);
