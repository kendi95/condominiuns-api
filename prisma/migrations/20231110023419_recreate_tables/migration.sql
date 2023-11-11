-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "id_role" INTEGER NOT NULL
);

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
    "province" TEXT NOT NULL,
    "id_condominium" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" CHAR(10) NOT NULL,
    "cell_phone" CHAR(11) NOT NULL,
    "id_condominium" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "condominiuns_id_key" ON "condominiuns"("id");

-- CreateIndex
CREATE UNIQUE INDEX "condominiuns_name_key" ON "condominiuns"("name");

-- CreateIndex
CREATE UNIQUE INDEX "condominiuns_document_key" ON "condominiuns"("document");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_id_key" ON "addresses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_id_condominium_key" ON "addresses"("id_condominium");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_id_key" ON "contacts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_id_condominium_key" ON "contacts"("id_condominium");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_id_condominium_fkey" FOREIGN KEY ("id_condominium") REFERENCES "condominiuns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_id_condominium_fkey" FOREIGN KEY ("id_condominium") REFERENCES "condominiuns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
