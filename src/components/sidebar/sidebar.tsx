import {
  Box, Button, useDisclosure,
} from '@chakra-ui/react';
import { FiSettings, FiClock, FiPlus, FiTrash2, FiChevronLeft } from "react-icons/fi";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";
import { sidebarStyles } from './sidebar-styles';
import SettingUI from './setting/setting-ui';
import ChatHistoryPanel from './chat-history-panel';
import CameraPanel from './camera-panel';
import { useChatHistory } from '@/context/chat-history-context';
import { useContext } from "react";
import { WebSocketContext } from '@/context/websocket-context';
import { useState } from "react";
import { useInterrupt } from '../canvas/live2d';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle: () => void;
}

function Sidebar({ isCollapsed = false, onToggle }: SidebarProps) {
  const { open, onOpen, onClose } = useDisclosure();
  const { historyUids, currentHistoryUid, setCurrentHistoryUid, setHistoryUids } = useChatHistory();
  const { sendMessage } = useContext(WebSocketContext)!;
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { interrupt } = useInterrupt();

  const fetchAndSetHistory = (uid: string) => {
    if (!uid) return;
    setCurrentHistoryUid(uid);
    sendMessage({
      type: 'fetch-and-set-history',
      history_uid: uid,
    });
  };

  const createNewHistory = () => {
    interrupt();
    sendMessage({
      type: 'create-new-history',
    });
  };

  const deleteHistory = (uid: string) => {
    sendMessage({
      type: 'delete-history',
      history_uid: uid,
    });
    setHistoryUids(historyUids.filter(id => id !== uid));
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

              <PopoverRoot
                open={popoverOpen}
                onOpenChange={(e) => setPopoverOpen(e.open)}
                modal={false}
                closeOnEscape
                closeOnInteractOutside
              >
                <PopoverTrigger asChild>
                  <Button>
                    <FiClock />
                  </Button>
                </PopoverTrigger>
                <PopoverContent {...sidebarStyles.historyPopover.content}>
                  <PopoverArrow />
                  <PopoverBody>
                    {historyUids.map((uid) => (
                      <Box
                        key={uid}
                        display="flex"
                        alignItems="center"
                        gap={2}
                        mb={2}
                      >
                        <Button
                          onClick={() => fetchAndSetHistory(uid)}
                          flex={1}
                          {...(currentHistoryUid === uid
                            ? sidebarStyles.historyPopover.historyButtonSelected
                            : sidebarStyles.historyPopover.historyButtonNormal)}
                          {...sidebarStyles.historyPopover.historyButton}
                        >
                          {uid.slice(0, 8)}...{uid.slice(-8)}
                        </Button>
                        <Button
                          onClick={() => deleteHistory(uid)}
                          {...sidebarStyles.historyPopover.deleteButton}
                        >
                          <FiTrash2 />
                        </Button>
                      </Box>
                    ))}
                  </PopoverBody>
                </PopoverContent>
              </PopoverRoot>

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
