import { Box } from '@chakra-ui/react';
import Background from './background';
import Subtitle from './subtitle';
import WebSocketStatus from './ws-status';
import { Live2D } from './live2d';
import { canvasStyles } from './canvas-styles';

function Canvas() {
  return (
    <Background>
      <Box {...canvasStyles.canvas.container}>
        <Live2D />
        <WebSocketStatus />
        <Subtitle />
      </Box>
    </Background>
  );
}

export default Canvas;
