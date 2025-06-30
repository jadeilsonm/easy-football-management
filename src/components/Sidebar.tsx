// src/components/Sidebar.tsx
import React from 'react';
// import { FaHome, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-md flex flex-col">
      <div className="p-6 text-xl font-bold border-b">Minha App</div>
      <nav className="flex-1 p-4 space-y-2">
        <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
          {/* <FaHome className="mr-2" /> */}
          Dashboard
        </a>
        <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
          {/* <FaCog className="mr-2" /> */}
          Configurações
        </a>
        <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded mt-auto">
          {/* <FaSignOutAlt className="mr-2" /> */}
          Sair
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
