import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, XMarkIcon, ExclamationTriangleIcon, InformationCircleIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';


type ToastType = 'success' | 'info' | 'warning' | 'error';

interface ToastProps {
  id: number;
  message: string;
  description?: string;
  type?: ToastType;
  onRemove: (id: number) => void; 
}

const Toast: React.FC<ToastProps> = ({ id, message, description, type = 'success', onRemove }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toastClasses: Record<ToastType, string> = {
    success: 'bg-green-800 border-green-600',
    info: 'bg-slate-900 border-blue-600',
    warning: 'bg-yellow-900 border-yellow-500',
    error: 'bg-red-900 border-red-500',
  };

  const iconColorClasses: Record<ToastType, string> = {
    success: 'text-green-500',
    info: 'text-blue-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
  };

  const closeButtonTextColorClasses: Record<ToastType, string> = {
    success: 'text-green-600',
    info: 'text-blue-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
  };

  const IconComponent = {
    success: CheckCircleIcon,
    info: InformationCircleIcon,
    warning: ExclamationTriangleIcon,
    error: ExclamationCircleIcon,
  }[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); 
      setTimeout(() => onRemove(id), 500); 
    }, 3000); 

    return () => clearTimeout(timer); 
  }, [id, onRemove]);

  return (
    <div
      className={`
        max-w-md w-full shadow-lg rounded-md pointer-events-auto ring-1 ring-black ring-opacity-5
        overflow-hidden transition-all duration-3000 ease-out transform
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
        <p className="text-sm font-medium font-bold text-gray-100">{message} message</p>
        {description && <p className="mt-1 font-bold text-sm text-gray-400">{description}</p>}
      </div>
      <div className={`ml-4 flex-shrink-0 flex ${toastClasses[type]}`}>
        <button
          type="button"
          className={`inline-flex rounded-md p-1.5 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${toastClasses[type]}`}
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onRemove(id), 500);
          }}
        >
          <span className="sr-only text-red-900">Fechar</span>
          <XMarkIcon className={`h-6 w-6 ${toastClasses[type]}`} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Toast;