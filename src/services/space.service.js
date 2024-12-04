import Space from "../models/Space.model.js";
import { spaceErrorCodes } from "../utils/errorCodes/space.errorCodes.js";
import { ServiceError } from "../utils/serviceError.js";

export const createSpace = async (space) => {
    try {
        console.log("aca")
        const newSpace = new Space(space);
        if (!newSpace) throw new ServiceError('Space not created', spaceErrorCodes.SPACE_NOT_CREATED);
        await newSpace.save();
        return newSpace;
    } catch (e) {
        throw new ServiceError(e.message, e.code || spaceErrorCodes.SPACE_ERROR);
    }
}

// export const assignUndertakingToSpace = async (spaceId, undertakingId) => {
//     try {
//         const space = await Space.findById(spaceId);
//         if (!space) throw new ServiceError('Space not found', spaceErrorCodes.SPACE_NOT_FOUND);
//         space.undertaking = undertakingId;
//         await space.save();
//         return space;
//     } catch (e) {
//         throw new ServiceError(e.message, e.code || spaceErrorCodes.SPACE_ERROR);
//     }
// }

// export const dispinibilitySpace = async (spaceId) => {
//     try{
//         const space = await Space.findById(spaceId);
//         if (!space.undertaking) throw new ServiceError('Ocuped space', spaceErrorCodes.SPACE_NOT_DISPONIBILITY);
//         return space;
//     }catch(e){
//         throw new ServiceError(e.message, e.code || spaceErrorCodes.SPACE_ERROR);
//     }
// }

export const reservationSpace = async (spaceId, undertakingId) => {
    try{
        console.log(undertakingId)
        const space = await Space.findById(spaceId);
        if (!space) throw new ServiceError('Space not found', spaceErrorCodes.SPACE_NOT_FOUND);
        if (space.reservedUntil && new Date(space.reservedUntil) > new Date()) {
            throw new Error('Space is already reserved');
        }
        const now = new Date();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
        space.undertaking=undertakingId;
        space.reservedUntil = endOfDay;
        await space.save();
        return space;
    }catch(e){
        throw new ServiceError(e.message, e.code || spaceErrorCodes.SPACE_ERROR);
    }
}


export const getSpaces = async () => {
    try {
        const spaces = await Space.find().populate('undertaking');
        return spaces;
    } catch (e) {
        throw new ServiceError(e.message, e.code || spaceErrorCodes.SPACE_ERROR);
    }
}

export const getSpace = async (spaceId) => {
    try {
        const space = await Space.findById(spaceId);
        if (!space) throw new ServiceError('Space not found', spaceErrorCodes.SPACE_NOT_FOUND);
        return space;
    } catch (e) {
        throw new ServiceError(e.message, e.code || spaceErrorCodes.SPACE_ERROR);
    }
}

export const releaseExpiredSpaces = async () => {
    try {
        const now = new Date();
        const spaces = await Space.find({ reservedUntil: { $lt: now } });
        for (const space of spaces) {
            space.undertaking = null;
            space.reservedUntil = null;
            await space.save();
        }
    } catch (e) {
        throw new ServiceError(e.message, e.code || spaceErrorCodes.SPACE_ERROR);
    }
}