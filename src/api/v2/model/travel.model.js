import { prisma } from "../../../../config/db/prismaDb.js";

const getTravels = async () => {
  return await prisma.viajes.findMany();
}

export { getTravels };