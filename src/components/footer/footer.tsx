import {
  Box, Input, IconButton, HStack,
} from '@chakra-ui/react';
import { BsMicFill, BsPaperclip } from 'react-icons/bs';
import { IoHandRightSharp } from 'react-icons/io5';
import { InputGroup } from '@/components/ui/input-group';
import { footerStyles } from './footer-styles';
import AIStateIndicator from './ai-state-indicator';
import { useTextInput } from '@/hooks/use-text-input';
import { useInterrupt } from '@/components/canvas/live2d';

function Footer() {
  const styles = footerStyles.footer;
  const {
    inputValue,
    handleInputChange,
    handleKeyPress,
  } = useTextInput();
  const { interrupt } = useInterrupt();

  return (
    <Box {...styles.container}>
      <HStack width="100%" gap={4}>
        <Box>
          <Box mb="2">
            <AIStateIndicator />
          </Box>
          <HStack gap={2}>
            <IconButton
              aria-label="Start recording"
              bg="red.500"
              {...styles.actionButton}
            >
              <BsMicFill size="24" />
            </IconButton>
            <IconButton
              aria-label="Raise hand"
              bg="yellow.500"
              onClick={interrupt}
              {...styles.actionButton}
            >
              <IoHandRightSharp size="24" />
            </IconButton>
          </HStack>
        </Box>

        <InputGroup flex={1}>
          <Box position="relative" width="100%">
            <IconButton
              aria-label="Attach file"
              variant="ghost"
              {...styles.attachButton}
            >
              <BsPaperclip size="24" />
            </IconButton>
            <Input
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              {...styles.input}
            />
          </Box>
        </InputGroup>
      </HStack>
    </Box>
  );
}

export default Footer;
