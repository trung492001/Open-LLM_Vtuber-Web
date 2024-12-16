import React, { createContext, useState, useMemo } from 'react';

interface BgUrlContextState {
  backgroundUrl: string;
  setBackgroundUrl: (url: string) => void;
}

export const BgUrlContext = createContext<BgUrlContextState | null>(null);

export const BgUrlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [backgroundUrl, setBackgroundUrl] = useState<string>('/bg/ceiling-window-room-night.jpeg');

  const value = useMemo(() => ({
    backgroundUrl,
    setBackgroundUrl,
  }), [backgroundUrl]);

  return (
    <BgUrlContext.Provider value={value}>
      {children}
    </BgUrlContext.Provider>
  );
};