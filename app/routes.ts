import { Router } from "express";
import userRoutes from "./users/users.routes";
import authRoutes from "./auth/auth.routes";
const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
