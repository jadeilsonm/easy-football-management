// import React, { useEffect, useState } from 'react';
// import { useParams } from "react-router"
// import tournamentService from '../services/tournamentService';
// import Navbar from '../components/Navbar';

// // junior TO-DO
// const TournamentClientDetails = () => {
//   const [tournamentDetails, setTournamentDetails] = useState<getAllByUserResponse | null>(null);
//   // const [loading, setLoading] = useState<boolean>(true);
//   const params = useParams();
  
//   useEffect(() => {

//     const fetchTournamentDetails = async () => {
//       try {
//         // setLoading(true);
//         console.log(`Fetching details for tournament ID: ${params.tournamentId}`);
//         const response = await tournamentService.getById(params.tournamentId || "");
//         console.log('Tournament Details:', response);
//         setTournamentDetails(response);

//         // setLoading(true);
//       } catch (error) {
//         console.error('Error fetching tournament details:', error);
//       }
//     };

//     fetchTournamentDetails();
//   }, []);
  
  
//   return (
//     <>
//     <Navbar />
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl font-bold mb-4">Tournament Details</h1>
//       <p className="text-gray-600">This is a placeholder for tournament details.</p>
//       {tournamentDetails && 
//         <div className="mt-4">
//           <h2 className="text-xl font-semibold">{tournamentDetails.name}</h2>
//           <p className="text-gray-500">{tournamentDetails.description}</p>
//           <img src={tournamentDetails.img} alt={tournamentDetails.name} className="w-48 h-48 object-cover mt-2" />
//           <p className="mt-2">Status: {tournamentDetails.statusChampionship}</p>
//           <p className="mt-2">Type: {tournamentDetails.typeChampionship}</p>
//           <p className="mt-2">Award: ${tournamentDetails.award}</p>
//           <p className="mt-2">Teams: {tournamentDetails.quantityTeams}</p>
//         </div>
//       }
//     </div>
//     </>
//   );
// }

// export default TournamentClientDetails;

import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import tournamentService from '../services/tournamentService';
import tournamentTeamService from '../services/tournamentTeamService';
import Navbar from '../components/Navbar';
import userService from '../services/userService';

// Tipagem exemplo — substitua pela correta do seu projeto
interface TournamentDetails {
  id: string;
  name: string;
  description: string;
  img?: string;
  status: string;
  type: string;
  award: number;
  quantityTeams: number;
  startDate: string;
  endDate?: string | null;
}

const TournamentClientDetails = () => {
  const [user, setUser] = useState<any>(null); // tipagem do usuário
  const [tournamentDetails, setTournamentDetails] = useState<TournamentDetails | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false); // estado de inscrição
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        const response = await tournamentService.getById(params.tournamentId || "");
        setTournamentDetails(response);
        const u = await userService.getUserProfile();
        setUser(u);
        console.log('Usuário logado:', u);
        // Simulação: checa se usuário já está inscrito
        const userRegistered = await tournamentTeamService.checkUserRegistration(response.id, u.team.id); // função fictícia
        setIsRegistered(userRegistered);
      } catch (error) {
        console.error('Erro ao buscar detalhes do torneio:', error);
      }
    };

    fetchTournamentDetails();
  }, [params.tournamentId]);

  const handleRegistration = async () => {
    if (!tournamentDetails) return;

    setLoading(true);
    try {
      const requestData = {
        championshipId: params.tournamentId,
        teamId: user.team.id
      };
      if (isRegistered) {
        await tournamentTeamService.unregisterFromTournament(requestData); // função fictícia
        setIsRegistered(false);
      } else {
        await tournamentTeamService.registerToTournament(requestData); // função fictícia
        setIsRegistered(true);
      }
    } catch (error) {
      console.error('Erro ao alterar status de inscrição:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center py-10 px-4">
        <h1 className="text-2xl font-bold mb-4">Detalhes do Torneio</h1>

        {tournamentDetails ? (
          <div className="w-full max-w-md bg-blue shadow-md rounded p-6">
            <h2 className="text-xl font-semibold mb-2">{tournamentDetails.name}</h2>
            <p className="text-gray-600 mb-2">{tournamentDetails.description}</p>
            {tournamentDetails.img && (
              <img
                src={tournamentDetails.img}
                alt={tournamentDetails.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <p><strong>Status:</strong> {tournamentDetails.status}</p>
            <p><strong>Tipo:</strong> {tournamentDetails.type}</p>
            <p><strong>Prêmio:</strong> ${tournamentDetails.award}</p>
            <p><strong>Times:</strong> {tournamentDetails.quantityTeams}</p>
            <p><strong>Início:</strong> {new Date(tournamentDetails.startDate).toLocaleDateString()}</p>
            <p><strong>Fim:</strong> {tournamentDetails.endDate ? new Date(tournamentDetails.endDate).toLocaleDateString() : "Sem data definida"}</p>

            <button
              onClick={handleRegistration}
              disabled={loading}
              className={`mt-4 w-full py-2 px-4 rounded ${
                isRegistered
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {loading
                ? 'Processando...'
                : isRegistered
                  ? 'Cancelar Inscrição'
                  : 'Inscrever-se'}
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Carregando detalhes do torneio...</p>
        )}
      </div>
    </>
  );
};

export default TournamentClientDetails;