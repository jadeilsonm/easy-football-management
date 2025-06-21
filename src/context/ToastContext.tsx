// src/contexts/ToastContext.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import Toast from '../components/Toast'; // Importa o componente Toast

// 1. Definindo o tipo de um único toast (adicionado 'description')
interface ToastItem {
  id: number;
  message: string;
  description?: string; // <--- ADICIONADO AQUI
  type: 'info' | 'success' | 'warning' | 'error';
}

// 2. Definindo a interface para o valor do contexto (adicionado 'description' no addToast)
interface ToastContextType {
  addToast: (message: string, type?: ToastItem['type'], description?: string) => void; // <--- ADICIONADO AQUI
}

// 3. Criando o Contexto com um valor inicial que corresponde à interface
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// 4. Definindo a interface para as props do ToastProvider
interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // 5. Função addToast atualizada para aceitar 'description'
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
      {/* Container para exibir os toasts na parte superior direita */}
      <div className="fixed top-4 right-4 **z-50** pointer-events-none"> {/* <--- top-4 AQUI */}
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// 6. Hook customizado para consumir o contexto
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};