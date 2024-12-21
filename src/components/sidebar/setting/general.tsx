import { 
  Input,
  Button,
  HStack,
  Text,
  Stack,
} from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select"
import { useEffect, useState, useContext } from 'react';
import { BgUrlContext } from '@/context/bgurl-context';
import { settingStyles } from './setting-styles';
import { createListCollection } from '@chakra-ui/react';

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

interface SelectFieldProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  collection: ReturnType<typeof createListCollection<{label: string; value: string}>>;
  placeholder: string;
}

function SelectField({ label, value, onChange, collection, placeholder }: SelectFieldProps) {
  return (
    <Field 
      {...settingStyles.general.field} 
      label={<Text {...settingStyles.general.field.label}>{label}</Text>}
    >
      <SelectRoot
        {...settingStyles.general.select.root}
        collection={collection}
        value={value}
        onValueChange={(e) => onChange(e.value)}
      >
        <SelectTrigger {...settingStyles.general.select.trigger}>
          <SelectValueText placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {collection.items.map((item) => (
            <SelectItem key={item.value} item={item}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Field>
  );
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

  const backgroundCollection = createListCollection({ 
    items: bgUrlContext?.backgroundFiles.map(filename => ({
      label: String(filename),
      value: `/bg/${filename}`
    })) || []
  });

  const handleSwitchCharacter = () => {
    
  };

  const handleSaveCharacter = () => {
    
  };

  return (
    <Stack {...settingStyles.general.container}>
      <SelectField
        label="Language"
        value={settings.language}
        onChange={(value) => handleSettingChange('language', value)}
        collection={languages}
        placeholder="Select language"
      />

      <SelectField
        label="Background Image"
        value={settings.selectedBgUrl}
        onChange={(value) => handleSettingChange('selectedBgUrl', value)}
        collection={backgroundCollection}
        placeholder="Select from available backgrounds"
      />

      <Field 
        {...settingStyles.general.field}
        label={<Text {...settingStyles.general.field.label}>Custom Background URL</Text>}
      >
        <Input
          {...settingStyles.general.input}
          placeholder="Enter image URL"
          value={settings.customBgUrl}
          onChange={(e) => handleSettingChange('customBgUrl', e.target.value)}
        />
      </Field>

      <HStack {...settingStyles.general.buttonGroup}>
        <Button
          {...settingStyles.general.button}
          onClick={handleSwitchCharacter}
        >
          Switch Character
        </Button>
        <Button
          {...settingStyles.general.button}
          onClick={handleSaveCharacter}
        >
          Save Character
        </Button>
      </HStack>
    </Stack>
  );
}

export default General; 