# CreateCategory Use Case — Tasarım & Implementasyon Raporu

> **Tarih:** 2 Temmuz 2026  
> **Modül:** Menu Management  
> **Use Case:** CreateCategory  
> **Durum:** Application + Domain katmanı tamamlandı  
> **Henüz yok:** Controller · Prisma Repository · Swagger · Test

---

## 1. Use Case Analizi

| Alan | Detay |
|------|-------|
| **Ad** | CreateCategory |
| **Amaç** | Restoran menüsüne yeni bir kategori eklemek |
| **Actor** | Manager (RBAC — controller katmanında uygulanacak) |
| **Tetikleyici** | `POST /api/v1/menu/categories` (ileride) |
| **Önkoşul** | Geçerli tenant context (`restaurantId`); Auth modülü sonra |
| **Sonuç** | `ACTIVE` durumunda yeni `MenuCategory` kaydı + `CategoryCreated` event |
| **Başarı çıktısı** | `CreateCategoryOutputDto` |
| **Başarısızlık** | Slug çakışması, branch ad çakışması, validation hatası, tenant yok |

### Akış

```
Input DTO
  → Tenant context (restaurantId)
  → Slug resolve (input veya name'den üret)
  → Uniqueness check (slug, branch+name)
  → DisplayOrder resolve (input veya max+1)
  → MenuCategory.create() [Domain Factory]
  → Repository.save()
  → CategoryCreatedEvent publish
  → Output DTO
```

### Sorumluluk sınırları

| Katman | Sorumluluk |
|--------|------------|
| **Domain** | Entity factory, VO validasyonu, business invariant |
| **Application** | Orkestrasyon, uniqueness, event publish, DTO mapping |
| **Infrastructure** | Prisma persist (sonraki sprint) |
| **Presentation** | HTTP, ValidationPipe, auth (sonraki sprint) |

---

## 2. Business Rules

| ID | Kural |
|----|-------|
| BR-CC-01 | Kategori oluşturulduğunda `status = ACTIVE` |
| BR-CC-02 | `restaurantId` tenant context'ten gelir; client'tan alınmaz |
| BR-CC-03 | `slug` restaurant scope'unda benzersiz olmalı (soft-deleted hariç — repo sorumluluğu) |
| BR-CC-04 | `branchId` dolu ise `(restaurantId, branchId, name)` benzersiz olmalı |
| BR-CC-05 | `displayOrder` verilmezse listenin sonuna eklenir (`max + 1`) |
| BR-CC-06 | `displayOrder >= 0` tam sayı |
| BR-CC-07 | Boş kategori oluşturulabilir (ürün zorunlu değil) |
| BR-CC-08 | Hard delete yok; archive ayrı use case |
| BR-CC-09 | Oluşturulunca `version = 1` |
| BR-CC-10 | `CategoryCreated` domain event publish edilir |

---

## 3. Validation Kuralları

### Input DTO (class-validator — presentation katmanında ValidationPipe)

| Alan | Kurallar |
|------|----------|
| `name` | Required, string, max 150 |
| `slug` | Optional, string, max 150 |
| `description` | Optional, string |
| `icon` | Optional, string, max 50 |
| `color` | Optional, string, max 7 |
| `displayOrder` | Optional, int, min 0 |
| `branchId` | Optional, UUID |

### Domain Value Objects (use case + entity içinde)

| VO | Kurallar |
|----|----------|
| `CategorySlug` | 1–150 char, `[a-z0-9-]+`; name'den Türkçe karakter normalize |
| `CategoryColor` | `#RRGGBB` hex format |
| `DisplayOrder` | Non-negative integer |

---

## 4. Domain Events

| Event | Topic | Payload |
|-------|-------|---------|
| `CategoryCreatedEvent` | `menu.category.created` | categoryId, restaurantId, branchId, name, slug, displayOrder, status |

**Publisher:** `DomainEventPublisher` (core/events)  
**Potansiyel subscriber'lar (ileride):** WebSocket (menü cache invalidate), Audit log, Reports projection

---

## 5. Repository Interface İhtiyacı

```typescript
interface IMenuCategoryRepository {
  findBySlug(restaurantId, slug): Promise<MenuCategory | null>
  findByNameAndBranch(restaurantId, branchId, name): Promise<MenuCategory | null>
  getMaxDisplayOrder(restaurantId, branchId): Promise<number>
  save(category): Promise<MenuCategory>
}
```

| Metod | CreateCategory'de neden |
|-------|-------------------------|
| `findBySlug` | BR-CC-03 slug uniqueness |
| `findByNameAndBranch` | BR-CC-04 şube ad uniqueness |
| `getMaxDisplayOrder` | BR-CC-05 auto append order |
| `save` | Persist aggregate |

