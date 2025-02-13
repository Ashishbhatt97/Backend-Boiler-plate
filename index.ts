import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./app/routes";
import { setupSwagger } from "./app/config/swagger";
import passport from "./app/config/passport";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const app = express();
const port = process.env.PORT || 3000;

setupSwagger(app);
app.use(passport.initialize()); // Ensure Passport is initialized
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
