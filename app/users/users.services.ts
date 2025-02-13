import { prisma } from "../common/services/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export class UserService {
  static async registerUser(name: string, email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
  }

  static async loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return { token, user };
  }

  static async getUserById(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");
    return user;
  }

  static async updateUser(
    userId: string,
    updateData: Partial<{ name: string }>
  ) {
    return await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }

  static async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new Error("Old password is incorrect");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  static async changeEmail(userId: string, newEmail: string) {
    const existingUser = await prisma.user.findUnique({
      where: { email: newEmail },
    });
    if (existingUser) throw new Error("Email is already taken");

    return await prisma.user.update({
      where: { id: userId },
      data: { email: newEmail },
    });
  }

  static async deleteUser(userId: string) {
    return await prisma.user.delete({ where: { id: userId } });
  }
}
