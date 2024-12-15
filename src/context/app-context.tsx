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

interface AppContextState {
  aiState: string;
  backgroundUrl?: string;
  subtitleText?: string;
  modelInfo: ModelInfo;
  setAiState: (state: string) => void;
  setSubtitleText: (text: string) => void;
  setBackgroundUrl: (url: string) => void;
  setModelInfo: (info: ModelInfo) => void;
}

export const AppContext = createContext<AppContextState | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [aiState, setAiState] = useState('idle');
  const [backgroundUrl, setBackgroundUrl] = useState<string>('/bg/ceiling-window-room-night.jpeg');
  const [subtitleText, setSubtitleText] = useState<string>(
    "Hi, I'm some random AI VTuber. Who the hell are ya? Ahh, you must be amazed by my awesomeness, right? right?"
  );
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
    aiState,
    backgroundUrl,
    subtitleText,
    modelInfo,
    setAiState,
    setSubtitleText,
    setBackgroundUrl,
    setModelInfo,
  }), [
    aiState, 
    backgroundUrl, 
    subtitleText,
    modelInfo,
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};