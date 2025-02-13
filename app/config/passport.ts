import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import dotenv from "dotenv";
import { prisma } from "../common/services/prisma";
import { JwtPayload } from "jsonwebtoken";

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, // Use secret for Access Token
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload: JwtPayload, done: any) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwtPayload.id },
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
