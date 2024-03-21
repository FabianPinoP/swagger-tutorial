import { createUserTags } from "../model/userTag.model.js";

const create = async (req, res) => {
  try {
    const { user_tag } = req.body;
    const newUserTag = await createUserTags(user_tag);
    if (!newUserTag) {
      throw new Error("Error creating newUserTag");
    }
    res.status(201).json({ userTag: newUserTag });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error.message });
  }
};

export { create };
