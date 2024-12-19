import {
  Box, Button, useDisclosure,
} from '@chakra-ui/react';
import { FiSettings, FiClock, FiPlus, FiChevronLeft } from "react-icons/fi";
import { sidebarStyles } from './sidebar-styles';
import SettingUI from './setting/setting-ui';
import ChatHistoryPanel from './chat-history-panel';
import CameraPanel from './camera-panel';
import { useContext } from "react";
import { WebSocketContext } from '@/context/websocket-context';
import { useInterrupt } from '../canvas/live2d';
import HistoryPopover from './history-popover';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle: () => void;
}

function Sidebar({ isCollapsed = false, onToggle }: SidebarProps) {
  const { open, onOpen, onClose } = useDisclosure();
  const { sendMessage } = useContext(WebSocketContext)!;
  const { interrupt } = useInterrupt();

  const createNewHistory = () => {
    interrupt();
    sendMessage({
      type: 'create-new-history',
    });
  };

  return (
    <Box {...sidebarStyles.sidebar.container(isCollapsed)}>
      <Box
        {...sidebarStyles.sidebar.toggleButton}
        style={{
          transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
        }}
        onClick={onToggle}
      >
        <FiChevronLeft />
      </Box>

      {!isCollapsed && !open && (
        <Box {...sidebarStyles.sidebar.content}>
          <Box {...sidebarStyles.sidebar.header}>
            <Box display="flex" gap={1}>
              <Button onClick={onOpen}>
                <FiSettings />
              </Button>

              <HistoryPopover>
                <Button>
                  <FiClock />
                </Button>
              </HistoryPopover>

              <Button onClick={createNewHistory}>
                <FiPlus />
              </Button>
            </Box>
          </Box>

          <ChatHistoryPanel />
          <CameraPanel />
        </Box>
      )}

      {!isCollapsed && open && (
        <SettingUI open={open} onClose={onClose} onToggle={onToggle} />
      )}
    </Box>
  );
}

export default Sidebar;
