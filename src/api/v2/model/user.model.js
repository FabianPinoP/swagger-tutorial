import { prisma } from "../../../../config/db/prismaDb.js";

const createUser = async ({ nombre, apellido, email, password }) => {
  const newUser = await prisma.usuarios.create({
    data: { nombre, apellido, email, password },
  });
  return newUser;
};

const searchById = async (id) => {
  const user = await prisma.usuarios.findUnique({
    where: { id: parseInt(id) },
    include: { tags: { include: { tag: true } } },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return { user };
};

export { createUser, searchById };
