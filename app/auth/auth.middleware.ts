import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", { session: false }, (err: any, user: User) => {
    console.log(user);
    
    if (err || !user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};
