import { loginController } from "../controllers/auth.controller.js";
import { Router } from "express";

const authRoute = Router();

authRoute.post('/login', loginController);

export default authRoute;
