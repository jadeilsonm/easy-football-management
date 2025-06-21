// src/components/Toast.tsx
import React, { useEffect, useState } from 'react';
// Importe os ícones necessários do Heroicons
import { CheckCircleIcon, XMarkIcon, ExclamationTriangleIcon, InformationCircleIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';

// Define os tipos permitidos para a prop 'type' do toast
type ToastType = 'success' | 'info' | 'warning' | 'error';

// Define as propriedades (props) que o componente Toast irá aceitar
interface ToastProps {
  id: number; // ID único para cada toast, necessário para gerenciar a lista de toasts
  message: string; // A mensagem principal a ser exibida (texto em negrito)
  description?: string; // Descrição secundária opcional (texto menor abaixo)
  type?: ToastType; // O tipo do toast (opcional, padrão é 'success' para este estilo)
  onRemove: (id: number) => void; // Função para remover o toast do estado global
}

const Toast: React.FC<ToastProps> = ({ id, message, description, type = 'success', onRemove }) => {
  const [isVisible, setIsVisible] = useState(true); // Estado para controlar a visibilidade e animação

  // Mapeamento das classes Tailwind para o fundo e borda de cada tipo de toast
  // Observe que o fundo é branco e a borda e texto mudam de cor.
  const toastClasses: Record<ToastType, string> = {
    success: 'bg-white border-green-200',
    info: 'bg-white border-blue-200',
    warning: 'bg-white border-yellow-200',
    error: 'bg-white border-red-200',
  };

  // Mapeamento das classes Tailwind para a cor do ícone principal
  const iconColorClasses: Record<ToastType, string> = {
    success: 'text-green-500',
    info: 'text-blue-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
  };

  // Mapeamento das classes Tailwind para a cor do texto do botão de fechar
  const closeButtonTextColorClasses: Record<ToastType, string> = {
    success: 'text-green-600',
    info: 'text-blue-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
  };

  // Seleciona o ícone com base no tipo
  const IconComponent = {
    success: CheckCircleIcon,
    info: InformationCircleIcon,
    warning: ExclamationTriangleIcon,
    error: ExclamationCircleIcon,
  }[type];

  // Garante que a transição de fade-out ocorra antes da remoção do DOM
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Inicia a transição de saída
      setTimeout(() => onRemove(id), 500); // Remove após a duração da transição
    }, 3000); // Toast visível por 3 segundos

    return () => clearTimeout(timer); // Limpeza do timer
  }, [id, onRemove]);

  return (
    <div
      className={`
        max-w-md w-full shadow-lg rounded-md pointer-events-auto ring-1 ring-black ring-opacity-5
        overflow-hidden transition-all duration-500 ease-out transform
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        mb-3 flex items-start p-4 border
        ${toastClasses[type]}
      `}
      role="alert"
    >
      <div className="flex-shrink-0">
        {IconComponent && <IconComponent className={`h-8 w-8 ${closeButtonTextColorClasses[type]}`} aria-hidden="true" />}
      </div>
      <div className="ml-3 flex-1 pt-0.5">
        <p className="text-sm font-medium text-gray-900">{message} message</p>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      <div className="ml-4 flex-shrink-0 flex">
        <button
          type="button"
          className={`inline-flex rounded-md p-1.5 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onRemove(id), 500);
          }}
        >
          <span className="sr-only text-red-900">Fechar</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Toast;