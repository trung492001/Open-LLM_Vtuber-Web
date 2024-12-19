import { Box, Button } from '@chakra-ui/react';
import { FiTrash2 } from "react-icons/fi";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";
import { sidebarStyles } from './sidebar-styles';
import { useChatHistory } from '@/context/chat-history-context';
import { useContext } from 'react';
import { WebSocketContext } from '@/context/websocket-context';
import { useState } from 'react';

interface HistoryPopoverProps {
  children: React.ReactNode;
}

function HistoryPopover({ children }: HistoryPopoverProps) {
  const { historyUids, currentHistoryUid, setCurrentHistoryUid, setHistoryUids } = useChatHistory();
  const { sendMessage } = useContext(WebSocketContext)!;
  const [isOpen, setIsOpen] = useState(false);

  const fetchAndSetHistory = (uid: string) => {
    if (!uid) return;
    setCurrentHistoryUid(uid);
    sendMessage({
      type: 'fetch-and-set-history',
      history_uid: uid,
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
    <PopoverRoot
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
      modal={false}
      closeOnEscape
      closeOnInteractOutside
    >
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        {...sidebarStyles.historyPopover.content}
        // css={{ "--popover-bg": "gray" }}
      >
        <PopoverArrow />
        <PopoverBody>
          {historyUids.map((uid) => (
            <Box key={uid} display="flex" alignItems="center" gap={2} mb={2}>
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
  );
}

export default HistoryPopover; 