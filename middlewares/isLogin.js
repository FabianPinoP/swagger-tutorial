import { findError } from "../src/api/v1/utils/utils.js";
import jwt from "jsonwebtoken";

const isLogin = async (req, res, next) => {
  try {
    validateHeaders(req, res);
    const token = req.header("Authorization").split(" ")[1];
    const tokenData = await validateToken(token);
    req.user = tokenData;
    next();
  } catch (error) {
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }
};

const validateToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw createError("auth_04", "Token no válido");
  }
};

const validateHeaders = (req) => {
  if (!req.header("Authorization")) {
    throw createError("auth_03", "token no encontrado");
  }
};

const createError = (code, message) => {
  const error = new Error(message);
  error.code = code;
  return error;
};
export { isLogin };
