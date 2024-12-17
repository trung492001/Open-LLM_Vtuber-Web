import { useState, useContext } from 'react';
import { WebSocketContext } from '@/context/websocket-context';
import { AiStateContext } from '@/context/ai-state-context';
import { useInterrupt } from '@/components/canvas/live2d';
import { audioTaskQueue } from '@/utils/task-queue';
export function useTextInput() {
  const [inputValue, setInputValue] = useState('');
  const wsContext = useContext(WebSocketContext);
  const { aiState, setAiState } = useContext(AiStateContext)!;
  const { interrupt } = useInterrupt();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue.trim() || !wsContext) return;
    if (aiState == 'thinking-speaking') {
        interrupt();
    }
    wsContext.sendMessage({
      type: 'text-input',
      text: inputValue.trim()
    });
    setInputValue('');
    audioTaskQueue.clearQueue();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return {
    inputValue,
    handleInputChange,
    handleSubmit,
    handleKeyPress
  };
} 