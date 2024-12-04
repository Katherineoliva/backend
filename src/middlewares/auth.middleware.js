import { getUser } from "../services/user.service.js";
import { verifyToken } from "../utils/jwt.utl.js";
import createHttpError from "http-errors";

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) next(createHttpError(401, "Token no proporcionado"));

    const [prefix, token] = authorization.split(" ");

    if (!token) next(createHttpError(401, "Token no proporcionado"));

    const payload = verifyToken(token);
    if (!payload) next(createHttpError(401, "Token invalido"));


    req.user = payload;
    req.token = token;
    next();
  } catch (e) {
    next(createHttpError(401, "Unauthorized"));
  }
};

export const rolesMiddleware = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const {id} = req.user; 
      const user = await getUser(id);
      if (!user) return next(createHttpError(401, "User not found"));

      if (!requiredRoles.some(role => user.Role.includes(role))) 
        return next(createHttpError(403, "Accesso denegado por falta de permisos"));

      next();
    } catch (error) {
      next(error);
    }
  }
}