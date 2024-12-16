import React, { createContext, useState, useMemo } from 'react';

interface AiStateContextState {
  aiState: string;
  setAiState: (state: string) => void;
}

export const AiStateContext = createContext<AiStateContextState | null>(null);

export const AiStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [aiState, setAiState] = useState('idle');

  const value = useMemo(() => ({
    aiState,
    setAiState,
  }), [aiState]);

  return (
    <AiStateContext.Provider value={value}>
      {children}
    </AiStateContext.Provider>
  );
};