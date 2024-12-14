import { useContext } from 'react';
import { StateContext } from '../context/state-context';
import { useWebSocket, MessageEvent } from '../hooks/use-websocket';
import { WebSocketContext } from '../context/websocket-context';

const WebSocketHandler = ({ children }: { children: React.ReactNode }) => {
    const { setState } = useContext(StateContext)!;
    // (window as any).setState = setState;

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
                setState('idle');
                break;
            default:
                console.warn('Unknown control command:', controlText);
        }
    };

    const { sendMessage, wsState, reconnect } = useWebSocket({
        url: 'ws://127.0.0.1:1017/client-ws',
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
};

export default WebSocketHandler;