/*
  Warnings:

  - You are about to drop the `tagsTousuarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios_tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tagsTousuarios" DROP CONSTRAINT "tagsTousuarios_usuarios_id_fkey";

-- DropForeignKey
ALTER TABLE "tagsTousuarios" DROP CONSTRAINT "tagsTousuarios_usuarios_tags_id_fkey";

-- DropTable
DROP TABLE "tagsTousuarios";

-- DropTable
DROP TABLE "usuarios_tags";

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
