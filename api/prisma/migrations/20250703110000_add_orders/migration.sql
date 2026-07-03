-- CreateEnum
CREATE TYPE "order_status" AS ENUM ('draft', 'open', 'in_kitchen', 'partially_served', 'served', 'bill_requested', 'payment_in_progress', 'closed', 'cancelled', 'voided');

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "table_id" UUID NOT NULL,
    "status" "order_status" NOT NULL DEFAULT 'open',
    "currency_code" CHAR(3) NOT NULL DEFAULT 'TRY',
    "subtotal_minor" BIGINT NOT NULL,
    "total_minor" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_lines" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "line_number" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price_minor" BIGINT NOT NULL,
    "line_total_minor" BIGINT NOT NULL,
    "currency_code" CHAR(3) NOT NULL,
    "menu_item_id" UUID NOT NULL,
    "sku" VARCHAR(50) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(200),
    "item_type" "menu_item_type" NOT NULL,
    "tax_category_id" UUID,
    "kitchen_station_id" UUID,
    "snapshot_captured_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_lines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_orders_restaurant_status" ON "orders"("restaurant_id", "status");

-- CreateIndex
CREATE INDEX "idx_orders_restaurant_not_deleted" ON "orders"("restaurant_id", "deleted_at");

-- CreateIndex
CREATE INDEX "idx_orders_table" ON "orders"("table_id");

-- CreateIndex
CREATE INDEX "idx_orders_restaurant_created" ON "orders"("restaurant_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "uq_order_lines_order_line_number" ON "order_lines"("order_id", "line_number");

-- CreateIndex
CREATE INDEX "idx_order_lines_order" ON "order_lines"("order_id");

-- CreateIndex
CREATE INDEX "idx_order_lines_restaurant" ON "order_lines"("restaurant_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "tables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_lines" ADD CONSTRAINT "order_lines_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
