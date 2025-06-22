import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import Toast from '../components/Toast';

interface ToastItem {
  id: number;
  message: string;
  description?: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface ToastContextType {
  addToast: (message: string, type?: ToastItem['type'], description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: ToastItem['type'] = 'success', description?: string) => { // <--- type default para 'success'
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type, description }]); // <--- ADICIONADO AQUI
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
        {children}
        <div className="fixed top-4 right-4 **z-50** pointer-events-none">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} onRemove={removeToast} />
          ))}
        </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};