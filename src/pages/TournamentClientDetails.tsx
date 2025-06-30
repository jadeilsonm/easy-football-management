import React, { useEffect, useState } from 'react';
import { useParams } from "react-router"
import tournamentService, { type TournamentResponse } from '../services/tournamentService';
import Navbar from '../components/Navbar';
import { gql, useQuery } from '@apollo/client';
import { useAuth } from '../context/AuthContext';
import championshipTeamService from '../services/championshipTeamService';
import { useToast } from '../context/ToastContext';

const TournamentClientDetails = () => {
  const [tournamentDetails, setTournamentDetails] = useState<TournamentResponse | null>(null);
  const { user } = useAuth();
  const { addToast } = useToast();
  const [isExists, setExists] = useState<boolean>(false);
  const [teamId, SetTeamId] = useState<string>('');
  const GET = gql(
    `query User($id: ID!) {
          user(id: $id) {
              id
              name
              team {
                  id
                  name
              }
          }
  }`);
  const { loading, data } = useQuery(
    GET,
    { variables: { id: user?.id || '' } }
  );

  const params = useParams();

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        const response = await tournamentService.getById(params.tournamentId || "");
        setTournamentDetails(response);
      } catch (error) {
        console.error('Error fetching tournament details:', error);
      }
    };
    fetchTournamentDetails();
  }, []);

  useEffect(() => {
    if (data && data.user && data.user.team) {
      SetTeamId(data.user.team.id);
    }
  }, [data]);

  const addValue = async () => {
    const isExisting = await championshipTeamService.isExists(teamId, params.tournamentId || "");
    console.log("isExisting value: ", isExisting);
    setExists(isExisting);
  }

  useEffect(() => {
    if (tournamentDetails?.img == null) {
      tournamentDetails?.type == 'CUP' ?
        setTournamentDetails({ ...tournamentDetails, img: 'http://132.226.159.21:9000/asserts/ChatGPT Image 30 de jun. de 2025, 11_34_07.png' }) :
        setTournamentDetails({ ...tournamentDetails, img: 'http://132.226.159.21:9000/asserts/liga.png' });
    }
    addValue();
  }, [tournamentDetails]);

  const registerTorneament = async () => {
    try {
      await championshipTeamService.register(teamId, params.tournamentId || "");
      addToast('Sucesso', 'info', "Você entrou no torneio com sucesso!");
      setExists(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      addToast('Error', 'error', message);
    }
  }

  if (loading) {
    return <div>Carregando...</div>;
  }


  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-4/6 justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4 text-center">Detalhes do torneio</h1>
        {tournamentDetails &&
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{tournamentDetails.name}</h2>
            <p className="text-gray-500">{tournamentDetails.description}</p>
            <img src={tournamentDetails.img} className="w-80 h-80 object-cover mt-2" />
            <p className="mt-2">Status: {tournamentDetails.status}</p>
            <p className="mt-2">Type: {tournamentDetails.type}</p>
            <p className="mt-2">Award: ${tournamentDetails.award}</p>
            <p className="mt-2">Teams: {tournamentDetails.quantityTeams}</p>

          </div>
        }
        {isExists != null && <button
          type="button"
          onClick={() => registerTorneament()}
          disabled={isExists}
          className="px-6 m-2 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition-colors duration-200 disabled:opacity-55 disabled:cursor-not-allowed disabled:border-red-500"
        >
          Entrar
        </button>}
      </div>
    </>
  );
}

export default TournamentClientDetails;

