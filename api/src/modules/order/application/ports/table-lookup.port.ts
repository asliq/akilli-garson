export interface TableContext {
  tableId: string;
  tableName: string;
  restaurantId: string;
}

export interface TableLookupPort {
  findActiveByToken(tableToken: string): Promise<TableContext | null>;
}
