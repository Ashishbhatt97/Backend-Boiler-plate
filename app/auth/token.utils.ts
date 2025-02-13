import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateAccessToken = (user: { id: string; name: string }) => {
  return jwt.sign(
    { id: user.id, name: user.name },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "15m",
    }
  );
};

export const generateRefreshToken = (user: { id: string }) => {
  return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "7d",
  });
};
