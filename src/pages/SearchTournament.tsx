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



  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center justify-center mt-16 p-4">
        {loading ? (
          <p>Carregando torneios...</p>
        ) : 
        tournaments && tournaments.filter((tournamentFilter: TournamentProps) => tournamentFilter.status === "CREATE").map((tournament: TournamentProps, idx: number) => 
          <Tournament key={idx} {...tournament} />
        )
        }
      </div>
    </>
  );
}
