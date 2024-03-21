/*
  Warnings:

  - The primary key for the `tagsTousuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tags_id` on the `tagsTousuarios` table. All the data in the column will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `usuarios_tags_id` to the `tagsTousuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tagsTousuarios" DROP CONSTRAINT "tagsTousuarios_tags_id_fkey";

-- AlterTable
ALTER TABLE "tagsTousuarios" DROP CONSTRAINT "tagsTousuarios_pkey",
DROP COLUMN "tags_id",
ADD COLUMN     "usuarios_tags_id" INTEGER NOT NULL DEFAULT 0,
ADD CONSTRAINT "tagsTousuarios_pkey" PRIMARY KEY ("usuarios_tags_id", "usuarios_id");

-- DropTable
DROP TABLE "tags";

-- CreateTable
CREATE TABLE "usuarios_tags" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "color" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_tags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tagsTousuarios" ADD CONSTRAINT "tagsTousuarios_usuarios_tags_id_fkey" FOREIGN KEY ("usuarios_tags_id") REFERENCES "usuarios_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
