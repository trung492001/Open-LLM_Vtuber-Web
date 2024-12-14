import {
  useState, useEffect, useRef, useCallback,
} from 'react';

interface MessageEvent<> {
    type: string;
    text?: string;
    audio?: string;
    volumes?: number[];
    slice_length?: number;
    files?: string[];
    expressions?: string[];
    // [key: string]: any;
}

interface UseWebSocketProps {
    url: string;
    onMessage: (message: MessageEvent) => void;
    onOpen?: () => void;
    onClose?: () => void;
    protocols?: string | string[];
}

interface UseWebSocketReturn {
    sendMessage: (message: object) => void;
    wsState: WebSocketState;
    reconnect: () => void;
}

type WebSocketState = 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED';

export function useWebSocket(props: UseWebSocketProps): UseWebSocketReturn {
  const {
    url, onMessage, onOpen, onClose, protocols,
  } = props;
  const [wsState, setWsState] = useState<WebSocketState>('CLOSED');
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    const ws = new WebSocket(url, protocols);
    wsRef.current = ws;
    setWsState('CONNECTING');

    ws.onopen = () => {
      setWsState('OPEN');
      if (onOpen) {
        onOpen();
      }
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
      if (onClose) {
        onClose();
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }, [url, onMessage, onOpen, onClose, protocols]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  const sendMessage = useCallback((message: object) => {
    if (wsRef.current && wsState === 'OPEN') {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not open. Unable to send message:', message);
    }
  }, [wsState]);

  const reconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    connect();
  }, [connect]);

  return {
    sendMessage,
    wsState,
    reconnect,
  };
}

export type { MessageEvent };
