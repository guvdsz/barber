/*
  Warnings:

  - You are about to drop the column `customerName` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `services` table. All the data in the column will be lost.
  - You are about to drop the `haircuts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "haircuts" DROP CONSTRAINT "haircuts_userId_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_serviceId_fkey";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "customerName",
DROP COLUMN "serviceId",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "haircuts";

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "serviceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
