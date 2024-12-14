import { Box, Text, VStack } from '@chakra-ui/react';
import { sidebarStyles } from './sidebar-styles';

function ConfigCard() {
  return (
    <Box {...sidebarStyles.configCard.container}>
      <VStack align="stretch" gap={0}>
        <Text fontWeight="semibold" fontSize="md" color="white">
          neuro sama
        </Text>
        <Text color="whiteAlpha.500" fontSize="xs">
          ollama
        </Text>
      </VStack>
    </Box>
  );
}

export default ConfigCard;
