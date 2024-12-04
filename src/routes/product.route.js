import { Router } from "express";
import { createProductController } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post("/", createProductController);

export default productRouter;