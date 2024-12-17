import React, { createContext, useState, useMemo } from 'react';

export interface ModelInfo {
  name?: string;
  description?: string;
  url: string;
  kScale: number;
  initialXshift: number;
  initialYshift: number;
  kXOffset?: number;
  idleMotionGroupName?: string;
  emotionMap?: {
    [key: string]: number;
  };
}

interface L2DContextState {
  modelInfo: ModelInfo | null;
  setModelInfo: (info: ModelInfo | null) => void;
}

export const L2DContext = createContext<L2DContextState | null>(null);

export const L2DProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null);
  
  const value = useMemo(() => ({
    modelInfo,
    setModelInfo,
  }), [modelInfo]);

  return (
    <L2DContext.Provider value={value}>
      {children}
    </L2DContext.Provider>
  );
};