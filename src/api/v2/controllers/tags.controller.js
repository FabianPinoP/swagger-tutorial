import { createTag } from "../model/tag.model.js";
import { findError } from "../utils/utils.js";

const create = async (req, res) => {
  try {
    const { tag } = req.body;
    const newTag = await createTag(tag);
    if (!newTag) {
      throw new Error("Error creating newTag");
    }
    res.status(201).json({ tag: newTag });
  } catch (error) {
    console.log("error", error);
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }
};

export { create };
