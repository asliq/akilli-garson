-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "menu_category_status" AS ENUM ('active', 'hidden', 'archived');

-- CreateEnum
CREATE TYPE "menu_item_status" AS ENUM ('draft', 'active', 'out_of_stock', 'hidden', 'archived');

-- CreateEnum
CREATE TYPE "menu_item_type" AS ENUM ('simple', 'combo');

-- CreateEnum
CREATE TYPE "menu_price_status" AS ENUM ('scheduled', 'active', 'expired', 'superseded');

-- CreateTable
CREATE TABLE "restaurants" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_categories" (
    "id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "branch_id" UUID,
    "name" VARCHAR(150) NOT NULL,
    "slug" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "icon" VARCHAR(50),
    "color" VARCHAR(7),
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "status" "menu_category_status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" UUID,
    "updated_by" UUID,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "menu_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_items" (
    "id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "item_type" "menu_item_type" NOT NULL DEFAULT 'simple',
    "status" "menu_item_status" NOT NULL DEFAULT 'draft',
    "sku" VARCHAR(50) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(200),
    "description" TEXT,
    "image_url" VARCHAR(2048),
    "tax_category_id" UUID,
    "kitchen_station_id" UUID,
    "preparation_time_seconds" INTEGER,
    "calories_kcal" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" UUID,
    "updated_by" UUID,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_category_placements" (
    "id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "menu_item_id" UUID NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_category_placements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_prices" (
    "id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "menu_item_id" UUID NOT NULL,
    "amount_minor" BIGINT NOT NULL,
    "currency_code" CHAR(3) NOT NULL DEFAULT 'TRY',
    "status" "menu_price_status" NOT NULL DEFAULT 'active',
    "branch_id" UUID,
    "sales_channel_id" UUID,
    "priority" SMALLINT NOT NULL DEFAULT 0,
    "valid_from" TIMESTAMP(3),
    "valid_to" TIMESTAMP(3),
    "label" VARCHAR(100),
    "superseded_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" UUID,
    "updated_by" UUID,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "menu_prices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_slug_key" ON "restaurants"("slug");

-- CreateIndex
CREATE INDEX "idx_menu_categories_restaurant_order" ON "menu_categories"("restaurant_id", "display_order");

-- CreateIndex
CREATE INDEX "idx_menu_categories_branch" ON "menu_categories"("restaurant_id", "branch_id");

-- CreateIndex
CREATE INDEX "idx_menu_categories_restaurant_status" ON "menu_categories"("restaurant_id", "status");

-- CreateIndex
CREATE INDEX "idx_menu_categories_restaurant_not_deleted" ON "menu_categories"("restaurant_id", "deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "uq_menu_categories_restaurant_slug" ON "menu_categories"("restaurant_id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "uq_menu_categories_restaurant_branch_name" ON "menu_categories"("restaurant_id", "branch_id", "name");

-- CreateIndex
CREATE INDEX "idx_menu_items_restaurant_status" ON "menu_items"("restaurant_id", "status");

-- CreateIndex
CREATE INDEX "idx_menu_items_restaurant_not_deleted" ON "menu_items"("restaurant_id", "deleted_at");

-- CreateIndex
CREATE INDEX "idx_menu_items_restaurant_type" ON "menu_items"("restaurant_id", "item_type");

-- CreateIndex
CREATE INDEX "idx_menu_items_restaurant_name" ON "menu_items"("restaurant_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "uq_menu_items_restaurant_sku" ON "menu_items"("restaurant_id", "sku");

-- CreateIndex
CREATE UNIQUE INDEX "uq_menu_items_restaurant_slug" ON "menu_items"("restaurant_id", "slug");

-- CreateIndex
CREATE INDEX "idx_menu_category_placements_category_order" ON "menu_category_placements"("category_id", "display_order");

-- CreateIndex
CREATE INDEX "idx_menu_category_placements_menu_item" ON "menu_category_placements"("menu_item_id");

-- CreateIndex
CREATE INDEX "idx_menu_category_placements_restaurant_category" ON "menu_category_placements"("restaurant_id", "category_id");

-- CreateIndex
CREATE INDEX "idx_menu_category_placements_restaurant_item" ON "menu_category_placements"("restaurant_id", "menu_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_menu_category_placements_category_item" ON "menu_category_placements"("category_id", "menu_item_id");

-- CreateIndex
CREATE INDEX "idx_menu_prices_item_status" ON "menu_prices"("menu_item_id", "status");

-- CreateIndex
CREATE INDEX "idx_menu_prices_resolve" ON "menu_prices"("menu_item_id", "branch_id", "sales_channel_id", "status");

-- CreateIndex
CREATE INDEX "idx_menu_prices_restaurant_status" ON "menu_prices"("restaurant_id", "status");

-- CreateIndex
CREATE INDEX "idx_menu_prices_restaurant_not_deleted" ON "menu_prices"("restaurant_id", "deleted_at");

-- CreateIndex
CREATE INDEX "idx_menu_prices_valid_from" ON "menu_prices"("valid_from");

-- AddForeignKey
ALTER TABLE "menu_categories" ADD CONSTRAINT "menu_categories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_category_placements" ADD CONSTRAINT "menu_category_placements_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_category_placements" ADD CONSTRAINT "menu_category_placements_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "menu_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_category_placements" ADD CONSTRAINT "menu_category_placements_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_prices" ADD CONSTRAINT "menu_prices_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_prices" ADD CONSTRAINT "menu_prices_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_prices" ADD CONSTRAINT "menu_prices_superseded_by_id_fkey" FOREIGN KEY ("superseded_by_id") REFERENCES "menu_prices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- =============================================================================
-- Partial unique indexes (soft-delete slug/SKU reuse)
-- =============================================================================

DROP INDEX IF EXISTS "uq_menu_categories_restaurant_slug";
CREATE UNIQUE INDEX "uq_menu_categories_restaurant_slug"
  ON "menu_categories" ("restaurant_id", "slug")
  WHERE "deleted_at" IS NULL;

DROP INDEX IF EXISTS "uq_menu_items_restaurant_sku";
CREATE UNIQUE INDEX "uq_menu_items_restaurant_sku"
  ON "menu_items" ("restaurant_id", "sku")
  WHERE "deleted_at" IS NULL;

DROP INDEX IF EXISTS "uq_menu_items_restaurant_slug";
CREATE UNIQUE INDEX "uq_menu_items_restaurant_slug"
  ON "menu_items" ("restaurant_id", "slug")
  WHERE "deleted_at" IS NULL AND "slug" IS NOT NULL;

CREATE UNIQUE INDEX "uq_menu_category_placements_one_primary"
  ON "menu_category_placements" ("menu_item_id")
  WHERE "is_primary" = true;

-- =============================================================================
-- CHECK constraints
-- =============================================================================

ALTER TABLE "menu_prices"
  ADD CONSTRAINT "chk_menu_prices_amount_minor" CHECK ("amount_minor" >= 0);

ALTER TABLE "menu_items"
  ADD CONSTRAINT "chk_menu_items_prep_time"
  CHECK ("preparation_time_seconds" IS NULL OR "preparation_time_seconds" BETWEEN 1 AND 86400);
