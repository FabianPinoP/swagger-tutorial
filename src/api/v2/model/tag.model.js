import { prisma } from "../../../../config/db/prismaDb.js";

const createTag = async ({ nombre, color, usuario_id }) => {
  const newUserTag = await prisma.tags.create({
    data: {
      nombre,
      color,
    },
  });
  return newUserTag;
};

export { createTag };
