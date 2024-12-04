import Event from "../models/event.model.js";
import { eventErrorCodes } from "../utils/errorCodes/event.errorCodes.js";
import { ServiceError } from "../utils/serviceError.js";

export const saveEvent = async (
  name,
  description,
  quotas,
  location,
  date,
  time
) => {
  try {
   
    const spaces = Array.from({ length: quotas }, (_, index) => ({
      value: index + 1, 
      status: false, 
    }));

    const newEvent = new Event({
      name,
      description,
      quotas,
      location,
      date,
      time,
      spaces,
    });

    if (!newEvent)
      throw new ServiceError(
        "Event not created",
        eventErrorCodes.EVENT_NOT_CREATED
      );

    await newEvent.save();
    return newEvent;
  } catch (e) {
    console.log(e);

    throw new ServiceError(e.message, e.code || eventErrorCodes.EVENT_ERROR);
  }
};


export const getEvents = async () => {
  try {
    const events = (await Event.find()) || [];
    return events;
  } catch (e) {
    throw new ServiceError(e.message, e.code || eventErrorCodes.EVENT_ERROR);
  }
};

export const getEventById = async (EventId) => {
  try {
    const event = await Event.findById(EventId);
    if (!event)
      throw new ServiceError(
        "Event not found",
        eventErrorCodes.EVENT_NOT_FOUND
      );
    return event;
  } catch (e) {
    throw new ServiceError(e.message, e.code || eventErrorCodes.EVENT_ERROR);
  }
};

export const deleteEvent = async (EventId) => {
  try {
    const event = await Event.findByIdAndDelete(EventId);
    if (!event)
      throw new ServiceError(
        "Event not found",
        eventErrorCodes.EVENT_NOT_FOUND
      );
    return event;
  } catch (e) {
    throw new ServiceError(e.message, e.code || eventErrorCodes.EVENT_ERROR);
  }
};

export const updateEvent = async (
  eventId,
  name,
  description,
  quotas,
  location,
  date
) => {
  try {
    const event = await Event.findByIdAndUpdate(
      eventId,
      { name, description, quotas, location, date },
      { new: true }
    );
    if (!event)
      throw new ServiceError(
        "Event not found",
        eventErrorCodes.EVENT_NOT_FOUND
      );
    return event;
  } catch (e) {
    throw new ServiceError(e.message, e.code || eventErrorCodes.EVENT_ERROR);
  }
};


export const reserveSpace = async (eventId, spaceNumber, undertakingId) => {
  try {
    const event = await Event.findById(eventId);
    
    if (!event) {
      throw new ServiceError("Event not found", eventErrorCodes.EVENT_NOT_FOUND);
    }

    if(event.undertaking.includes(undertakingId)){
      throw new ServiceError("Ya tienes un reserva en este evento", eventErrorCodes.UNDERTAKING_ALREADY_RESERVED);
    }

    const space = event.spaces.find(s => s.value === spaceNumber);

    if (!space) {
      throw new ServiceError("Space not found", eventErrorCodes.SPACE_NOT_FOUND);
    }

    if (space.state === true) {
      throw new ServiceError("Space is already reserved", eventErrorCodes.SPACE_ALREADY_RESERVED);
    }

    space.state = true;
    event.undertaking.push(undertakingId);

    await event.save();

    return { message: "Space reserved successfully", space };
  } catch (error) {
    console.error(error);
    throw new ServiceError(error.message, error.code || eventErrorCodes.EVENT_ERROR);
  }
};

