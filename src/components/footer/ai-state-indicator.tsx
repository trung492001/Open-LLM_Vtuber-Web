import { useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { AppContext } from '@/context/app-context';
import { footerStyles } from './footer-styles';

function AIStateIndicator() {
  const { aiState } = useContext(AppContext)!;
  const styles = footerStyles.aiIndicator;

  return (
    <Box {...styles.container}>
      <Text {...styles.text}>
        {aiState}
      </Text>
    </Box>
  );
}

export default AIStateIndicator;
