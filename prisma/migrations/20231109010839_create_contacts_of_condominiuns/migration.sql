-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" CHAR(10) NOT NULL,
    "cell_phone" CHAR(11) NOT NULL,
    "id_condominium" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "contacts_id_key" ON "contacts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_id_condominium_key" ON "contacts"("id_condominium");

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_id_condominium_fkey" FOREIGN KEY ("id_condominium") REFERENCES "condominiuns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
