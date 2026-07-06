# Menu Management — Prisma M1 Raporu

> **Tarih:** 2 Temmuz 2026  
> **Sprint:** Menu Management — Category + MenuItem  
> **Kapsam:** Yalnızca Prisma modelleri (Repository/Service/Controller yok)  
> **Dosya:** [`api/prisma/schema.prisma`](../api/prisma/schema.prisma)

---

## Özet

Menu Management feature'ının ilk Prisma katmanı tamamlandı. **4 model**, **4 enum** ve **Restaurant** relation güncellemesi eklendi.

| Model | Rol |
|-------|-----|
| `MenuCategory` | Kategori aggregate root |
| `MenuItem` | Ürün aggregate root |
| `MenuCategoryPlacement` | Category ↔ MenuItem N:M junction |
| `MenuPrice` | MenuItem child entity — Money VO |

`prisma generate` ✅ başarılı · Migration henüz oluşturulmadı.

---

## Oluşturulan Modeller

### Enum'lar

| Enum | Değerler | Kullanım |
|------|----------|----------|
| `MenuCategoryStatus` | active, hidden, archived | Kategori lifecycle |
| `MenuItemStatus` | draft, active, out_of_stock, hidden, archived | Ürün state machine |
| `MenuItemType` | simple, combo | Combo menü hazırlığı |
| `MenuPriceStatus` | scheduled, active, expired, superseded | Fiyat lifecycle |

### Ortak Konvansiyonlar (tüm aggregate root'larda)

| Mekanizma | Alanlar |
|-----------|---------|
| Multi-tenant | `restaurantId` NOT NULL |
| Audit | `createdAt`, `updatedAt`, `createdBy`, `updatedBy` |
| Soft delete | `deletedAt` (MenuCategoryPlacement hariç — hard delete junction) |
| Optimistic lock | `version` |
| Slug erişimi | `MenuCategory.slug`, `MenuItem.slug` (nullable unique) |

### Money Value Object (`MenuPrice`)

```
amountMinor  BigInt   — kuruş/cent (8550 = 85,50 TL)
currencyCode Char(3)  — ISO 4217 (default TRY)
```

Base fiyat: `branchId = NULL` + `salesChannelId = NULL` + `status = ACTIVE`

---

## Model İlişki Diyagramı

```
Restaurant
    ├── MenuCategory (1:N)
    ├── MenuItem (1:N)
    ├── MenuCategoryPlacement (1:N)
    └── MenuPrice (1:N)

MenuCategory ←── MenuCategoryPlacement ──→ MenuItem
                                              │
                                              └── MenuPrice (1:N)
```

**Kritik:** MenuItem ↔ MenuCategory arasında **doğrudan FK yok**. Tek bağlantı `MenuCategoryPlacement`.

Order BC → MenuItem'a FK **yok** (gelecekte OrderLine'da JSON snapshot).

---

## Neden Bu İlişki Seçildi?

### 1. Bağımsız Aggregate (DDD)

Category ve MenuItem **ayrı aggregate root** olarak modellendi:

| Aggregate | Sorumluluk | Lifecycle |
|-----------|------------|-----------|
| **MenuCategory** | Gruplama, sıralama, görünürlük | active → hidden → archived |
| **MenuItem** | Satılabilir ürün, fiyat, durum | draft → active → 86 → hidden → archived |

Doğrudan `MenuItem.categoryId` FK kullanılmadı çünkü:
- Kategori silinince/archived olunca ürün aggregate'i etkilenmemeli
- Aynı ürün birden fazla kategoride gösterilebilir (BR-M24)
- Her aggregate kendi transaction boundary'sinde güncellenir

### 2. CategoryPlacement Junction (N:M)

`MenuCategoryPlacement` iki aggregate arasındaki **tek bağlantı noktası**:

| Alan | Amaç |
|------|------|
| `categoryId` + `menuItemId` | N:M ilişki |
| `displayOrder` | Kategori içi sıralama |
| `isPrimary` | Raporlama birincil kategori (tek true per item — migration partial unique) |
| `restaurantId` | Tenant filter denormalize — cross-tenant join engeli |

Junction **hard delete** kullanır (soft delete yok) — link kaldırma = kayıt silme, aggregate'ler korunur.

### 3. MenuPrice MenuItem Aggregate İçinde

Fiyat `MenuItem` aggregate'inin parçası (`MenuPrice` child entity):
- Base fiyat + ileride branch/channel override aynı tabloda
- Order BC fiyatı snapshot alır; `MenuPrice` runtime'da resolve edilir
- Money VO: `amountMinor` + `currencyCode` — float kullanılmaz

### 4. Order Snapshot (FK yok)

Prisma schema'da Order modeli yok ve **olmayacak şekilde** tasarlandı:
- OrderLine → `menuItemSnapshot JSONB` (Ordering BC)
- MenuItem silinse/archived olsa geçmiş siparişler etkilenmez
- Menu modülü Order'a reverse relation taşımaz

### 5. Modifier Hazırlığı

`MenuItem` üzerinde modifier FK yok; ileride `menu_item_modifier_groups` tablosu `menuItemId` ile bağlanacak. Mevcut `MenuItem.id` UUID yapısı bunu bozmaz.

---

## Performans Analizi

### Beklenen Sorgular ve Index Karşılığı

