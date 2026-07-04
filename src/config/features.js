import { API_ENABLED } from '../api/services'

/**
 * Demo-ready staff routes. Hidden routes redirect to dashboard.
 * Customer QR flow uses separate public routes.
 */
export const STAFF_NAV_ROUTES = {
  '/': { visible: true },
  '/orders': { visible: true },
  '/kitchen': { visible: true },
  '/menu': { visible: true },
  '/tables': { visible: false },
  '/reservations': { visible: false },
  '/analytics': { visible: false },
  '/daily-report': { visible: false },
  '/waiters': { visible: false },
  '/inventory': { visible: false },
  '/settings': { visible: false },
}

export const DEMO_STAFF_PATHS = ['/', '/orders', '/kitchen', '/menu']

export function isStaffRouteVisible(path) {
  const base = path.split('/').slice(0, 2).join('/') || '/'
  if (base === '/tables' && path.startsWith('/tables/')) return false
  return STAFF_NAV_ROUTES[path]?.visible === true || STAFF_NAV_ROUTES[base]?.visible === true
}

export const MENU_UI = {
  createItem: true,
  updatePrice: true,
  availabilityToggle: false,
  deleteItem: false,
}

export const CUSTOMER_UI = {
  serviceCall: API_ENABLED.serviceCalls,
}
