/*
  Warnings:

  - Added the required column `name` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubscriptionName" AS ENUM ('BASIC', 'PRO');

-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "name" "SubscriptionName" NOT NULL;
