import { useEffect, useRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useAppStore } from '../store/useAppStore';

export const useWebSocket = (url = null) => {
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const simulationCleanupRef = useRef(null);
  const reconnectAttempts = useRef(0);
  const queryClient = useQueryClient();
  const addNotification = useAppStore((state) => state.addNotification);

  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 3000;

  const handleMessage = useCallback((event) => {
    try {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'ORDER_CREATED':
          queryClient.invalidateQueries({ queryKey: ['orders'] });
          queryClient.invalidateQueries({ queryKey: ['stats'] });
          addNotification();
          toast.success(`Yeni sipariş: Masa ${data.payload.tableNumber}`);
          break;

        case 'ORDER_UPDATED':
          queryClient.invalidateQueries({ queryKey: ['orders'] });
          queryClient.invalidateQueries({ queryKey: ['orders', data.payload.id] });
          addNotification();
          break;

        case 'TABLE_UPDATED':
          queryClient.invalidateQueries({ queryKey: ['tables'] });
          queryClient.invalidateQueries({ queryKey: ['tables', data.payload.id] });
          addNotification();
          break;

        case 'KITCHEN_ORDER':
          queryClient.invalidateQueries({ queryKey: ['orders'] });
          toast('🍳 Mutfak siparişi hazırlanıyor', { icon: '👨‍🍳' });
          break;

        case 'PAYMENT_COMPLETED':
          queryClient.invalidateQueries({ queryKey: ['orders'] });
          queryClient.invalidateQueries({ queryKey: ['tables'] });
          queryClient.invalidateQueries({ queryKey: ['stats'] });
          addNotification();
          toast.success(`💰 Ödeme tamamlandı: ${data.payload.amount} TL`);
          break;

        case 'STOCK_ALERT':
          queryClient.invalidateQueries({ queryKey: ['inventory'] });
          addNotification();
          toast.error(`⚠️ Düşük stok: ${data.payload.itemName}`);
          break;

        case 'RESERVATION_NEW':
          queryClient.invalidateQueries({ queryKey: ['reservations'] });
          addNotification();
          toast(`📅 Yeni rezervasyon: ${data.payload.customerName}`, { icon: '🎉' });
          break;

        default:
          console.log('Bilinmeyen mesaj tipi:', data.type);
      }
    } catch (error) {
      console.error('WebSocket mesajı işlenirken hata:', error);
    }
  }, [queryClient, addNotification]);

  const simulateWebSocketEvents = useCallback(() => {
    const intervalId = setInterval(() => {
      const events = [
        {
          type: 'ORDER_CREATED',
          payload: { id: Date.now(), tableNumber: Math.floor(Math.random() * 12) + 1, status: 'pending' }
        },
        {
          type: 'ORDER_UPDATED',
          payload: { id: Date.now(), status: 'preparing' }
        },
        {
          type: 'TABLE_UPDATED',
          payload: { id: Math.floor(Math.random() * 12) + 1, number: Math.floor(Math.random() * 12) + 1, status: 'occupied' }
        },
        {
          type: 'KITCHEN_ORDER',
          payload: { orderId: Date.now(), items: [] }
        }
      ];

      const randomEvent = events[Math.floor(Math.random() * events.length)];
      handleMessage({ data: JSON.stringify(randomEvent) });
    }, 30000);

    // Return cleanup so connect() can store it
    return () => clearInterval(intervalId);
  }, [handleMessage]);

  const connect = useCallback(() => {
    if (!url) {
      // Simülasyon modu — cleanup'ı kaydet
      if (simulationCleanupRef.current) {
        simulationCleanupRef.current();
      }
      simulationCleanupRef.current = simulateWebSocketEvents();
      return;
    }

    try {
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        reconnectAttempts.current = 0;
        toast.success('🔌 Canlı güncellemeler aktif');
      };

      wsRef.current.onmessage = handleMessage;

      wsRef.current.onerror = (error) => {
        console.error('WebSocket hatası:', error);
      };

      wsRef.current.onclose = () => {
        if (reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttempts.current += 1;
            connect();
          }, RECONNECT_DELAY);
        } else {
          toast.error('Canlı güncellemeler devre dışı');
        }
      };
    } catch (error) {
      console.error('WebSocket bağlantısı kurulamadı:', error);
    }
  }, [url, handleMessage, simulateWebSocketEvents]);

  const sendMessage = useCallback((message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  }, []);

  const disconnect = useCallback(() => {
    // Simülasyon cleanup
    if (simulationCleanupRef.current) {
      simulationCleanupRef.current();
      simulationCleanupRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    sendMessage,
    disconnect,
    reconnect: connect,
    isConnected: wsRef.current?.readyState === WebSocket.OPEN
  };
};

export default useWebSocket;
