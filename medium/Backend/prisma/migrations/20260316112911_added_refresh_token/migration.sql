/*
  Warnings:

  - Added the required column `profile` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetPasswordToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetPasswordTokenExpiry` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profile" TEXT NOT NULL,
ADD COLUMN     "resetPasswordToken" TEXT NOT NULL,
ADD COLUMN     "resetPasswordTokenExpiry" TIMESTAMP(3) NOT NULL;
