import createError from "http-errors";
import {
  saveUndertaking,
  getUndertakings,
  toggleLike,
  toggleDislike,
  undertakingForState,
  toggleStateUndertaking,
  getUndertakingById,
  getUndertakingForUser,
} from "../services/undertaking.service.js";
import { getUser } from "../services/user.service.js";
import { undertakingErrorCodes } from "../utils/errorCodes/undertaking.errorCodes.js";
import { userErrorCodes } from "../utils/errorCodes/user.errorCodes.js";

export const createUndertakingController = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { name, description, image } = req.body;
    await getUser(id);

    const undertaking = await saveUndertaking(name, description, id, image);
    res.status(201).json(undertaking);
  } catch (err) {
    switch (err.code) {
      case undertakingErrorCodes.UNDERTAKING_ERROR:
        next(createError(500, "Undertaking not created"));
        break;
      case userErrorCodes.USER_NOT_FOUND:
        next(createError(404, err.message));
        break;
      case undertakingErrorCodes.UNDERTAKING_ALREADY_EXIST:
        next(createError(409, err.message));
        break;
      default:
        next(err);
    }
    console.log(err);
  }
};

export const toggleLikeController = async (req, res, next) => {
  try {
    const { undertakingId } = req.params;
    const { id } = req.user;
    const undertaking = await toggleLike(undertakingId, id);
    res.status(200).json(undertaking);
  } catch (e) {
    switch (e) {
      case undertakingErrorCodes.UNDERTAKING_ERROR:
        next(createError(500, "Error like"));
        break;
      default:
        next(e);
    }
  }
};

export const toogleDitLikeController = async (req, res, next) => {
  try {
    const { undertakingId } = req.params;
    const { id } = req.user;
    const undertaking = await toggleDislike(undertakingId, id);
    res.status(200).json(undertaking);
  } catch (e) {
    switch (e) {
      case undertakingErrorCodes.UNDERTAKING_ERROR:
        next(createError(500, "Error dislike"));
        break;
      default:
        next(e);
    }
  }
};

export const getUndertakingsController = async (req, res, next) => {
  try {
    const undertaking = await getUndertakings();
    res.status(200).json(undertaking);
  } catch (e) {
    switch (e.code) {
      default:
        next(e);
    }

    console.error(e);
  }
};

export const getUndertakingsForStatusController = async (req, res, next) => {
  try {
    const { status } = req.params;
    const undertaking = await undertakingForState(status);
    res.status(200).json(undertaking);
  } catch (e) {
    switch (e.code) {
      default:
        next(e);
    }
    console.log(e);
  }
};

export const apporvedOrRejectedController = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { undertakingId } = req.params;
    const undertaking = await toggleStateUndertaking(undertakingId, status);
    res.status(200).json(undertaking);
  } catch (err) {
    switch (err.code) {
      case undertakingErrorCodes.UNDERTAKING_ERROR:
        next(createError(500, "Error updating status"));
        break;
      default:
        next(err);
    }

    console.error(err);
  }
};

export const getUndertakingByIdController = async (req, res, next) => {
  try {
    const { undertakingId } = req.params;
    const undertaking = await getUndertakingById(undertakingId);
    res.status(200).json(undertaking);
  } catch (e) {
    switch (e.code) {
      case undertakingErrorCodes.UNDERTAKING_ERROR:
        next(createError(500, "Error getting undertaking"));
        break;
      default:
        next(e);
    }
    console.log(e);
  }
};

export const getUndertakingForUserController = async (req, res, next) => {
  try {
    const { id } = req.user;
    console.log("aca esta el id: ", id);
    const undertaking = await getUndertakingForUser(id);
    res.status(200).json(undertaking);
  } catch (e) {
    switch (e.code) {
      case undertakingErrorCodes.UNDERTAKING_ERROR:
        next(createError(500, "Error getting undertaking"));
        break;
      default:
        next(e);
    }
    console.log(e);
  }
};
