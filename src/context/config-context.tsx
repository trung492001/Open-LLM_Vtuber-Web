import React, { createContext, useContext, useState } from 'react';

interface ConfigContextProps {
  confName: string;
  confUid: string;
  setConfName: (name: string) => void;
  setConfUid: (uid: string) => void;
}

export const ConfigContext = createContext<ConfigContextProps | null>(null);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [confName, setConfName] = useState<string>('');
  const [confUid, setConfUid] = useState<string>('');

  return (
    <ConfigContext.Provider value={{ confName, confUid, setConfName, setConfUid }}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}; 