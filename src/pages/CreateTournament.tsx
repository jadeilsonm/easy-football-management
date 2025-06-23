import React, { useState } from 'react';
import Navbar, { type NavigationItem } from '../components/Navbar';
import { useToast } from '../context/ToastContext';
import tournamentService,{ type CreateTournamentResponse } from '../services/tournamentService';
import { useAuth } from '../context/AuthContext';

const NavItemsAdmin: NavigationItem[] = [
  { name: 'Gerenciar Campeonatos', href: '/manager', current: false },
  { name: 'Criar Campeonatos', href: '/manager/create/tournament', current: false },
  { name: 'Meu perfil', href: '#', current: false },
  { name: 'Sair', href: '#', current: false },
]

const CreateTournament = () => {
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantityTeams, setQuantityTeams] = useState('');
  const [typeChampionship, setTypeChampionship] = useState('LEAGUE');
  const [award, setAward] = useState('');
  const { userId } = useAuth();

  const clearInput = () => {
    setName('');
    setDescription('');
    setQuantityTeams('');
    setTypeChampionship('LEAGUE');
    setAward('');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    
    const TournamentData: CreateTournamentResponse = {
      name,
      description,
      img: '',
      quantityTeams: parseInt(quantityTeams, 10),
      statusChampionship: 'CREATE',
      typeChampionship,
      award: parseFloat(award),
      userID: userId,
    };
    try {
      e.preventDefault();
      console.log(TournamentData);
      await tournamentService.Create(TournamentData);
      addToast('Cadastro', 'info', 'Torneio criado com sucesso!');
    } catch (error) {
      addToast('Erro', 'error', 'Erro ao criar torneio. Tente novamente.');
      console.error('Error creating tournament:', error);
    } finally {
       clearInput();
    }
  };

  return (
  <>
    <Navbar navigationItems={NavItemsAdmin}/>
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      {/* Championship Name */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="championship_name"
          id="championship_name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label
          htmlFor="championship_name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Nome
        </label>
      </div>

      {/* Description */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="championship_description"
          id="championship_description"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label
          htmlFor="championship_description"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Descrição
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label
          htmlFor="type_championship"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          tipo do campeonato
        </label>
        <select
          name="type_championship"
          id="type_championship"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
          value={typeChampionship}
          onChange={(e) => setTypeChampionship(e.target.value)}
        >
          <option value="LEAGUE">Liga</option>
          <option value="CUP">Copa</option>
        </select>
      </div>

      {typeChampionship === 'LEAGUE' ? (
        <div className="relative z-0 w-full mb-5 group">
        <input
          type="number" // Use type="number" for quantity
          name="quantity_teams"
          id="quantity_teams"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          min="2" // Minimum of 1 team
          value={quantityTeams}
          onChange={(e) => setQuantityTeams(e.target.value)}
          />
        <label
          htmlFor="quantity_teams"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Numero de Times
        </label>
        </div>) : (
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="status_championship"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Numero de Times
          </label>
          <select
            name="quantity_teams"
            id="quantity_teams"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
            value={quantityTeams}
            onChange={(e) => setQuantityTeams(e.target.value)}
            >
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="32">32</option>
          </select>
        </div>
      )}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number" // Use type="number" for award
            step="0.01" // Allows decimal values for currency
            name="championship_award"
            id="championship_award"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            min="0" // Award cannot be negative
            value={award}
            onChange={(e) => setAward(e.target.value)}
            />
          <label
            htmlFor="championship_award"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
            Premiação
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
          Criar Compeonato
        </button>
      </form>
    </>
  );
};

export default CreateTournament;