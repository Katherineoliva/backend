import {
  createUndertakingController,
  getUndertakingsController,
  toggleLikeController,
  toogleDitLikeController,
  getUndertakingsForStatusController,
  apporvedOrRejectedController,
  getUndertakingByIdController,
  getUndertakingForUserController,
} from "../controllers/undertaking.controller.js";
import { Router } from "express";
import {
  authMiddleware,
  rolesMiddleware,
} from "../middlewares/auth.middleware.js";

const undertakingRoute = Router();

undertakingRoute.post("/", authMiddleware, createUndertakingController);
undertakingRoute.get("/me", authMiddleware, getUndertakingForUserController);
undertakingRoute.get("/", authMiddleware, getUndertakingsController);
undertakingRoute.get("/:undertakingId", getUndertakingByIdController);
undertakingRoute.patch("/:undertakingId", toggleLikeController);
undertakingRoute.patch(
  "/like/:undertakingId",
  authMiddleware,
  toggleLikeController
);
undertakingRoute.patch(
  "/disLike/:undertakingId",
  authMiddleware,
  toogleDitLikeController
);
undertakingRoute.patch(
  "/status/:undertakingId",
  authMiddleware,
  rolesMiddleware(["admin"]),
  apporvedOrRejectedController
);
undertakingRoute.get(
  "/status/:status",
  authMiddleware,
  getUndertakingsForStatusController
);

export default undertakingRoute;
