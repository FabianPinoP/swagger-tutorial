/*
  Warnings:

  - Added the required column `color` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "color" VARCHAR(50) NOT NULL;
