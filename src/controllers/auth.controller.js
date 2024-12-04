import { registerUser, googleLogin, loginUser } from "../services/auth.service.js";
import { existsUser } from "../services/user.service.js";
import { userErrorCodes } from "../utils/errorCodes/user.errorCodes.js";
import createError from "http-errors";

export const loginController = async (req, res, next) => {
    try {
        let user;
        const { googleToken } = req.body;
        const data = await googleLogin(googleToken);
        user = await existsUser(data.email);
        if (!user){
            user = await registerUser(data.name, data.email, data.picture);
        }

        const token = await loginUser(user);

        res.status(200).json(token);
    } catch (err) {
        switch (err.code) {
            case userErrorCodes.USER_NOT_FOUND:
                next(createError(404, 'User not found'));
                break;
            case userErrorCodes.USER_NOT_CREATED:
                next(createError(500, 'User not created'));
                break;
            case userErrorCodes.TOKEN_GENERATION_ERROR:
                next(createError(500, 'Token not generated'));
                break;
            default:
                next(createError(err.status, err.message));
        }
    }
}