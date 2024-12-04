import { getMeController } from "../controllers/user.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRoute = Router();

// authRoute.post('/login', loginController);
userRoute.get('/me', authMiddleware,  getMeController);

export default userRoute;