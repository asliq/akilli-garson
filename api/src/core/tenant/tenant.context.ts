import { AsyncLocalStorage } from 'async_hooks';

export interface TenantContext {
  restaurantId: string;
  userId?: string;
  role?: string;
}

export const tenantStorage = new AsyncLocalStorage<TenantContext>();

export function getTenantContext(): TenantContext | undefined {
  return tenantStorage.getStore();
}

export function getRestaurantId(): string | undefined {
  return tenantStorage.getStore()?.restaurantId;
}
