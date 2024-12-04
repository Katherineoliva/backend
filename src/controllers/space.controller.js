import { createSpace, getSpaces, getSpace } from "../services/space.service.js";
import { spaceErrorCodes } from "../utils/errorCodes/space.errorCodes.js";
import createError from "http-errors";

export const createSpaceController = async (req, res, next) => {
    try {
        console.log("aca 1")
        const space = await createSpace(req.body);
        res.status(201).json(space);
    } catch (err) {
        switch (err.code) {
            case spaceErrorCodes.SPACE_NOT_CREATED:
                next(createError(500, 'Space not created'));
                break;
            case spaceErrorCodes.SPACE_ERROR:
                next(createError(500, 'Space error'));
                break;
            default:
                next(createError(err.status, err.message));
        }
        console.log(err)
    }
}

export const createReservationController = async (req, res, next) => {
    try {
        const space = await getSpace(req.params.spaceId);

        if (space.reservedUntil && new Date(space.reservedUntil) > new Date()) {
            next(createError(409, 'Space is already reserved'));
        }
        const now = new Date();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
        space.undertaking = req.body.undertakingId;
        space.reservedUntil = endOfDay;
        await space.save();
        res.status(200).json(space);
    } catch (err) {
        switch (err.code) {
            case spaceErrorCodes.SPACE_NOT_FOUND:
                next(createError(404, 'Space not found'));
                break;
            case spaceErrorCodes.SPACE_ERROR:
                next(createError(500, 'Space error'));
                break;
            default:
                next(err);
        }
    }
}

export const getSpacesController = async (req, res, next) => {
    try {
        const spaces = await getSpaces();
        res.status(200).json(spaces);
    } catch (err) {
       next(err)
    }
}