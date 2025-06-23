import React, { useState , useEffect } from 'react';
import managerService from '../services/tournamentService';
import Tournament from '../components/Tournament';
import Navbar, { type NavigationItem } from '../components/Navbar';

interface TournamentProps {
  id: string;
  name: string;
  description: string;
  type: string;
  startDate: string;
  endDate: string;
  award: number;
  quantityTeams: number;
  status: string;
}

const NavItemsAdmin: NavigationItem[] = [
  { name: 'Gerenciar Campeonatos', href: '/manager', current: false },
  { name: 'Criar Campeonatos', href: '/manager/create/tournament', current: false },
  { name: 'Meu perfil', href: '#', current: false },
  { name: 'Sair', href: '#', current: false },
]

const Manager: React.FC = () => {
  const [tournaments, setTourneaments] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await managerService.getAllByUser();
        const data = await response.json();
        setTourneaments(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };

    fetchTournaments();
  }, []);



  return (
    <>
      <Navbar navigationItems={NavItemsAdmin}/>
      <div className="w-full flex flex-col items-center justify-center mt-16 p-4">
          {loading ? (
            <p>Carregando torneios...</p>
          ) : 
          tournaments && tournaments.map((tournament: TournamentProps, idx: number) => 
            <Tournament key={idx} {...tournament} />
          )
          }
      </div>
    </>
  );
}

export default Manager;
