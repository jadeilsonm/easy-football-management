import { useLocation, useNavigate } from 'react-router-dom';

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
  CREATE: <span className="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-green-700 ">
    Criado
  </span>,
  IN_PROGRESS: <span className="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium ">
    Em Andamento
  </span>,
  FINISH: <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-red-700 ">
    Concluido
  </span>,
}

const Tournament = ({ id, name, description, type, startDate, endDate, award, quantityTeams, status }: TournamentProps) => {
  const navigate = useNavigate();

 
  const local = useLocation();
  console.log(local);

   function redirectToTournament () {
    if (local.pathname.includes("client")) {
      navigate(`/client/tournament/${id}`);
      return;
    }
    if (type.trim() === "LEAGUE") {
      navigate(`/league/${id}`);
      return;
    }

    navigate(`/manager/${type.trim()}/${id}`);
  };

  return (
    <div className='W-full m-2 min-w-full p-4 border rounded-lg shadow-md' onClick={() => redirectToTournament()}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl">{name}</h2>
        <div>
          <p>Data de Início: </p>
          <p>{new Date(startDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p>Data de Término: </p>
          <p>{new Date(endDate).toLocaleDateString()}</p>
        </div>
      </div>

      <div className='flex flex-row justify-between items-center mb-4'>
        {/* { ChatGPT Image 30 de jun. de 2025, 11_34_07.png } */}
        <div className='flex items-center justify-center'>
          <img
            alt="Your Company"
            src="http://132.226.159.21:9000/asserts/ChatGPT Image 30 de jun. de 2025, 11_34_07.png"
            className="h-16 w-auto"
          />
          <div className='ml-4'>
            <p>Descrição: {description}</p>
            <p>Tipo: {type == "CUP" ? "MATA-MATA" : "PONTOS CORRIDOS"}</p>
          </div>
        </div>
        <div>
          <p>Premiação: {award}</p>
          <p>Quantidade de Times: {quantityTeams}</p>
        </div>
        <div className='flex flex-col items-center w-32'>
          <p>Status: {EnumStatus[status as keyof typeof EnumStatus]} </p>
          <button
            type="button"
            onClick={() => redirectToTournament()}
            className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition-colors duration-200"
          >
            Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tournament;