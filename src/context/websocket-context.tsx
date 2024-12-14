import React from 'react';

interface WebSocketContextProps {
    sendMessage: (message: object) => void;
    wsState: string;
    reconnect: () => void;
}

export const WebSocketContext = React.createContext<WebSocketContextProps | null>(null);
