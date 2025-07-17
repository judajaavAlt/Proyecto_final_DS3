/*
  Warnings:

  - You are about to drop the column `author` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `movieName` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "author",
DROP COLUMN "avatar",
DROP COLUMN "movieName";
