import {
  Box,
  Tabs,
  VStack,
  Button,

} from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { sidebarStyles } from '../sidebar-styles';
import General from './general';
import Live2d from './live2d';
import ASR from './asr';
import TTS from './tts';
import LLM from './llm';
import About from './about';
import { useState } from 'react';

interface SettingUIProps {
  open: boolean;
  onClose: () => void;
  onToggle: () => void;
}

function SettingUI({ open, onClose, onToggle }: SettingUIProps) {
  const [saveHandlers, setSaveHandlers] = useState<(() => void)[]>([]);
  const [cancelHandlers, setCancelHandlers] = useState<(() => void)[]>([]);

  const handleSaveCallback = (handler: () => void) => {
    setSaveHandlers(prev => [...prev, handler]);
    return () => {
      setSaveHandlers(prev => prev.filter(h => h !== handler));
    };
  };

  const handleCancelCallback = (handler: () => void) => {
    setCancelHandlers(prev => [...prev, handler]);
    return () => {
      setCancelHandlers(prev => prev.filter(h => h !== handler));
    };
  };

  const handleSave = () => {
    saveHandlers.forEach(handler => handler());
    onClose();
  };

  const handleCancel = () => {
    cancelHandlers.forEach(handler => handler());
    onClose();
  };

  if (!open) return null;

  return (
    <VStack {...sidebarStyles.settingUI.container}>
      <Box {...sidebarStyles.settingUI.header}>
        <Button onClick={onToggle}>
          <FiArrowLeft />
        </Button>
        <Box {...sidebarStyles.settingUI.title}>
          Settings
        </Box>
      </Box>

      <Tabs.Root defaultValue="general" {...sidebarStyles.settingUI.tabs.root}>
        <Tabs.List>
          <Tabs.Trigger value="general" {...sidebarStyles.settingUI.tabs.trigger}>General</Tabs.Trigger>
          <Tabs.Trigger value="live2d" {...sidebarStyles.settingUI.tabs.trigger}>Live2d</Tabs.Trigger>
          <Tabs.Trigger value="asr" {...sidebarStyles.settingUI.tabs.trigger}>ASR</Tabs.Trigger>
          <Tabs.Trigger value="tts" {...sidebarStyles.settingUI.tabs.trigger}>TTS</Tabs.Trigger>
          <Tabs.Trigger value="llm" {...sidebarStyles.settingUI.tabs.trigger}>LLM</Tabs.Trigger>
          <Tabs.Trigger value="about" {...sidebarStyles.settingUI.tabs.trigger}>About</Tabs.Trigger>
        </Tabs.List>

        <Tabs.ContentGroup>
          <Tabs.Content value="general" {...sidebarStyles.settingUI.tabs.content}>
            <General 
              onSave={handleSaveCallback}
              onCancel={handleCancelCallback}
            />
          </Tabs.Content>
          <Tabs.Content value="live2d" {...sidebarStyles.settingUI.tabs.content}>
            <Live2d
              onSave={handleSaveCallback}
              onCancel={handleCancelCallback}
            />
          </Tabs.Content>
          <Tabs.Content value="asr" {...sidebarStyles.settingUI.tabs.content}>
            <ASR />
          </Tabs.Content>
          <Tabs.Content value="tts" {...sidebarStyles.settingUI.tabs.content}>
            <TTS />
          </Tabs.Content>
          <Tabs.Content value="llm" {...sidebarStyles.settingUI.tabs.content}>
            <LLM />
          </Tabs.Content>
          <Tabs.Content value="about" {...sidebarStyles.settingUI.tabs.content}>
            <About />
          </Tabs.Content>
        </Tabs.ContentGroup>
      </Tabs.Root>

      <Box {...sidebarStyles.settingUI.footer}>
        <Button colorPalette="red" onClick={handleCancel}>
          Cancel
        </Button>
        <Button colorPalette="blue" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </VStack>
  );
}

export default SettingUI;
