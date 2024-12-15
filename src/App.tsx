import React from 'react';
import { Box, Flex, ChakraProvider, defaultSystem } from '@chakra-ui/react';
import Canvas from './components/canvas/canvas';
import Sidebar from './components/sidebar/sidebar';
import Footer from './components/footer/footer';
import { AppProvider } from './context/app-context';
import { layoutStyles } from './layout';
import WebsocketConnection from './components/websocket-connection';

const App: React.FC = () => (
  <ChakraProvider value={defaultSystem}>
    <AppProvider>
      <WebsocketConnection>
        <Flex {...layoutStyles.appContainer}>
          <Box {...layoutStyles.sidebar}>
            <Sidebar />
          </Box>

          <Box {...layoutStyles.mainContent}>
            <Box {...layoutStyles.canvas}>
              <Canvas />
            </Box>

            <Box {...layoutStyles.footer}>
              <Footer />
            </Box>
          </Box>
        </Flex>
      </WebsocketConnection>
    </AppProvider>
  </ChakraProvider>
);

export default App;
