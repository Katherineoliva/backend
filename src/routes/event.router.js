import e, { Router } from "express";
import {
  createEventController,
  getEventsController,
  reservationController
} from "../controllers/event.controller.js";

const eventRouter = Router();

eventRouter.patch("/reservation/:eventId", reservationController);
eventRouter.post("/", createEventController);
eventRouter.get("/", getEventsController);

export default eventRouter;
