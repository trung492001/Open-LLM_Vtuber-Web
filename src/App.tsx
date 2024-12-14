import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { defaultSystem } from '@chakra-ui/react';
import Canvas from './components/canvas/canvas';
import Sidebar from './components/sidebar/sidebar';
import Footer from './components/footer/footer';
import { StateProvider } from './context/state-context';
import { ChakraProvider } from '@chakra-ui/react';
import { layoutStyles } from './layout';
import WebSocketHandler from './components/websocket-handler';

const App: React.FC = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <StateProvider>
        <WebSocketHandler>
          <Flex {...layoutStyles.appContainer}>
            <Box {...layoutStyles.sidebar}>
              <Sidebar />
            </Box>

            <Box {...layoutStyles.mainContent}>
              <Box {...layoutStyles.canvas}>
                <Canvas 
                  backgroundUrl="/bg/ceiling-window-room-night.jpeg"
                  subtitleText="Hi, I'm some random AI VTuber. Who the hell are ya? Ahh, you must be amazed by my awesomeness, right? right?"
                />
              </Box>

              <Box {...layoutStyles.footer}>
                <Footer />
              </Box>
            </Box>
          </Flex>
        </WebSocketHandler>
      </StateProvider>
    </ChakraProvider>
  );
};

export default App;