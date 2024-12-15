import { useState, useContext } from 'react';
import { WebSocketContext } from '@/context/websocket-context';

export function useTextInput() {
  const [inputValue, setInputValue] = useState('');
  const wsContext = useContext(WebSocketContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue.trim() || !wsContext) return;

    wsContext.sendMessage({
      type: 'text-input',
      text: inputValue.trim()
    });

    setInputValue('');
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