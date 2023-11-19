-- CreateTable
CREATE TABLE "pages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles_pages" (
    "id_role" INTEGER NOT NULL,
    "id_page" INTEGER NOT NULL,

    CONSTRAINT "roles_pages_pkey" PRIMARY KEY ("id_role","id_page")
);

-- AddForeignKey
ALTER TABLE "roles_pages" ADD CONSTRAINT "roles_pages_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles_pages" ADD CONSTRAINT "roles_pages_id_page_fkey" FOREIGN KEY ("id_page") REFERENCES "pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
