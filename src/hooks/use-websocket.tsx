import { useState, useEffect, useRef, useCallback } from 'react';
import { ModelInfo } from '../context/l2d-context';
import { Message } from '@/types/message';
import { HistoryInfo } from '@/context/websocket-context';

interface BackgroundFile {
  name: string;
  url: string;
}


interface MessageEvent {
  type: string;
  audio?: string;
  volumes?: number[];
  slice_length?: number;
  files?: BackgroundFile[];
  expressions?: string[];
  text?: string;
  model_info?: ModelInfo;
  conf_name?: string;
  conf_uid?: string;
  uids?: string[];
  messages?: Message[];
  history_uid?: string;
  success?: boolean;
  histories?: HistoryInfo[];
}

interface UseWebSocketProps {
  url: string;
  onMessage: (message: MessageEvent) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

type WebSocketState = 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED';

export function useWebSocket({
  url,
  onMessage,
  onOpen,
  onClose,
}: UseWebSocketProps) {
  const [wsState, setWsState] = useState<WebSocketState>('CLOSED');
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;
    setWsState('CONNECTING');

    ws.onopen = () => {
      setWsState('OPEN');
      onOpen?.();
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        onMessage(message);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      setWsState('CLOSED');
      onClose?.();
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setWsState('CLOSED');
    };
  }, [url, onMessage, onOpen, onClose]);

  useEffect(() => {
    connect();
    return () => wsRef.current?.close();
  }, []);

  const sendMessage = useCallback((message: object) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not open. Unable to send message:', message);
    }
  }, []);

  return {
    sendMessage,
    wsState,
    reconnect: connect
  };
}

export type { MessageEvent };