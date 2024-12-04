import { createReservationController, createSpaceController, getSpacesController } from "../controllers/space.controller.js";
import { Router } from "express";
import {authMiddleware} from '../middlewares/auth.middleware.js'

const spaceRoute = Router();

spaceRoute.post('/', createSpaceController);
spaceRoute.patch('/reservation/:spaceId', authMiddleware, createReservationController);
spaceRoute.get('/', getSpacesController);

export default spaceRoute;