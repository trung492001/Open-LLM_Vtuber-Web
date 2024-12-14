import React, { createContext, useState } from 'react';

interface AppState {
  state: string;
  setState: (state: string) => void;
}

export const StateContext = createContext<AppState | null>(null);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 'idle'、'thinking-speaking'、'interrupted'
  const [state, setState] = useState('idle');

  return (
    <StateContext.Provider value={{ state, setState}}>
      {children}
    </StateContext.Provider>
  );
};