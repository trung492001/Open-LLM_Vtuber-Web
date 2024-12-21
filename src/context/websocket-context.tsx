import React from 'react';

export interface HistoryInfo {
  uid: string;
  latest_message: {
    role: 'human' | 'ai';
    timestamp: string;
    content: string;
  } | null;
  timestamp: string | null;
}

interface WebSocketContextProps {
  sendMessage: (message: object) => void;
  wsState: string;
  reconnect: () => void;
  histories: HistoryInfo[];
  setHistories: (histories: HistoryInfo[]) => void;
}

export const WebSocketContext = React.createContext<WebSocketContextProps | null>(null);