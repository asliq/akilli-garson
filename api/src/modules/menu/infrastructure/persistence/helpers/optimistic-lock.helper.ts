import { ConflictException } from '@/shared/exceptions/conflict.exception';

export interface OptimisticLockContext {
  entityType: string;
  id: string;
  expectedVersion: number;
}

export function assertOptimisticLock(updateCount: number, context: OptimisticLockContext): void {
  if (updateCount === 0) {
    throw new ConflictException(`Concurrent modification detected on ${context.entityType}`, {
      id: context.id,
      expectedVersion: context.expectedVersion,
    });
  }
}
