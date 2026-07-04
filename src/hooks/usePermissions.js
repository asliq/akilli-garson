import { useMemo } from 'react'
import { useAppStore } from '../store/useAppStore'
import { NAV_SECTIONS } from '../config/navigation'

const KITCHEN_ONLY = ['/kitchen']

export function usePermissions() {
  const activeWaiter = useAppStore((state) => state.activeWaiter)
  const role = activeWaiter?.role || 'waiter'

  const allPaths = useMemo(
    () => NAV_SECTIONS.flatMap((s) => s.items.map((i) => i.path)),
    [],
  )

  const canAccess = (path) => {
    if (role === 'kitchen') {
      return KITCHEN_ONLY.some((p) => path === p || path.startsWith(`${p}/`))
    }
    return allPaths.some((p) => path === p || (p !== '/' && path.startsWith(p)))
  }

  const defaultPath = role === 'kitchen' ? '/kitchen' : '/'

  return {
    role,
    canAccess,
    defaultPath,
    isAdmin: role === 'admin' || role === 'manager',
    isKitchen: role === 'kitchen',
  }
}
