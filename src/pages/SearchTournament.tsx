import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Tournament from "../components/Tournament";
import tournamentService from "../services/tournamentService";

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

export const SearchTournament = () => {
  const [tournaments, setTourneaments] = useState<any>(null);
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await tournamentService.getAll();
        setTourneaments(response);
        console.log(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };

    fetchTournaments();
  }, []);

  const filteredTournaments = async () => {
     try {
        const response = await tournamentService.filter(name, status);
        setTourneaments(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
  }


  return (
    <div className="flex w-full flex-col items-center justify-center h-screen">
      <Navbar />
      <div className="min-h-screen bg-neutral-850 w-2/3">
        <div className="p-28">
          <h1 className="text-2xl font-bold text-center">Buscar Torneios</h1>
          <div className="mt-2 flex items-center justify-center">
            <label htmlFor="name" className="block text-sm font-medium text-green-700 m-4">
              Nome do torneio:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block text-black w-2/3 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-700 focus:border-green-600"
              placeholder="Digite seu nome completo"
              onBlur={() => filteredTournaments()}
              required
            />
          </div>
          <div className="flex items-center justify-center mb-4">
            <select
              name="status"
              value={status || ''}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-neutral-700 px-4 py-2 rounded w-full md:w-1/4"
              onBlur={() => filteredTournaments()}
            >
              <option value="CREATE">criado</option>
              <option value="FINISHED">Finalizado</option>
              <option value="IN_PROGRESS">Em progresso</option>
            </select>
          </div>
        </div>
        {loading ? (
          <p>Carregando torneios...</p>
        ) :
          tournaments.map((tournament: TournamentProps, idx: number) =>
            <Tournament key={idx} {...tournament} />
          )
        }
      </div>
    </div>
  );
}