| Sorgu | SQL Pattern | Index |
|-------|-------------|-------|
| QR/Garson kategori listesi | `WHERE restaurant_id = ? AND status = 'active' ORDER BY display_order` | `idx_menu_categories_restaurant_order` |
| Kategori içi ürünler | `JOIN placements ON category_id ORDER BY display_order` | `idx_menu_category_placements_category_order` |
| Ürün detay (slug) | `WHERE restaurant_id = ? AND slug = ?` | `uq_menu_items_restaurant_slug` |
| Aktif ürünler | `WHERE restaurant_id = ? AND status IN (...)` | `idx_menu_items_restaurant_status` |
| Fiyat resolve | `WHERE menu_item_id = ? AND branch_id IS NULL ORDER BY priority` | `idx_menu_prices_resolve` |
| Primary category bul | `WHERE menu_item_id = ? AND is_primary = true` | `idx_menu_category_placements_menu_item` |

### Tahmini Latency (10K ürün / tenant)

| Sorgu | Beklenen | Not |
|-------|----------|-----|
| Kategori listesi | < 5ms | Index scan, ~20-50 row |
| Kategori + 100 ürün join | < 20ms | 2 index scan + nested loop |
| Slug lookup | < 2ms | Unique index |
| Fiyat resolve | < 5ms | 1-5 price row per item |
| Full menu (normalize) | 50-200ms | Publish snapshot ile < 10ms |

### Ölçek Notları

- Tüm composite indexler **`restaurant_id` leading column** — multi-tenant partition hazır
- `MenuCategoryPlacement` büyümesi: N kategori × M ürün; 10K ürün × 2 placement ortalama = 20K row — kabul edilebilir
- Full-text search (`tsvector`, `pg_trgm`) MenuItem'a sonraki sprintte eklenecek
- Published menu JSONB snapshot (QR) bu sprint dışında — normalize join maliyetli

---

## İleride Eklenecek Alanlar / Modeller

| Bileşen | Sprint | Bağımlılık |
|---------|--------|------------|
| `MenuItemModifierGroup` | M3 | ModifierGroup modeli |
| `ModifierGroup` / `Modifier` | M3 | — |
| `MenuAvailabilityRule` + `TimeSlot` | M4 | — |
| `MenuPublication` + `snapshot_json` | M6 | QR menü |
| `TaxCategory` model + FK relation | M12 | Settings BC |
| `Branch` model + FK on branchId | Tenant | — |
| `SalesChannel` model + FK | M4 | — |
| `KitchenStation` FK relation | M1+ | Kitchen BC |
| `search_vector` / GIN index | M2 | pg_trgm extension |
| `ComboMenu` / `ComboComponent` | M10 | itemType = COMBO |
| `Recipe` / `RecipeItem` | M8 | Inventory BC |
| `primary_category_id` denormalize (opsiyonel) | — | Placement isPrimary projection |

---

## Riskler

| # | Risk | Etki | Mitigation |
|---|------|------|------------|
| R1 | **Partial unique index yok** (Prisma 6.19) | Soft-deleted slug/SKU yeniden kullanılamaz | İlk migration'da raw SQL partial unique |
| R2 | **Tek isPrimary constraint** | Birden fazla primary placement | Migration: `UNIQUE (menu_item_id) WHERE is_primary = true` |
| R3 | **Cross-tenant placement** | Yanlış categoryId + itemId farklı restaurant | Application guard + DB trigger (migration) |
| R4 | **MenuItem.slug nullable unique** | PostgreSQL'de çoklu NULL slug | Partial unique: `WHERE slug IS NOT NULL AND deleted_at IS NULL` |
| R5 | **BigInt Money** | JS Number overflow > 2^53 | Prisma BigInt → application Money VO |
| R6 | **Normalize menu join maliyeti** | QR yavaş | MenuPublication snapshot (M6) |
| R7 | **taxCategoryId FK yok** | Orphan UUID | TaxCategory modeli gelince relation ekle |
| R8 | **Concurrent price edit** | version conflict | Optimistic lock + retry |
| R9 | **Placement hard delete** | Audit trail kaybı | Domain event `CategoryPlacementRemoved` (service katmanı) |
| R10 | **CHECK constraints eksik** | Negatif fiyat, invalid color | Migration raw SQL |

---

## Migration Checklist (Sonraki Adım)

```sql
-- Partial unique indexes (Prisma 6 kısıtı)
CREATE UNIQUE INDEX uq_menu_categories_restaurant_slug_partial
  ON menu_categories (restaurant_id, slug) WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX uq_menu_items_restaurant_sku_partial
  ON menu_items (restaurant_id, sku) WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX uq_menu_items_restaurant_slug_partial
  ON menu_items (restaurant_id, slug) WHERE deleted_at IS NULL AND slug IS NOT NULL;

CREATE UNIQUE INDEX uq_menu_category_placements_one_primary
  ON menu_category_placements (menu_item_id) WHERE is_primary = true;

-- CHECK constraints
ALTER TABLE menu_prices ADD CONSTRAINT chk_menu_prices_amount_minor
  CHECK (amount_minor >= 0);

ALTER TABLE menu_items ADD CONSTRAINT chk_menu_items_prep_time
  CHECK (preparation_time_seconds IS NULL OR preparation_time_seconds BETWEEN 1 AND 86400);
```

---

## İlgili Dokümanlar

- [MENU-DOMAIN-TASARIMI.md](./MENU-DOMAIN-TASARIMI.md)
- [MENU-DATABASE-TASARIMI.md](./MENU-DATABASE-TASARIMI.md)
- [BACKEND-ISKELET.md](./BACKEND-ISKELET.md)

---

**Sonraki sprint adımı:** Migration oluşturma → MenuCategory Repository + Use Cases
