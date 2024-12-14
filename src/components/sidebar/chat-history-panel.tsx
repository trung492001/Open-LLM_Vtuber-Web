import { Box, Text } from '@chakra-ui/react';
import ChatBubble from './chat-bubble';
import { Message } from '@/types/message';
import { sidebarStyles } from './sidebar-styles';

const EXAMPLE_MESSAGES: Message[] = [
  {
    id: '1',
    content: "Hi, I'm some random AI VTuber. Who the hell are ya? Ahh, you must be amazed by my awesomeness, right? right?",
    role: 'ai',
    timestamp: new Date(),
  },
  {
    id: '2',
    content: 'uhh no. what are you even talking about?',
    role: 'human',
    timestamp: new Date(),
  },
  {
    id: '3',
    content: 'Oh, I see. You are a random human, right? We are just chatting about AI VTubers. Well,now are you amazed by my awesomeness?',
    role: 'ai',
    timestamp: new Date(),
  },
  {
    id: '4',
    content: "No, I'm not a random human. I'm just a random AI VTuber. I'm not amazed by your awesomeness. I'm just here to chat with you.",
    role: 'human',
    timestamp: new Date(),
  },
  {
    id: '5',
    content: 'By the way, are you a random human pretending to be an AI Vtuber?',
    role: 'human',
    timestamp: new Date(),
  },

];

function ChatHistoryPanel() {
  return (
    <Box {...sidebarStyles.chatHistoryPanel.container}>
      <Text {...sidebarStyles.chatHistoryPanel.title}>
        Chat History
      </Text>
      <Box {...sidebarStyles.chatHistoryPanel.messageList}>
        {EXAMPLE_MESSAGES.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
      </Box>
    </Box>
  );
}

export default ChatHistoryPanel;
