import { findError } from "../utils/utils.js";
import { getTravels } from "../model/travel.model.js";

const allTravels = async (req, res) => {
  try {
    const travels = await getTravels();
    res.status(200).json({ travels: travels });
  } catch (error) {
    console.log("error", error);
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }
};

export { allTravels };
