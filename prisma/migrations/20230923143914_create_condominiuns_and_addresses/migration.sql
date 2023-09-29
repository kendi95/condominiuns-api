-- CreateTable
CREATE TABLE "condominiuns" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "document" CHAR(18) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "street_number" INTEGER NOT NULL,
    "zip_code" CHAR(9) NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "condominiuns_id_key" ON "condominiuns"("id");

-- CreateIndex
CREATE UNIQUE INDEX "condominiuns_name_key" ON "condominiuns"("name");

-- CreateIndex
CREATE UNIQUE INDEX "condominiuns_document_key" ON "condominiuns"("document");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_id_key" ON "addresses"("id");
