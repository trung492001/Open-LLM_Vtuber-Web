import React, { useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { canvasStyles } from './canvas-styles';
import { AppContext } from '@/context/app-context';

const Subtitle: React.FC = () => {
  const context = useContext(AppContext);
  
  if (!context) return null;
  const { subtitleText } = context;
  
  if (!subtitleText) return null;

  return (
    <Box {...canvasStyles.subtitle.container}>
      <Text {...canvasStyles.subtitle.text}>
        {subtitleText}
      </Text>
    </Box>
  );
};

export default Subtitle;
