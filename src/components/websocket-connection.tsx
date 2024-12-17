import { useContext } from 'react';
import { AiStateContext } from '@/context/ai-state-context';
import { useWebSocket, MessageEvent } from '@/hooks/use-websocket';
import { WebSocketContext } from '@/context/websocket-context';
import { L2DContext } from '@/context/l2d-context';
import { SubtitleContext } from '@/context/subtitle-context';
import { audioTaskQueue } from '@/utils/task-queue';
import { ResponseContext } from '@/context/response-context';
import { useAudioTask } from '@/components/canvas/live2d';

let wsUrl = "ws://127.0.0.1:12393/client-ws";

function WebSocketConnection({ children }: { children: React.ReactNode }) {
  const { aiState, setAiState } = useContext(AiStateContext)!;
  const { setModelInfo } = useContext(L2DContext)!;
  const { setSubtitleText } = useContext(SubtitleContext)!;
  const { clearResponse } = useContext(ResponseContext)!;
  const { addAudioTask } = useAudioTask();

  const handleWebSocketMessage = (message: MessageEvent) => {
    console.log('Received message from server:', message);
    switch (message.type) {
      case 'control':
        if (message.text) {
          handleControlMessage(message.text);
        }
        break;
      case "set-model":
        console.log("set-model: ", message.model_info);
        if (message.model_info) {
          const modelUrl = wsUrl.replace("ws:", window.location.protocol).replace("/client-ws", "") + message.model_info.url;
          message.model_info.url = modelUrl;
        }
        setAiState('loading');
        setModelInfo(message.model_info);
        setAiState('idle');
        break;
      case 'full-text':
        if (message.text) {
          setSubtitleText(message.text);
        }
        break;
      case 'config-files':
        break;
      case 'background-files':
        break;
      case 'audio':
        if (aiState === 'interrupted') {
          console.log('Audio playback intercepted. Sentence:', message.text);
        } else {
          addAudioTask({
            audio_base64: message.audio || '',
            volumes: message.volumes || [],
            slice_length: message.slice_length || 0,
            text: message.text || null,
            expression_list: message.expressions || null
          });
        }
        break;
      default:
        console.warn('Unknown message type:', message.type);
    }
  };

  const handleControlMessage = (controlText: string) => {
    if (typeof controlText !== 'string') return;
    
    switch (controlText) {
      case 'start-mic':
        break;
      case 'stop-mic':
        break;
      case 'conversation-chain-start':
        setAiState('thinking-speaking');
        audioTaskQueue.clearQueue();
        clearResponse();
        break;
      case 'conversation-chain-end':
        setAiState('idle');
        break;
      default:
        console.warn('Unknown control command:', controlText);
    }
  };

  const { sendMessage, wsState, reconnect } = useWebSocket({
    url: wsUrl,
    onMessage: handleWebSocketMessage,
    onOpen: () => {
      console.log('WebSocket connection opened');
    },
    onClose: () => {
      console.log('WebSocket connection closed');
    },
  });

  const webSocketContextValue = {
    sendMessage,
    wsState,
    reconnect,
  };

  return (
    <WebSocketContext.Provider value={webSocketContextValue}>
      {children}
    </WebSocketContext.Provider>
  );
}

export default WebSocketConnection;