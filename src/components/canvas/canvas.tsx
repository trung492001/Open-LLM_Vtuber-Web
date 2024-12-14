import { Box } from '@chakra-ui/react';
import Background from './background';
import Subtitle from './subtitle';
import { canvasStyles } from './canvas-styles';

interface CanvasProps {
  backgroundUrl?: string;
  subtitleText?: string;
}

function Canvas({ backgroundUrl, subtitleText }: CanvasProps) {
  return (
    <Background imageUrl={backgroundUrl}>
      <Box {...canvasStyles.canvas.container}>
        {subtitleText && <Subtitle text={subtitleText} />}
      </Box>
    </Background>
  );
}

export default Canvas;
