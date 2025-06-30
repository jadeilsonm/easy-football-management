import React from 'react';
import Navbar, { type NavigationItem } from '../components/Navbar';
import BracketTree from '../components/BracketTree';

const NavItemsAdmin: NavigationItem[] = [
  { name: 'Gerenciar Campeonatos', href: '#', current: false },
  { name: 'Criar Campeonatos', href: '#', current: false },
  { name: 'Meu perfil', href: '#', current: false },
  { name: 'Sair', href: '#', current: false },
]


const Cup: React.FC = () => {
  return (
    <>
      <Navbar navigationItems={NavItemsAdmin}/>
      <BracketTree />
    </>
  );
}

export default Cup;
