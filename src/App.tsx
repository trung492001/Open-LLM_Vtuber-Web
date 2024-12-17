import React from 'react';
import { Box, Flex, ChakraProvider, defaultSystem } from '@chakra-ui/react';
import Canvas from './components/canvas/canvas';
import Sidebar from './components/sidebar/sidebar';
import Footer from './components/footer/footer';
import { AiStateProvider } from './context/ai-state-context';
import { L2DProvider } from './context/l2d-context';
import { SubtitleProvider } from './context/subtitle-context';
import { BgUrlProvider } from './context/bgurl-context';
import { layoutStyles } from './layout';
import WebsocketConnection from './components/websocket-connection';
import { ResponseProvider } from './context/response-context';

const App: React.FC = () => (
  <ChakraProvider value={defaultSystem}>
    <AiStateProvider>
      <L2DProvider>
        <SubtitleProvider>
          <ResponseProvider>
            <BgUrlProvider>
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
            </BgUrlProvider>
          </ResponseProvider>
        </SubtitleProvider>
      </L2DProvider>
    </AiStateProvider>
  </ChakraProvider>
);

export default App;
