import bcrypt from "bcryptjs";
import { prisma } from "../common/services/prisma";
import { generateAccessToken, generateRefreshToken } from "./token.utils";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

  return {
    message: "Login Successful",
    user,
    token: {
      accessToken,
      refreshToken,
    },
  };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const user = await prisma.user.findFirst({ where: { refreshToken } });
  if (!user) throw new Error("Invalid refresh token");

  return generateAccessToken(user);
};

export const logoutUser = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
};
