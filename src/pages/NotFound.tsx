import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-900 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-extrabold text-green-800 dark:text-green-800">404</h1>
          <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight sm:text-4xl">
            Página não encontrada
          </p>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Lamentamos, mas não conseguimos encontrar a página que você está procurando.
          </p>
        </div>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-neutral-900 hover:bg-neutral-800 border-green-700 hover:border-white hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;