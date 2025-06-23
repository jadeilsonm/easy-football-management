import React from 'react';
import { useNavigate } from 'react-router-dom';

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

const EnumStatus = {
  CREATED: <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
        Criado
      </span>,
  IN_PROGRESS: <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">
        Em Andamento
      </span>,
  FINISH: <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
        Concluido
      </span>,
}

const Tournament = ({id, name, description, type, startDate, endDate, award, quantityTeams, status }: TournamentProps ) => {
  const navigate = useNavigate();

  function redirectToTournament () {
    navigate(`/manager/${type.trim()}/${id}`);
  }


  return (
    <div className='W-full max-w-md p-4 border rounded-lg shadow-md'  onClick={() => redirectToTournament()}>
      <h2 className="text-xl">{name}</h2>
      <p>{description}</p>
      <p>Data de Início: {new Date(startDate).toLocaleDateString()}</p>
      <p>Data de Término: {new Date(endDate).toLocaleDateString()}</p>
      <p>Tipo: {type == "CUP" ? "MATA-MATA": "PONTOS CORRIDOS"}</p>
      <p>Premiação: {award}</p>
      <p>Quantidade de Times: {quantityTeams}</p>
      <p>Status: </p>{EnumStatus[status as keyof typeof EnumStatus]}
    </div>
  );
}

export default Tournament;