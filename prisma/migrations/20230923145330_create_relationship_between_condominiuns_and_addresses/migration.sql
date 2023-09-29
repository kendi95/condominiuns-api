/*
  Warnings:

  - A unique constraint covering the columns `[id_condominium]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_condominium` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "id_condominium" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "addresses_id_condominium_key" ON "addresses"("id_condominium");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_id_condominium_fkey" FOREIGN KEY ("id_condominium") REFERENCES "condominiuns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
