import { useMemo } from 'react'
import { useOrders } from './useOrders'
import { useTables } from './useTables'

// /stats endpoint yoktur — orders ve tables'dan client-side hesapla
export function useStats() {
  const { data: orders, isLoading: ordersLoading } = useOrders()
  const { data: tables, isLoading: tablesLoading } = useTables()

  const stats = useMemo(() => {
    if (!orders || !tables) return null

    const today = new Date().toDateString()
    const todayOrders = orders.filter(
      o => new Date(o.createdAt).toDateString() === today
    )

    const todayRevenue = todayOrders.reduce((sum, o) => sum + (o.total || 0), 0)
    const completedOrders = todayOrders.filter(o =>
      o.status === 'completed' || o.status === 'paid'
    ).length
    const activeOrders = orders.filter(o =>
      ['pending', 'preparing', 'ready'].includes(o.status)
    ).length
    const avgOrderValue =
      todayOrders.length > 0 ? todayRevenue / todayOrders.length : 0

    const availableTables = tables.filter(t => t.status === 'available').length
    const occupiedTables = tables.filter(t => t.status === 'occupied').length
    const reservedTables = tables.filter(t => t.status === 'reserved').length

    return {
      todayRevenue,
      todayOrders: todayOrders.length,
      activeOrders,
      completedOrders,
      avgOrderValue,
      availableTables,
      occupiedTables,
      reservedTables,
      totalTables: tables.length,
    }
  }, [orders, tables])

  return {
    data: stats,
    isLoading: ordersLoading || tablesLoading,
  }
}
