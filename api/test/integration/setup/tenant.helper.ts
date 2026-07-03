import { tenantStorage } from '@/core/tenant/tenant.context';

export function runWithTenant<T>(restaurantId: string, fn: () => Promise<T>): Promise<T> {
  return tenantStorage.run({ restaurantId }, fn);
}

export function runWithoutTenant<T>(fn: () => Promise<T>): Promise<T> {
  return tenantStorage.run({ restaurantId: undefined as unknown as string }, fn);
}