**Injection token:** `MENU_CATEGORY_REPOSITORY` (Symbol)

---

## 6. DTO Tasarımı

### CreateCategoryInputDto

Command intent — sadece oluşturma için gerekli alanlar. `restaurantId` yok (tenant context).

### CreateCategoryOutputDto

Oluşturulan aggregate'in public projection'ı. `static fromDomain(category)` factory ile domain → DTO mapping.

---

## 7. Use Case Implementasyonu

**Dosya:** `application/use-cases/create-category.use-case.ts`

- `@Injectable()` NestJS DI
- Repository interface inject (implementation yok)
- Tenant guard via `getRestaurantId()`
- Conflict → `ConflictException` (shared)
- Event publish after successful save

---

## Oluşan Dosya Ağacı

```
api/src/modules/menu/
├── menu.module.ts
├── application/
│   ├── dto/
│   │   ├── create-category.input.dto.ts
│   │   └── create-category.output.dto.ts
│   └── use-cases/
│       └── create-category.use-case.ts
└── domain/
    ├── enums/
    │   └── menu-category-status.enum.ts
    ├── entities/
    │   └── menu-category.entity.ts
    ├── events/
    │   └── category-created.event.ts
    ├── repositories/
    │   └── menu-category.repository.interface.ts
    └── value-objects/
        ├── category-color.vo.ts
        ├── category-slug.vo.ts
        └── display-order.vo.ts
```

**Build:** `npm run build` ✅

**Not:** `MenuModule` henüz `AppModule`'e eklenmedi — repository provider olmadan DI tamamlanamaz.

---

## SOLID Kontrolü

| Prensip | Durum | Açıklama |
|---------|-------|----------|
| **S** Single Responsibility | ✅ | Use case yalnızca create orkestrasyonu; entity create logic domain'de |
| **O** Open/Closed | ✅ | Yeni use case'ler menu module'e eklenir; CreateCategory değiştirilmez |
| **L** Liskov Substitution | ✅ | `IMenuCategoryRepository` implementasyonu değiştirilebilir (Prisma/InMemory) |
| **I** Interface Segregation | ✅ | Repository sadece CreateCategory'nin ihtiyaç duyduğu metodları içerir |
| **D** Dependency Inversion | ✅ | Use case concrete Prisma'ya değil interface'e bağımlı |

---

## DDD Kontrolü

| Prensip | Durum | Açıklama |
|---------|-------|----------|
| **Aggregate Root** | ✅ | `MenuCategory` factory + invariant |
| **Value Objects** | ✅ | Slug, Color, DisplayOrder — identity yok |
| **Domain Events** | ✅ | `CategoryCreatedEvent` side-effect bildirimi |
| **Ubiquitous Language** | ✅ | slug, displayOrder, active, branch — domain doc ile uyumlu |
| **Bounded Context** | ✅ | Menu BC içinde; tenant context cross-cutting |
| **Repository Pattern** | ✅ | Interface domain'de; impl infrastructure'da (sonra) |
| **Anemic Model yok** | ✅ | Factory `MenuCategory.create()` domain logic taşır |

---

## Clean Architecture Kontrolü

| Katman | Bağımlılık yönü | Durum |
|--------|-----------------|-------|
| Domain | Hiçbir dış katmana bağımlı değil | ✅ (sadece shared DomainException) |
| Application | Domain + core ports | ✅ |
| Infrastructure | — | ⏸ Sonraki sprint |
| Presentation | — | ⏸ Sonraki sprint |

**Kural ihlali yok:** Use case Prisma import etmiyor.

---

## Olası Teknik Borçlar

| # | Borç | Öncelik | Çözüm |
|---|------|---------|-------|
| TB-1 | Repository impl yok — use case çalışmıyor | 🔴 | PrismaMenuCategoryRepository |
| TB-2 | MenuModule AppModule'de değil | 🔴 | Repo binding ile birlikte register |
| TB-3 | Auth/RBAC yok — actorId optional | 🟡 | JWT guard + `@CurrentUser()` |
| TB-4 | Transaction boundary yok | 🟡 | save + event aynı TX (outbox Faz 2) |
| TB-5 | Slug collision auto-suffix yok | 🟢 | `analoglar-2` retry logic |
| TB-6 | Branch FK validation yok | 🟡 | BranchExistsPort veya TenantService |
| TB-7 | Domain enum ↔ Prisma enum duplicate | 🟢 | Mapper in infrastructure |
| TB-8 | `getMaxDisplayOrder` race condition | 🟡 | Serializable TX veya DB sequence |

---

## Sonraki Adım

1. `PrismaMenuCategoryRepository` implementasyonu  
2. `MenuModule` provider binding + `AppModule` import  
3. `MenuCategoryController` + Swagger  
4. Unit test (use case mock repository)
