-- AlterTable
ALTER TABLE "User" ALTER COLUMN "resetPasswordToken" DROP NOT NULL,
ALTER COLUMN "resetPasswordTokenExpiry" DROP NOT NULL,
ALTER COLUMN "refreshToken" DROP NOT NULL,
ALTER COLUMN "refreshTokenExpiry" DROP NOT NULL;
