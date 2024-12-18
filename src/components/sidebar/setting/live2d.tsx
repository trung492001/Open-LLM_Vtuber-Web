import {
  Input,
  HStack,
  Button,
  Text,
  Box,
  NumberInput,
  Stack,
} from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { useState, useEffect, useContext } from 'react';
import { L2DContext, ModelInfo } from '@/context/l2d-context';

interface Live2dProps {
  onSave?: (callback: () => void) => (() => void);
  onCancel?: (callback: () => void) => (() => void);
}

function Live2d({ onSave, onCancel }: Live2dProps) {
  const l2dContext = useContext(L2DContext);
  const [modelInfo, setModelInfoState] = useState<ModelInfo>(l2dContext?.modelInfo || {
    url: '',
    kScale: 0.000625,
    initialXshift: 0,
    initialYshift: 0,
    kXOffset: 1150,
    emotionMap: {}
  });
  const [originalModelInfo, setOriginalModelInfo] = useState<ModelInfo>(l2dContext?.modelInfo || {
    url: '',
    kScale: 0.000625,
    initialXshift: 0,
    initialYshift: 0,
    kXOffset: 1150,
    emotionMap: {}
  });

  useEffect(() => {
    if (!onSave || !onCancel) return;

    const cleanupSave = onSave(() => {
      handleSave();
    });

    const cleanupCancel = onCancel(() => {
      handleCancel();
    });

    return () => {
      cleanupSave?.();
      cleanupCancel?.();
    };
  }, [onSave, onCancel, modelInfo]);

  const handleSave = () => {
    if (l2dContext && modelInfo) {
      l2dContext.setModelInfo(modelInfo);
      setOriginalModelInfo(modelInfo);
    }
  };

  const handleCancel = () => {
    setModelInfoState(originalModelInfo);
    if (l2dContext && originalModelInfo) {
      l2dContext.setModelInfo(originalModelInfo);
    }
  };

  const handleInputChange = (key: keyof ModelInfo, value: ModelInfo[keyof ModelInfo]) => {
    setModelInfoState((prev) => ({ ...prev, [key]: value }));
  };

  const handleEmotionMapAdd = () => {
    const newKey = ''; 
    const newValue = 0;
    setModelInfoState((prev) => ({
      ...prev,
      emotionMap: { ...prev.emotionMap, [newKey]: newValue },
    }));
  };

  const handleEmotionMapRemove = (key: string) => {
    const updatedEmotionMap = { ...modelInfo.emotionMap };
    delete updatedEmotionMap[key];
    setModelInfoState((prev) => ({
      ...prev,
      emotionMap: updatedEmotionMap,
    }));
  };

  useEffect(() => {
    if (modelInfo && l2dContext) {
      l2dContext.setModelInfo(modelInfo);
    }
  }, [modelInfo, l2dContext]);

  return (
    <Stack gap="8" maxW="sm" css={{ "--field-label-width": "120px" }}>
      <Field orientation="horizontal" label="Model URL">
        <Input
          flex="1"
          value={modelInfo.url || ''}
          onChange={(e) => handleInputChange('url', e.target.value)}
          placeholder="请输入模型 URL"
        />
      </Field>

      <Field orientation="horizontal" label="Scale Factor (kScale)">
        <NumberInput.Root
          pattern="[0-9-]*(\.[0-9]*)?"
          inputMode="decimal"
          value={modelInfo.kScale?.toString() ?? ""}
          onValueChange={(details) => {
            const val = details.value;
            if (val === "" || val === "-") {
              handleInputChange("kScale", val);
            } else {
              const parsed = Number(val);
              if (!isNaN(parsed)) {
                handleInputChange("kScale", parsed);
              }
            }
          }}
          step={0.0001}
          allowMouseWheel
        >
          <NumberInput.Input />
          <NumberInput.Control>
            <NumberInput.IncrementTrigger />
            <NumberInput.DecrementTrigger />
          </NumberInput.Control>
        </NumberInput.Root>
      </Field>

      <Field orientation="horizontal" label="Horizontal Shift (initialXshift)">
        <NumberInput.Root
          pattern="[0-9-]*(\.[0-9]*)?"
          inputMode="decimal"
          value={modelInfo.initialXshift?.toString() ?? ""}
          onValueChange={(details) => {
            const val = details.value;
            if (val === "" || val === "-") {
              handleInputChange("initialXshift", val);
            } else {
              const parsed = Number(val);
              if (!isNaN(parsed)) {
                handleInputChange("initialXshift", parsed);
              }
            }
          }}
          step={10}
          allowMouseWheel
        >
          <NumberInput.Input />
          <NumberInput.Control>
            <NumberInput.IncrementTrigger />
            <NumberInput.DecrementTrigger />
          </NumberInput.Control>
        </NumberInput.Root>
      </Field>

      <Field orientation="horizontal" label="Vertical Shift (initialYshift)">
        <NumberInput.Root
          pattern="[0-9-]*(\.[0-9]*)?"
          inputMode="decimal"
          value={modelInfo.initialYshift?.toString() ?? ""}
          onValueChange={(details) => {
            const val = details.value;
            if (val === "" || val === "-") {
              handleInputChange("initialYshift", val);
            } else {
              const parsed = Number(val);
              if (!isNaN(parsed)) {
                handleInputChange("initialYshift", parsed);
              }
            }
          }}
          step={10}
          allowMouseWheel
        >
          <NumberInput.Input />
          <NumberInput.Control>
            <NumberInput.IncrementTrigger />
            <NumberInput.DecrementTrigger />
          </NumberInput.Control>
        </NumberInput.Root>
      </Field>

      <Field orientation="horizontal" label="X-axis Offset (kXOffset)">
        <NumberInput.Root
          pattern="[0-9-]*(\.[0-9]*)?"
          inputMode="decimal"
          value={modelInfo.kXOffset?.toString() ?? ""}
          onValueChange={(details) => {
            const val = details.value;
            if (val === "" || val === "-") {
              handleInputChange("kXOffset", val);
            } else {
              const parsed = Number(val);
              if (!isNaN(parsed)) {
                handleInputChange("kXOffset", parsed);
              }
            }
          }}
          step={1}
          allowMouseWheel
        >
          <NumberInput.Input />
          <NumberInput.Control>
            <NumberInput.IncrementTrigger />
            <NumberInput.DecrementTrigger />
          </NumberInput.Control>
        </NumberInput.Root>
      </Field>

      <Box>
        <Text fontWeight="bold" mb={4}>Emotion Mapping</Text>
        {modelInfo.emotionMap &&
          Object.entries(modelInfo.emotionMap).map(([key, value]) => (
            <HStack key={key} mb={2}>
              <Input
                value={key}
                onChange={(e) => {
                  const newEmotionMap = { ...modelInfo.emotionMap };
                  delete newEmotionMap[key];
                  newEmotionMap[e.target.value] = value;
                  handleInputChange('emotionMap', newEmotionMap);
                }}
                placeholder="Emotion Name"
              />
              <NumberInput.Root
                pattern="[0-9-]*(\.[0-9]*)?"
                inputMode="decimal"
                value={value?.toString() ?? ""}
                onValueChange={(details) => {
                  const val = details.value;
                  const newEmotionMap = { ...modelInfo.emotionMap };
                  if (val === "" || val === "-") {
                    newEmotionMap[key] = 0;
                  } else {
                    const parsed = Number(val);
                    if (!isNaN(parsed)) {
                      newEmotionMap[key] = parsed;
                    }
                  }
                  handleInputChange('emotionMap', newEmotionMap);
                }}
                step={1}
                allowMouseWheel
              >
                <NumberInput.Input />
                <NumberInput.Control>
                  <NumberInput.IncrementTrigger />
                  <NumberInput.DecrementTrigger />
                </NumberInput.Control>
              </NumberInput.Root>
              <Button 
                colorPalette="red" 
                onClick={() => handleEmotionMapRemove(key)}
              >
                Delete
              </Button>
            </HStack>
          ))}
        <Button 
          onClick={handleEmotionMapAdd}
          colorPalette="blue"
          mt={2}
        >
          Add New Emotion
        </Button>
      </Box>
    </Stack>
  );
}

export default Live2d; 