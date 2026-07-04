import { useMemo } from 'react'
import { useAppStore } from '../store/useAppStore'

const ROLE_ACCESS = {
  admin: ['/', '/orders', '/kitchen', '/menu'],
  manager: ['/', '/orders', '/kitchen', '/menu'],
  waiter: ['/', '/orders', '/kitchen', '/menu'],
  kitchen: ['/kitchen'],
}

const DEFAULT_ROLE = 'waiter'

export function usePermissions() {
  const activeWaiter = useAppStore((state) => state.activeWaiter)
  const role = activeWaiter?.role || DEFAULT_ROLE

  const allowedPaths = useMemo(() => ROLE_ACCESS[role] || ROLE_ACCESS.waiter, [role])

  const canAccess = (path) => {
    if (role === 'admin') return true
    return allowedPaths.some(p => path === p || path.startsWith(p + '/'))
  }

  const defaultPath = role === 'kitchen' ? '/kitchen' : '/'

  return { role, allowedPaths, canAccess, defaultPath, isAdmin: role === 'admin', isKitchen: role === 'kitchen' }
}
