import React, { createContext, useState, useMemo } from 'react';

interface ModelInfo {
  name: string;
  description: string;
  url: string;
  kScale: number;
  initialXshift: number;
  initialYshift: number;
  kXOffset?: number;
  idleMotionGroupName: string;
  emotionMap: {
    [key: string]: number;
  };
}

interface L2DContextState {
  modelInfo: ModelInfo;
  setModelInfo: (info: ModelInfo) => void;
}

export const L2DContext = createContext<L2DContextState | null>(null);

export const L2DProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modelInfo, setModelInfo] = useState<ModelInfo>({
    name: "Elaina",
    description: "Elaina",
    url: "live2d-models/LSS/LSS.model3.json",
    kScale: 0.0007,
    initialXshift: 0,
    initialYshift: 0,
    idleMotionGroupName: "idle",
    emotionMap: {
        "neutral": 0,
        "coldness": 1,
        "disgust": 1,
        "sad": 2,
        "worry": 2,
        "confusion": 3,
        "anger": 4,
        "surprise": 5,
        "expectation": 5,
        "joy": 6,
        "excitement": 7,
        "pride": 8,
        "shy": 9,
        "stunned": 10,
        "embarrassed": 11,
        "play_cool": 12,
        "drink_tea": 13
    }
  });

  // const [modelInfo, setModelInfo] = useState<ModelInfo>({
  //   name: "shizuku-local",
  //   description: "Orange-Haired Girl, locally available. no internet required.",
  //   url: "/live2d-models/shizuku/shizuku.model.json",
  //   kScale: 0.000625,
  //   initialXshift: 0,
  //   initialYshift: 0,
  //   kXOffset: 1150,
  //   idleMotionGroupName: "Idle",
  //   emotionMap: {
  //     "neutral": 0,
  //     "anger": 2,
  //     "disgust": 2,
  //     "fear": 1,
  //     "joy": 3,
  //     "smirk": 3,
  //     "sadness": 1,
  //     "surprise": 3
  //   }
  // });

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