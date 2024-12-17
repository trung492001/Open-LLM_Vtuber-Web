import { createContext, useState, ReactNode } from "react";

type AiState =
  | "idle"
  | "speaking"
  | "thinking-speaking"
  | "interrupted"
  | "loading"
  | "listening";

interface AiStateContextType {
  aiState: AiState;
  setAiState: (state: AiState) => void;
}

export const AiStateContext = createContext<AiStateContextType | null>(null);

export function AiStateProvider({ children }: { children: ReactNode }) {
  const [aiState, setAiState] = useState<AiState>("idle");

  return (
    <AiStateContext.Provider value={{ aiState, setAiState }}>
      {children}
    </AiStateContext.Provider>
  );
}
