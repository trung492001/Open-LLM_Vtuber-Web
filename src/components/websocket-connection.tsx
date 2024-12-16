import { useContext } from 'react';
import { AiStateContext } from '../context/aistate-context';
import { useWebSocket, MessageEvent } from '../hooks/use-websocket';
import { WebSocketContext } from '../context/websocket-context';

function WebSocketConnection({ children }: { children: React.ReactNode }) {
  const { setAiState } = useContext(AiStateContext)!;
  (window as any).setAiState = setAiState;

  const handleWebSocketMessage = (message: MessageEvent) => {
    console.log('Received message from server:', message);
    switch (message.type) {
      case 'full-text':
        break;
      case 'control':
        if (message.text) {
          handleControlMessage(message.text);
        }
        break;
      case 'config-files':
        break;
      case 'background-files':
        break;
      default:
        console.warn('Unknown message type:', message.type);
    }
  };

  const handleControlMessage = (controlText: string) => {
    switch (controlText) {
      case 'start-mic':
        break;
      case 'stop-mic':
        break;
      case 'conversation-chain-start':
        break;
      case 'conversation-chain-end':
        setAiState('idle');
        break;
      default:
        console.warn('Unknown control command:', controlText);
    }
  };

  const { sendMessage, wsState, reconnect } = useWebSocket({
    url: 'ws://127.0.0.1:12393/client-ws',
    onMessage: handleWebSocketMessage,
    onOpen: () => {
      console.log('WebSocket connection opened');
    },
    onClose: () => {
      console.log('WebSocket connection closed');
    },
  });

  const webSocketContextValue = {
    sendMessage,
    wsState,
    reconnect,
  };

  return (
    <WebSocketContext.Provider value={webSocketContextValue}>
      {children}
    </WebSocketContext.Provider>
  );
}

export default WebSocketConnection;