import { motion } from 'framer-motion'
import styles from './Button.module.css'

const variantClass = {
  primary: styles.btnPrimary,
  secondary: styles.btnSecondary,
  outline: styles.btnOutline,
  ghost: styles.btnGhost,
  success: styles.btnSuccess,
  warning: styles.btnWarning,
  danger: styles.btnDanger,
}

const sizeClass = {
  small: styles.btnSmall,
  medium: styles.btn,
  large: styles.btnLarge,
}

export function Button({ 
  children,
  variant = 'primary',
  size = 'medium',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        ${styles.btn}
        ${variantClass[variant] || styles.btnPrimary}
        ${sizeClass[size] || styles.btn}
        ${fullWidth ? styles.btnBlock : ''}
        ${loading ? styles.loading : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className={styles.spinner}>
          <svg viewBox="0 0 24 24" fill="none">
            <circle 
              cx="12" cy="12" r="10" 
              stroke="currentColor" 
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.25"
            />
            <path 
              d="M12 2a10 10 0 0 1 10 10" 
              stroke="currentColor" 
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
      )}
      {Icon && iconPosition === 'left' && !loading && (
        <Icon size={size === 'small' ? 16 : size === 'large' ? 22 : 18} />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && !loading && (
        <Icon size={size === 'small' ? 16 : size === 'large' ? 22 : 18} />
      )}
    </motion.button>
  )
}

export function IconButton({
  icon: Icon,
  variant = 'ghost',
  size = 'medium',
  className = '',
  ...props
}) {
  const iconSizes = {
    small: 16,
    medium: 20,
    large: 24,
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${styles.btn} ${styles.btnIcon} ${variantClass[variant] || styles.btnGhost} ${className}`}
      {...props}
    >
      <Icon size={iconSizes[size]} />
    </motion.button>
  )
}

