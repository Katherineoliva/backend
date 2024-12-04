import { getUser } from "../services/user.service.js";
import { userErrorCodes } from "../utils/errorCodes/user.errorCodes.js";
import createError from "http-errors";

export const getMeController = async (req, res, next) => {
    try{
        const { id } = req.user;
        const user = await getUser(id);
        res.status(200).json(user);
    }catch(err){
        switch(err.code){
            case userErrorCodes.USER_NOT_FOUND:
                next(createError(404, err.message));
                break;
            default:
                next(err);
        }
    }
}