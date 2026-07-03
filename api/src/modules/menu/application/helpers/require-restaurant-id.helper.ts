import { getRestaurantId } from '@/core/tenant/tenant.context';
import { DomainException } from '@/shared/exceptions/domain.exception';

export function requireRestaurantId(): string {
  const restaurantId = getRestaurantId();

  if (!restaurantId) {
    throw new DomainException(
      'Restaurant context is required',
      'TENANT_CONTEXT_REQUIRED',
      401,
    );
  }

  return restaurantId;
}
