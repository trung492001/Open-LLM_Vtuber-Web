import { Alert } from "@/components/ui/alert"
import { useEffect } from "react"

interface SettingUIProps {
    isOpen: boolean;
    onClose: () => void;
}

const SettingUI = ({ isOpen, onClose }: SettingUIProps) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose()
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [isOpen, onClose])

    if (isOpen) {
        return <Alert status="info" title="Not implemented yet" />
    }
    
    return null;
};

export default SettingUI;