import { useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { StateContext } from '@/context/state-context';
import { footerStyles } from './footer-styles';

function AIStateIndicator() {
  const { state } = useContext(StateContext)!;
  const styles = footerStyles.aiIndicator;

  if (!StateContext) {
    console.error('StateContext is undefined');
    return null;
  }

  return (
    <Box {...styles.container}>
      <Text {...styles.text}>
        AI:
        {' '}
        {state}
      </Text>
    </Box>
  );
}

export default AIStateIndicator;
