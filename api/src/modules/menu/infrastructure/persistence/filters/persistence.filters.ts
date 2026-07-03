export function tenantWhere(restaurantId: string): { restaurantId: string } {
  return { restaurantId };
}

export function notDeletedWhere(): { deletedAt: null } {
  return { deletedAt: null };
}

export function activeTenantWhere(restaurantId: string): {
  restaurantId: string;
  deletedAt: null;
} {
  return {
    ...tenantWhere(restaurantId),
    ...notDeletedWhere(),
  };
}

export function branchScopeWhere(branchId: string | null): { branchId: string | null } {
  return { branchId };
}
