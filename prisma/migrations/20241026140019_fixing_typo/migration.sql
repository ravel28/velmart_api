/*
  Warnings:

  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CartItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_user_id_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_item_id_fkey";

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "CartItem";

-- CreateTable
CREATE TABLE "cart" (
    "cart_user" SERIAL NOT NULL,
    "unique_id" TEXT NOT NULL,
    "note_cart" TEXT NOT NULL,
    "isCheckout" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("cart_user")
);

-- CreateTable
CREATE TABLE "cart_item" (
    "cart_item" SERIAL NOT NULL,
    "unique_id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" INTEGER,
    "cart_id" INTEGER,
    "item_id" INTEGER,

    CONSTRAINT "cart_item_pkey" PRIMARY KEY ("cart_item")
);

-- CreateIndex
CREATE UNIQUE INDEX "cart_unique_id_key" ON "cart"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "cart_user_id_key" ON "cart"("user_id");

-- CreateIndex
CREATE INDEX "cart_isCheckout_idx" ON "cart"("isCheckout");

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_unique_id_key" ON "cart_item"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_cart_id_key" ON "cart_item"("cart_id");

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_item_id_key" ON "cart_item"("item_id");

-- CreateIndex
CREATE INDEX "cart_item_cart_id_idx" ON "cart_item"("cart_id");

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_contact"("id_user_contact") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id_item") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart"("cart_user") ON DELETE SET NULL ON UPDATE CASCADE;
