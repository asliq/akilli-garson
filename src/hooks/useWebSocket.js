import { useEffect, useRef, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useAppStore } from '../store/useAppStore'

export const useWebSocket = (url = null) => {
  const wsRef = useRef(null)
  const reconnectTimeoutRef = useRef(null)
  const reconnectAttempts = useRef(0)
  const queryClient = useQueryClient()
  const addNotification = useAppStore((state) => state.addNotification)

  const MAX_RECONNECT_ATTEMPTS = 5
  const RECONNECT_DELAY = 3000

  const handleMessage = useCallback((event) => {
    try {
      const data = JSON.parse(event.data)

      switch (data.type) {
        case 'CONNECTED':
          break

        case 'ORDER_CREATED':
          queryClient.invalidateQueries({ queryKey: ['orders'] })
          queryClient.invalidateQueries({ queryKey: ['stats'] })
          addNotification()
          if (data.payload?.tableNumber) {
            toast.success(`Yeni sipariş: Masa ${data.payload.tableNumber}`)
          }
          break

        case 'ORDER_UPDATED':
          queryClient.invalidateQueries({ queryKey: ['orders'] })
          if (data.payload?.id) {
            queryClient.invalidateQueries({ queryKey: ['orders', data.payload.id] })
          }
          break

        case 'TABLE_UPDATED':
          queryClient.invalidateQueries({ queryKey: ['tables'] })
          break

        case 'PAYMENT_COMPLETED':
          queryClient.invalidateQueries({ queryKey: ['orders'] })
          queryClient.invalidateQueries({ queryKey: ['tables'] })
          queryClient.invalidateQueries({ queryKey: ['payments'] })
          addNotification()
          if (data.payload?.amount) {
            toast.success(`Ödeme tamamlandı: ₺${data.payload.amount}`)
          }
          break

        case 'STOCK_ALERT':
          queryClient.invalidateQueries({ queryKey: ['inventory'] })
          addNotification()
          break

        case 'RESERVATION_NEW':
          queryClient.invalidateQueries({ queryKey: ['reservations'] })
          addNotification()
          break

        case 'CALL_WAITER':
          queryClient.invalidateQueries({ queryKey: ['serviceCalls'] })
          addNotification()
          toast('Garson çağrısı!', { icon: '🛎️' })
          break

        case 'DATA_CHANGED':
          queryClient.invalidateQueries()
          break

        default:
          break
      }
    } catch (error) {
      console.error('WebSocket mesajı işlenirken hata:', error)
    }
  }, [queryClient, addNotification])

  const connect = useCallback(() => {
    if (!url) return

    try {
      wsRef.current = new WebSocket(url)

      wsRef.current.onopen = () => {
        reconnectAttempts.current = 0
      }

      wsRef.current.onmessage = handleMessage

      wsRef.current.onerror = (error) => {
        console.error('WebSocket hatası:', error)
      }

      wsRef.current.onclose = () => {
        if (reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttempts.current += 1
            connect()
          }, RECONNECT_DELAY)
        }
      }
    } catch (error) {
      console.error('WebSocket bağlantısı kurulamadı:', error)
    }
  }, [url, handleMessage])

  const sendMessage = useCallback((message) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message))
    }
  }, [])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
  }, [])

  useEffect(() => {
    connect()
    return () => disconnect()
  }, [connect, disconnect])

  return {
    sendMessage,
    disconnect,
    reconnect: connect,
    isConnected: wsRef.current?.readyState === WebSocket.OPEN,
  }
}

export default useWebSocket
