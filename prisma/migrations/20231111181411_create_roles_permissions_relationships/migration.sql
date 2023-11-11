-- CreateTable
CREATE TABLE "roles_permissions" (
    "id_role" INTEGER NOT NULL,
    "id_permission" INTEGER NOT NULL,

    CONSTRAINT "roles_permissions_pkey" PRIMARY KEY ("id_role","id_permission")
);

-- AddForeignKey
ALTER TABLE "roles_permissions" ADD CONSTRAINT "roles_permissions_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles_permissions" ADD CONSTRAINT "roles_permissions_id_permission_fkey" FOREIGN KEY ("id_permission") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
