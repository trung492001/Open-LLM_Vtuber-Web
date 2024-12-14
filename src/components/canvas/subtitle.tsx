import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { canvasStyles } from './canvas-styles';

interface SubtitleProps {
  text: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ text }) => (
  <Box {...canvasStyles.subtitle.container}>
    <Text {...canvasStyles.subtitle.text}>
      {text}
    </Text>
  </Box>
);

export default Subtitle;
