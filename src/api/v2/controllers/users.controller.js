import { createUser, searchById } from "../model/user.model.js";
import { findError } from "../utils/utils.js";

const create = async (req, res) => {
  try {
    const { user } = req.body;
    const newUser = await createUser(user);
    if (!newUser) {
      throw new Error("Error creating user");
    }

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.log("error", error);
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }
};

const by_id = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await searchById(id);
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({ user: user });
  } catch (error) {
    console.log("error", error);
    // const errorFound = findError(error.code);
    // return res
    //   .status(errorFound[0]?.status)
    //   .json({ error: errorFound[0]?.message });
  }

};

export { create, by_id };
