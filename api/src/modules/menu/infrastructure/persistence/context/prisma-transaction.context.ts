import { AsyncLocalStorage } from 'async_hooks';
import { PrismaService } from '@/core/database/prisma.service';
import { PrismaTransactionClient } from '../types/prisma-transaction.client';

const storage = new AsyncLocalStorage<PrismaTransactionClient>();

export class PrismaTransactionContext {
  static run<T>(client: PrismaTransactionClient, fn: () => Promise<T>): Promise<T> {
    return storage.run(client, fn);
  }

  static getClient(prisma: PrismaService): PrismaTransactionClient {
    return storage.getStore() ?? prisma;
  }

  static isInTransaction(): boolean {
    return storage.getStore() !== undefined;
  }
}
