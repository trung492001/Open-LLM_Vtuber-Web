import { 
  VStack,
  Field,
  createListCollection,
  Input,
  Text,
} from '@chakra-ui/react';
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select"
import { useEffect, useState, useContext } from 'react';
import { BgUrlContext } from '@/context/bgurl-context';

interface GeneralProps {
  onSave?: (callback: () => void) => (() => void);
  onCancel?: (callback: () => void) => (() => void);
}

interface GeneralSettings {
  language: string[];
  customBgUrl: string;
  selectedBgUrl: string[];
  backgroundUrl: string;
}

function General({ onSave, onCancel }: GeneralProps) {
  const bgUrlContext = useContext(BgUrlContext);
  
  const [settings, setSettings] = useState<GeneralSettings>({
    language: [],
    customBgUrl: '',
    selectedBgUrl: [],
    backgroundUrl: bgUrlContext?.backgroundUrl || ''
  });

  const [originalSettings, setOriginalSettings] = useState<GeneralSettings>({
    language: [],
    customBgUrl: '',
    selectedBgUrl: [],
    backgroundUrl: bgUrlContext?.backgroundUrl || ''
  });

  const handleSave = () => {
    const newBgUrl = settings.customBgUrl || settings.selectedBgUrl[0];
    if (newBgUrl && bgUrlContext) {
      setOriginalSettings({...settings});
    }
  };

  const handleCancel = () => {
    console.log('handleCancel');
    setSettings(originalSettings);
    if (bgUrlContext && originalSettings.backgroundUrl) {
      bgUrlContext.setBackgroundUrl(originalSettings.backgroundUrl);
    }
  };

  const handleSettingChange = (key: keyof GeneralSettings, value: GeneralSettings[keyof GeneralSettings]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const newBgUrl = settings.customBgUrl || settings.selectedBgUrl[0];
    if (newBgUrl && bgUrlContext) {
      bgUrlContext.setBackgroundUrl(newBgUrl);
    }
  }, [settings.selectedBgUrl, settings.customBgUrl, bgUrlContext]);

  useEffect(() => {
    if (!onSave || !onCancel) return;

    const cleanupSave = onSave(() => {
      console.log('Saving general settings...');
      handleSave();
    });

    const cleanupCancel = onCancel(() => {
      console.log('Canceling general settings...');
      handleCancel();
    });

    return () => {
      cleanupSave?.();
      cleanupCancel?.();
    };
  }, [onSave, onCancel]);

  const languages = createListCollection({
    items: [
      { label: "English", value: "en" },
      { label: "中文", value: "zh" },
    ],
  });

  return (
    <VStack align="stretch" gap={6} p={4}>
      <Field.Root key="language-field">
        <SelectRoot
          collection={languages}
          width="100%"
          value={settings.language}
          onValueChange={(e) => handleSettingChange('language', e.value)}
        >
          <SelectLabel>Language</SelectLabel>
          <SelectTrigger>
            <SelectValueText placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {languages.items.map((item) => (
              <SelectItem key={item.value} item={item}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Field.Root>

      <Field.Root key="background-field">
        <SelectRoot
          width="100%"
          value={settings.selectedBgUrl}
          onValueChange={(e) => handleSettingChange('selectedBgUrl', e.value)}
          collection={createListCollection({ 
            items: bgUrlContext?.backgroundFiles.map(filename => ({
              label: filename,
              value: `/bg/${filename}`
            })) || []
          })}
        >
          <SelectLabel>Background Image</SelectLabel>
          <SelectTrigger>
            <SelectValueText placeholder="Select from available backgrounds" />
          </SelectTrigger>
          <SelectContent>
            {(createListCollection({ 
              items: bgUrlContext?.backgroundFiles.map(filename => ({
                label: filename.toString(),
                value: `/bg/${filename}`
              })) || []
            })).items.map((item) => (
              <SelectItem key={item.value} item={item}>
                {String(item.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>

        <Text fontSize="sm" color="whiteAlpha.600">
          Or provide a custom URL:
        </Text>

        <Input
          placeholder="Enter image URL"
          value={settings.customBgUrl}
          onChange={(e) => handleSettingChange('customBgUrl', e.target.value)}
        />
      </Field.Root>
    </VStack>
  );
}

export default General; 