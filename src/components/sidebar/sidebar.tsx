import {
  Box, VStack, Button, useDisclosure,
} from '@chakra-ui/react';
import { FiSettings, FiArrowLeft } from "react-icons/fi";
import { sidebarStyles } from './sidebar-styles';
import SettingUI from './setting-ui';
import ConfigCard from './config-card';
import ChatHistoryPanel from './chat-history-panel';
import SystemLogPanel from './system-log-panel';

interface SidebarProps {
  onToggle: () => void;
}

function Sidebar({ onToggle }: SidebarProps) {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <VStack h="100%" w="100%" p={0} gap={4}>
      <Box {...sidebarStyles.sidebar.header}>
        <Box display="flex" gap={1}>
          <Button onClick={onToggle}>
            <FiArrowLeft />
          </Button>

          <Button onClick={onOpen}>
            <FiSettings />
          </Button>
        </Box>
        <ConfigCard />
      </Box>

      <Box {...sidebarStyles.sidebar.container}>
        <ChatHistoryPanel />
        <SystemLogPanel />
      </Box>

      <SettingUI isOpen={open} onClose={onClose} />
    </VStack>
  );
}

export default Sidebar;
