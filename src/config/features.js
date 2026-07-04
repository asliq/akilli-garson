import { API_ENABLED } from '../api/services'
import { MODULE_STATUS } from './modules'

/**
 * Demo Edition feature flags.
 * Navigation shows full ERP structure; live vs roadmap is defined per module.
 */
export const DEMO_EDITION_FLAGS = {
  showFullNavigation: true,
  showRoadmapModules: true,
  showDemoBadge: true,
}

export const STAFF_NAV_ROUTES = {
  '/': { visible: true, status: MODULE_STATUS.LIVE },
  '/orders': { visible: true, status: MODULE_STATUS.LIVE },
  '/kitchen': { visible: true, status: MODULE_STATUS.LIVE },
  '/menu': { visible: true, status: MODULE_STATUS.LIVE },
  '/orders/qr': { visible: true, status: MODULE_STATUS.ROADMAP },
  '/menu/categories': { visible: true, status: MODULE_STATUS.ROADMAP },
  '/restaurant/tables': { visible: true, status: MODULE_STATUS.ROADMAP },
  '/restaurant/staff': { visible: true, status: MODULE_STATUS.ROADMAP },
  '/restaurant/reservations': { visible: true, status: MODULE_STATUS.ROADMAP },
  '/operations/inventory': { visible: true, status: MODULE_STATUS.ROADMAP },
  '/operations/payments': { visible: true, status: MODULE_STATUS.ROADMAP },
  '/operations/reports': { visible: true, status: MODULE_STATUS.ROADMAP },
  '/system/settings': { visible: true, status: MODULE_STATUS.LIVE },
  '/system/health': { visible: true, status: MODULE_STATUS.LIVE },
}

export function isStaffRouteVisible(path) {
  if (DEMO_EDITION_FLAGS.showFullNavigation) return true
  const base = path.split('/').slice(0, 2).join('/') || '/'
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
