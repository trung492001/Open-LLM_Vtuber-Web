import { createContext, useState } from 'react';

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
interface L2DContextType {
  modelInfo?: ModelInfo;
  setModelInfo: (info: L2DContextType['modelInfo']) => void;
}

export const L2DContext = createContext<L2DContextType | null>(null);

export const L2DProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modelInfo, setModelInfo] = useState<L2DContextType['modelInfo']>();

  return (
    <L2DContext.Provider value={{ modelInfo, setModelInfo}}>
      {children}
    </L2DContext.Provider>
  );
};