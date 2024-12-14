import { useEffect } from 'react';
import { Alert } from '@/components/ui/alert';

interface SettingUIProps {
    isOpen: boolean;
    onClose: () => void;
}

function SettingUI({ isOpen, onClose }: SettingUIProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (isOpen) {
    return <Alert status="info" title="Not implemented yet" />;
  }

  return null;
}

export default SettingUI;
