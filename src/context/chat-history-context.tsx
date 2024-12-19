import React, { createContext, useContext, useState } from 'react';
import { Message } from '@/types/message';

interface ChatHistoryContextProps {
  messages: Message[];
  historyUids: string[];
  currentHistoryUid: string | null;
  appendHumanMessage: (content: string) => void;
  appendAIMessage: (content: string) => void;
  setMessages: (messages: Message[]) => void;
  setHistoryUids: (uids: string[]) => void;
  setCurrentHistoryUid: (uid: string | null) => void;
}

export const ChatHistoryContext = createContext<ChatHistoryContextProps | null>(null);

export function ChatHistoryProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [historyUids, setHistoryUids] = useState<string[]>([]);
  const [currentHistoryUid, setCurrentHistoryUid] = useState<string | null>(null);

  const appendHumanMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'human',
      timestamp: new Date().toISOString(),
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const appendAIMessage = (content: string) => {
    setMessages(prevMessages => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      
      if (lastMessage && lastMessage.role === 'ai') {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          ...lastMessage,
          content: lastMessage.content + content,
        };
        return updatedMessages;
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        content,
        role: 'ai',
        timestamp: new Date().toISOString(),
      };
      return [...prevMessages, newMessage];
    });
  };

  return (
    <ChatHistoryContext.Provider 
      value={{ 
        messages, 
        historyUids,
        currentHistoryUid,
        appendHumanMessage, 
        appendAIMessage, 
        setMessages,
        setHistoryUids,
        setCurrentHistoryUid,
      }}
    >
      {children}
    </ChatHistoryContext.Provider>
  );
}

export const useChatHistory = () => {
  const context = useContext(ChatHistoryContext);
  if (!context) {
    throw new Error('useChatHistory must be used within a ChatHistoryProvider');
  }
  return context;
}; 