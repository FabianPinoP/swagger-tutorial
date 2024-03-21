import { prisma } from "../../../../config/db/prismaDb.js";

const createUserTags = async ({ tag_id, user_id }) => {
  const newUserTag = await prisma.userTags.create({
    data: {
      tag_id: parseInt(tag_id),
      usuario_id: parseInt(user_id),
    },
  });
  return newUserTag;
};

export { createUserTags };
