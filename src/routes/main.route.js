import { Router } from "express";
import authRoute from "./auth.route.js";
import undertakingRoute from "./undertaking.route.js";
import commentRoute from "./comment.route.js";
import userRoute from "./user.route.js";
import eventRouter from "./event.router.js";
import productRouter from "./product.route.js";
import spaceRoute from "./space.route.js";

const mainRoute = Router();

mainRoute.use("/auth", authRoute);
mainRoute.use("/undertaking", undertakingRoute);
mainRoute.use("/comment", commentRoute);
mainRoute.use("/user", userRoute);
mainRoute.use("/event", eventRouter);
mainRoute.use("/product", productRouter);
mainRoute.use("/space", spaceRoute);

export default mainRoute;
