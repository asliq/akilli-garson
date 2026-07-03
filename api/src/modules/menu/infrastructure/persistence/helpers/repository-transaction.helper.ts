import { PrismaService } from '@/core/database/prisma.service';
import { PrismaTransactionContext } from '../context/prisma-transaction.context';

export async function runInRepositoryTransaction(
  prisma: PrismaService,
  work: () => Promise<void>,
): Promise<void> {
  if (PrismaTransactionContext.isInTransaction()) {
    await work();
    return;
  }

  await prisma.$transaction(async (tx) => {
    await PrismaTransactionContext.run(tx, work);
  });
}
