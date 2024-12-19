import React, { createContext, useContext } from 'react';
import { toaster } from "@/components/ui/toaster";

interface ToastContextProps {
  showToast: (status: 'success' | 'error', message: string) => void;
}

export const ToastContext = createContext<ToastContextProps | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const showToast = (status: 'success' | 'error', message: string) => {
    toaster.create({
      type: status,
      title: message,
      placement: "top-end",
      duration: 3000,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}; 