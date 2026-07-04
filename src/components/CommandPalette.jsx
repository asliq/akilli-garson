import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Settings,
  LogOut,
  Moon,
  Volume2,
  RefreshCw,
  Command,
  ArrowRight,
  Hash,
} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { useLogout } from '../hooks/useAuth'
import { getAllNavCommands } from '../config/navigation'
import { MODULE_STATUS } from '../config/modules'
import styles from './CommandPalette.module.css'

const actionCommands = [
  { id: 'action-refresh', label: 'Verileri Yenile', description: 'Sayfayı yenile', icon: RefreshCw, category: 'Eylemler', action: 'refresh', shortcut: 'R' },
  { id: 'setting-theme', label: 'Tema Değiştir', description: 'Koyu/Açık tema', icon: Moon, category: 'Ayarlar', action: 'toggle-theme' },
  { id: 'setting-sound', label: 'Ses Aç/Kapat', description: 'Bildirim seslerini yönet', icon: Volume2, category: 'Ayarlar', action: 'toggle-sound' },
  { id: 'nav-settings', label: 'Ayarlar', description: 'Sistem ayarları', icon: Settings, category: 'Navigasyon', action: 'navigate', path: '/system/settings', shortcut: 'G S' },
  { id: 'system-logout', label: 'Çıkış Yap', description: 'Oturumu sonlandır', icon: LogOut, category: 'Sistem', action: 'logout' },
]

const navCommands = getAllNavCommands()
  .filter((item) => item.status === MODULE_STATUS.LIVE)
  .map((item) => ({
    id: `nav-${item.path}`,
    label: item.label,
    description: `${item.label} sayfasına git`,
    icon: item.icon,
    category: 'Navigasyon',
    action: 'navigate',
    path: item.path,
  }))

const commands = [...navCommands, ...actionCommands]

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  
  const soundEnabled = useAppStore((state) => state.soundEnabled)
  const toggleSound = useAppStore((state) => state.toggleSound)
  const theme = useAppStore((state) => state.theme)
  const setTheme = useAppStore((state) => state.setTheme)
  const logoutMutation = useLogout()

  const filteredCommands = commands.filter(cmd => {
    const searchStr = `${cmd.label} ${cmd.description} ${cmd.category}`.toLowerCase()
    return searchStr.includes(query.toLowerCase())
  })

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = []
    acc[cmd.category].push(cmd)
    return acc
  }, {})

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
      
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
      
      if (!isOpen && !e.metaKey && !e.ctrlKey) {
        if (e.key === 'g') {
          window.__gPressed = true
          setTimeout(() => { window.__gPressed = false }, 500)
        }
        
        if (window.__gPressed) {
          const shortcuts = {
            'd': '/',
            'o': '/orders',
            'k': '/kitchen',
            'm': '/menu',
            's': '/system/settings',
          }
          
          if (shortcuts[e.key]) {
            e.preventDefault()
            navigate(shortcuts[e.key])
            window.__gPressed = false
          }
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, navigate])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        executeCommand(filteredCommands[selectedIndex])
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredCommands])

  const executeCommand = useCallback((cmd) => {
    if (!cmd) return
    
    switch (cmd.action) {
      case 'navigate':
        navigate(cmd.path)
        break
      case 'refresh':
        window.location.reload()
        break
      case 'toggle-theme':
        setTheme(theme === 'dark' ? 'light' : 'dark')
        break
      case 'toggle-sound':
        toggleSound()
        break
      case 'logout':
        logoutMutation.mutate()
        navigate('/login')
        break
      default:
        break
    }
    
    setIsOpen(false)
  }, [navigate, theme, setTheme, toggleSound, logoutMutation])

  return (
    <>
      <div className={styles.triggerHint}>
        <Command size={12} />
        <span>K</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              className={styles.palette}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
            >
              <div className={styles.searchWrapper}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Komut ara veya yaz..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setSelectedIndex(0)
                  }}
                  className={styles.searchInput}
                />
                <div className={styles.searchShortcut}>
                  <span>ESC</span>
                </div>
              </div>

              <div className={styles.commandList}>
                {Object.entries(groupedCommands).map(([category, cmds]) => (
                  <div key={category} className={styles.commandGroup}>
                    <div className={styles.groupLabel}>{category}</div>
                    {cmds.map((cmd) => {
                      const globalIdx = filteredCommands.indexOf(cmd)
                      const isSelected = globalIdx === selectedIndex
                      
                      return (
                        <button
                          key={cmd.id}
                          type="button"
                          className={`${styles.commandItem} ${isSelected ? styles.selected : ''}`}
                          onClick={() => executeCommand(cmd)}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                        >
                          <div className={styles.commandIcon}>
                            <cmd.icon size={16} />
                          </div>
                          <div className={styles.commandContent}>
                            <span className={styles.commandLabel}>{cmd.label}</span>
                            <span className={styles.commandDesc}>{cmd.description}</span>
                          </div>
                          {cmd.shortcut && (
                            <div className={styles.commandShortcut}>
                              {cmd.shortcut.split(' ').map((key, i) => (
                                <span key={i}>{key}</span>
                              ))}
                            </div>
                          )}
                          {isSelected && (
                            <ArrowRight size={14} className={styles.selectArrow} />
                          )}
                        </button>
                      )
                    })}
                  </div>
                ))}
                
                {filteredCommands.length === 0 && (
                  <div className={styles.noResults}>
                    <Hash size={32} />
                    <p>Sonuç bulunamadı</p>
                    <span>Farklı bir arama deneyin</span>
                  </div>
                )}
              </div>

              <div className={styles.footer}>
                <div className={styles.footerHint}>
                  <span className={styles.key}>↑↓</span>
                  <span>Gezin</span>
                </div>
                <div className={styles.footerHint}>
                  <span className={styles.key}>↵</span>
                  <span>Seç</span>
                </div>
                <div className={styles.footerHint}>
                  <span className={styles.key}>ESC</span>
                  <span>Kapat</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}