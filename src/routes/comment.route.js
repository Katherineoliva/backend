import { createCommentController } from "../controllers/comment.controller.js";
import { Router } from "express";

const commentRoute = Router();

commentRoute.post("/", createCommentController);


export default commentRoute;