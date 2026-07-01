import { createContext, useContext } from 'react'
import { useWebSocket } from '../hooks/useWebSocket'

const WebSocketContext = createContext(null)

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error('useWebSocketContext must be used within WebSocketProvider')
  }
  return context
}

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001/ws'

export const WebSocketProvider = ({ children }) => {
  const ws = useWebSocket(WS_URL)

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )
}

export default WebSocketProvider
