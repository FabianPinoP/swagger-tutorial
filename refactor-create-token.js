import { byEmail } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findError } from "../utils/utils.js";

const loginUser = async (req, res) => {
  const { user } = req.body;

  try {
    const findUser = await byEmail(user);

    if (!findUser) {
      return await sendErrorResponse(res, "auth_01");
    }

    const isPasswordValid = bcrypt.compareSync(
      user.password,
      findUser.password
    );

    if (!isPasswordValid) {
      return await sendErrorResponse(res, "auth_02");
    }

    const { email, nombre, apellido } = findUser;
    const token = await createToken(email);
    res.status(200).json({
      message: `Bienvenido, ${nombre} ${apellido} has iniciado sesion`,
      code: 200,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createToken = async (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const sendErrorResponse = async (res, errorCode) => {
  const errorFound = findError(errorCode);
  res.status(errorFound[0].status).json({ error: errorFound[0].message });
};

export { loginUser };
