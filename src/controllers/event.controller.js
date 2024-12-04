import createHttpError from "http-errors";
import { getEvents, saveEvent, reserveSpace } from "../services/event.service.js";
import { eventErrorCodes } from "../utils/errorCodes/event.errorCodes.js";

export const createEventController = async (req, res, next) => {
  try {
    const { name, description, quotas, location, date, time } = req.body;
    const newEvent = await saveEvent(
      name,
      description,
      quotas,
      location,
      date,
      time
    );
    res.status(201).json(newEvent);
  } catch (e) {
    switch (e.code) {
      case eventErrorCodes.EVENT_ERROR:
        next(createHttpError(500, "Event not created"));
        break;
      default:
        next(e);
    }
  }
};

export const getEventsController = async (req, res, next) => {
  try {
    const events = await getEvents();
    res.status(200).json(events);
  } catch (e) {
    switch (e.code) {
      case eventErrorCodes.EVENT_ERROR:
        next(createHttpError(500, "Event not created"));
        break;
      default:
        next(e);
    }
  }
};

export const reservationController = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { space, undertakingId } = req.body;
    const event = await reserveSpace(eventId, space, undertakingId);  
    res.status(200).json(event);
  } catch (e) {
    switch (e.code) {
      case eventErrorCodes.EVENT_ERROR:
        next(createHttpError(500, "Event not created"));
        break;
      default:
        next(e);
    }
  }
}
