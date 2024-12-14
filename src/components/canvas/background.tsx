import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import { canvasStyles } from './canvas-styles';

interface BackgroundProps {
  imageUrl?: string;
  children?: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ imageUrl, children }) => (
  <Box {...canvasStyles.background.container}>
    {imageUrl && (
    <Image
      src={imageUrl}
      alt="Background"
      {...canvasStyles.background.image}
    />
    )}
    {children}
  </Box>
);

export default Background;
