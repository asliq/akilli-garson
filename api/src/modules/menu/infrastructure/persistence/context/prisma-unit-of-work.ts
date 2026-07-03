import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/database/prisma.service';
import { PrismaTransactionClient } from '../types/prisma-transaction.client';
import { PrismaTransactionContext } from './prisma-transaction.context';

export type AfterCommitCallback = () => void | Promise<void>;

export interface UnitOfWorkContext {
  readonly client: PrismaTransactionClient;
  afterCommit(callback: AfterCommitCallback): void;
}

@Injectable()
export class PrismaUnitOfWork {
  constructor(private readonly prisma: PrismaService) {}

  async runInTransaction<T>(work: (ctx: UnitOfWorkContext) => Promise<T>): Promise<T> {
    const afterCommitCallbacks: AfterCommitCallback[] = [];

    const result = await this.prisma.$transaction(async (tx) => {
      const ctx: UnitOfWorkContext = {
        client: tx,
        afterCommit: (callback) => {
          afterCommitCallbacks.push(callback);
        },
      };

      return PrismaTransactionContext.run(tx, () => work(ctx));
    });

    for (const callback of afterCommitCallbacks) {
      await callback();
    }

    return result;
  }
}
