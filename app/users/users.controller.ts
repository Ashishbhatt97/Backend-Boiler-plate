import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { UserService } from "./users.services";
import { createResponse } from "../common/services/createResponse";

export class UserController {
  static register = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserService.registerUser(
      req.body.name,
      req.body.email,
      req.body.password
    );
    res.status(201).json(createResponse("User registered successfully", user));
  });

  static login = asyncHandler(async (req: Request, res: Response) => {
    const { token, user } = await UserService.loginUser(
      req.body.email,
      req.body.password
    );
    res.status(200).json(createResponse("Login successful", { token, user }));
  });

  static getProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserService.getUserById(req.user?.id);
    res
      .status(200)
      .json(createResponse("User profile fetched successfully", user));
  });

  static updateUser = asyncHandler(async (req: Request, res: Response) => {
    const updatedUser = await UserService.updateUser(req.user?.id, req.body);
    res
      .status(200)
      .json(createResponse("User updated successfully", updatedUser));
  });

  static changePassword = asyncHandler(async (req: Request, res: Response) => {
    await UserService.changePassword(
      req.user?.id,
      req.body.oldPassword,
      req.body.newPassword
    );
    res.status(200).json(createResponse("Password changed successfully"));
  });

  static changeEmail = asyncHandler(async (req: Request, res: Response) => {
    await UserService.changeEmail(req.user?.id, req.body.newEmail);
    res.status(200).json(createResponse("Email changed successfully"));
  });

  static deleteUser = asyncHandler(async (req: Request, res: Response) => {
    await UserService.deleteUser(req.user?.id);
    res.status(200).json(createResponse("User deleted successfully"));
  });
}
