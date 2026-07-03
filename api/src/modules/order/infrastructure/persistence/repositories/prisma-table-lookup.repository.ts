import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/database/prisma.service';
import { TableContext, TableLookupPort } from '../../../application/ports/table-lookup.port';

@Injectable()
export class PrismaTableLookupRepository implements TableLookupPort {
  constructor(private readonly prisma: PrismaService) {}

  async findActiveByToken(tableToken: string): Promise<TableContext | null> {
    const table = await this.prisma.table.findFirst({
      where: {
        tableToken,
        deletedAt: null,
        isActive: true,
        restaurant: {
          isActive: true,
        },
      },
      select: {
        id: true,
        name: true,
        restaurantId: true,
      },
    });

    if (!table) {
      return null;
    }

    return {
      tableId: table.id,
      tableName: table.name,
      restaurantId: table.restaurantId,
    };
  }
}
