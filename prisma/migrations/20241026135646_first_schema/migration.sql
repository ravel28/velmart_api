-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "CategoryWeightItemEnum" AS ENUM ('LIGHT', 'MEDIUM', 'HEAVY', 'VERY_HEAVY');

-- CreateTable
CREATE TABLE "user_contact" (
    "id_user_contact" SERIAL NOT NULL,
    "unique_id" TEXT NOT NULL,
    "role_user_contact" "RoleEnum" NOT NULL DEFAULT 'SUPER_ADMIN',
    "username" VARCHAR(20),
    "password" VARCHAR(50) NOT NULL,
    "created_by" VARCHAR(10) NOT NULL,
    "updated_by" VARCHAR(10),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cart_user_id" INTEGER,

    CONSTRAINT "user_contact_pkey" PRIMARY KEY ("id_user_contact")
);

-- CreateTable
CREATE TABLE "category_item" (
    "id_category_item" SERIAL NOT NULL,
    "unique_id" TEXT NOT NULL,
    "category_name" VARCHAR(250) NOT NULL,
    "created_by" VARCHAR(10) NOT NULL,
    "updated_by" VARCHAR(10),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_item_pkey" PRIMARY KEY ("id_category_item")
);

-- CreateTable
CREATE TABLE "category_weight_item" (
    "category_weight_item" SERIAL NOT NULL,
    "unique_id" TEXT NOT NULL,
    "category_weight_name" "CategoryWeightItemEnum" NOT NULL DEFAULT 'LIGHT',
    "created_by" VARCHAR(10) NOT NULL,
    "updated_by" VARCHAR(10),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_weight_item_pkey" PRIMARY KEY ("category_weight_item")
);

-- CreateTable
CREATE TABLE "item" (
    "id_item" SERIAL NOT NULL,
    "unique_id" TEXT NOT NULL,
    "item_name" VARCHAR(250) NOT NULL,
    "description" TEXT NOT NULL,
    "price_item" DOUBLE PRECISION NOT NULL,
    "discount_item" INTEGER,
    "created_by" VARCHAR(10) NOT NULL,
    "updated_by" VARCHAR(10),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category_item_id" INTEGER,
    "category_weight_item_id" INTEGER,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id_item")
);

-- CreateTable
CREATE TABLE "Cart" (
    "cart_user" SERIAL NOT NULL,
    "unique_id" TEXT NOT NULL,
    "note_cart" TEXT NOT NULL,
    "isCheckout" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("cart_user")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "cart_item" SERIAL NOT NULL,
    "unique_id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" INTEGER,
    "cart_id" INTEGER,
    "item_id" INTEGER,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("cart_item")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_contact_unique_id_key" ON "user_contact"("unique_id");

-- CreateIndex
CREATE INDEX "user_contact_username_password_idx" ON "user_contact"("username", "password");

-- CreateIndex
CREATE UNIQUE INDEX "category_item_unique_id_key" ON "category_item"("unique_id");

-- CreateIndex
CREATE INDEX "category_item_category_name_idx" ON "category_item"("category_name");

-- CreateIndex
CREATE UNIQUE INDEX "category_weight_item_unique_id_key" ON "category_weight_item"("unique_id");

-- CreateIndex
CREATE INDEX "category_weight_item_category_weight_name_idx" ON "category_weight_item"("category_weight_name");

-- CreateIndex
CREATE UNIQUE INDEX "item_unique_id_key" ON "item"("unique_id");

-- CreateIndex
CREATE INDEX "item_item_name_idx" ON "item"("item_name");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_unique_id_key" ON "Cart"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_user_id_key" ON "Cart"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_unique_id_key" ON "CartItem"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cart_id_key" ON "CartItem"("cart_id");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_item_id_key" ON "CartItem"("item_id");

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_category_item_id_fkey" FOREIGN KEY ("category_item_id") REFERENCES "category_item"("id_category_item") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_category_weight_item_id_fkey" FOREIGN KEY ("category_weight_item_id") REFERENCES "category_weight_item"("category_weight_item") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_contact"("id_user_contact") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id_item") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Cart"("cart_user") ON DELETE SET NULL ON UPDATE CASCADE;
