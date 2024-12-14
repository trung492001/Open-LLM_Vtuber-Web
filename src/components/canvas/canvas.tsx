import Background from './background';
import { Box } from '@chakra-ui/react';
import { canvasStyles } from './canvas-styles';

interface CanvasProps {
  backgroundUrl?: string;
}

function Canvas({ backgroundUrl }: CanvasProps) {
  return (
    <Background imageUrl={backgroundUrl}>
      <Box {...canvasStyles.canvas.container}>
      </Box>
    </Background>
  );
}

export default Canvas;
