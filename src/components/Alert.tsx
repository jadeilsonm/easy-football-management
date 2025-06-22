import React, { useState } from 'react';

type AlertType = 'info' | 'success' | 'warning' | 'error';


interface AlertProps {
  message: string;
  type?: AlertType; 
  onClose?: () => void; 
}

const Alert: React.FC<AlertProps> = ({ message, type = 'info', onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const alertClasses: Record<AlertType, string> = {
    info: 'bg-blue-100 border-blue-400 text-blue-700',
    success: 'bg-green-100 border-green-400 text-green-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    error: 'bg-red-100 border-red-400 text-red-700',
  };

  if (!isVisible) {
    return null;
  }

  const textColorClass = alertClasses[type].split(' ').find(cls => cls.startsWith('text-'));
  const iconColorClass = textColorClass ? textColorClass.replace('text-', 'text-') : 'text-gray-500'; // Fallback

  return (
    <div
      className={`relative px-4 py-3 rounded ${alertClasses[type]} mb-4`}
      role="alert"
    >
      <div className="flex items-center">
        <span className="block sm:inline mr-auto">{message}</span>
        {onClose && (
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
          >
            <svg
              className={`fill-current h-6 w-6 ${iconColorClass}`}
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Fechar</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 2.652a1.2 1.2 0 1 1-1.697-1.697L8.303 10l-2.652-2.651a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-2.652a1.2 1.2 0 1 1 1.697 1.697L11.697 10l2.651 2.651a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
};

export default Alert;