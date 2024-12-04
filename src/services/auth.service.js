import User from "../models/user.model.js";
import { ServiceError } from "../utils/serviceError.js";
import { userErrorCodes } from "../utils/errorCodes/user.errorCodes.js";
import { generateToken } from "../utils/jwt.utl.js";
import axios from "axios";

export const registerUser = async (name, email, picture) => {
  try {
    const user = new User({ name, email, photo: picture });
    await user.save();
    return user;
  } catch (err) {
    throw new ServiceError(
      err.message,
      err.code || userErrorCodes.USER_NOT_CREATED
    );
  }
};

export const loginUser = async (user) => {
  try {

    const token = generateToken({ id: user._id});
    if (!token)
      throw new ServiceError(
        "Token not generated",
        userErrorCodes.TOKEN_GENERATION_ERROR
      );
    return token;
  } catch (err) {
    throw new ServiceError(
      err.message,
      err.code || userErrorCodes.USER_NOT_FOUND
    );
  }
};

export const googleLogin = async (token) => {
  try {
    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { name, email, picture } = userResponse.data;
    if (!name || !email)
      throw new ServiceError("User not found", userErrorCodes.USER_NOT_FOUND);
    return { name, email, picture };
  } catch (err) {
    throw new ServiceError(
      err.message,
      err.code || userErrorCodes.USER_NOT_FOUND
    );
  }
};
