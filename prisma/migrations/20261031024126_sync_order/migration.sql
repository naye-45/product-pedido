/*
  Warnings:

  - You are about to drop the column `nameProduct` on the `order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name_Product` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "nameProduct",
ADD COLUMN     "name_Product" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_name_key" ON "product"("name");
