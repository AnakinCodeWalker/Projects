/*
  Warnings:

  - You are about to drop the column `otp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Otp` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "otp";

-- DropTable
DROP TABLE "Otp";
