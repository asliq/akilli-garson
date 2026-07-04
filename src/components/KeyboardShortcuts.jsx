import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function KeyboardShortcuts() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'n':
            e.preventDefault()
            navigate('/orders')
            break
          case 'h':
            e.preventDefault()
            navigate('/')
            break
          case 'm':
            e.preventDefault()
            navigate('/menu')
            break
          case 'k':
            e.preventDefault()
            navigate('/kitchen')
            break
          default:
            break
        }
      }

      if (e.key === 'Escape') {
        const dialogs = document.querySelectorAll('[role="dialog"]')
        if (dialogs.length > 0) {
          e.preventDefault()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [navigate])

  return null
}

export function KeyboardShortcutsHelp({ isOpen, onClose }) {
  if (!isOpen) return null

  const shortcuts = [
    { key: 'Ctrl+H', desc: 'Anasayfa' },
    { key: 'Ctrl+N', desc: 'Siparişler' },
    { key: 'Ctrl+M', desc: 'Menü Yönetimi' },
    { key: 'Ctrl+K', desc: 'Mutfak' },
    { key: 'ESC', desc: 'Dialog kapat' },
  ]

  return (
    <>
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 1000
      }} onClick={onClose} />
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'var(--bg-card)',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-xl)',
        zIndex: 1001,
        minWidth: '400px'
      }}>
        <h2 style={{ marginBottom: '1.5rem' }}>⌨️ Klavye Kısayolları</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {shortcuts.map(({ key, desc }) => (
            <div key={key} style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              background: 'var(--bg-page)',
              borderRadius: 'var(--radius)'
            }}>
              <span>{desc}</span>
              <kbd style={{
                padding: '0.25rem 0.5rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.875rem',
                fontFamily: 'monospace'
              }}>{key}</kbd>
            </div>
          ))}
        </div>
        <button 
          onClick={onClose}
          style={{
            marginTop: '1.5rem',
            width: '100%',
            padding: '0.75rem',
            background: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius)',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Kapat
        </button>
      </div>
    </>
  )
}
