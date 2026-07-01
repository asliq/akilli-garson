import { Navigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useAuthGuard } from '../hooks/useAuth'
import { usePermissions } from '../hooks/usePermissions'

export default function AuthGuard({ children }) {
  const location = useLocation()
  const { isAuthenticated, isLoading } = useAuthGuard()
  const { canAccess, defaultPath } = usePermissions()

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Loader2
            size={40}
            style={{
              color: 'var(--primary)',
              animation: 'spin 1s linear infinite',
            }}
          />
          <span style={{ color: 'var(--text-muted)' }}>Oturum kontrol ediliyor...</span>
        </motion.div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Rol bazlı erişim kontrolü
  if (!canAccess(location.pathname)) {
    return <Navigate to={defaultPath} replace />
  }

  return children
}
