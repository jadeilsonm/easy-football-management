import api from "./api"

interface getAllByUserResponse {
  id: string;
  name: string;
  description: string;
  type: string;
  startDate: string;
  endDate: string;
  award: number;
  quantityTeams: number;
  status: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    urlImage: string;
    deleted: boolean;
    team: {
      id: string;
      name: string;
      urlImage: string;
      deleted: boolean;
      user: string;
    };
  };
  registeredTeams: {
    id: string;
    team: {
      id: string;
      name: string;
      urlImage: string;
      deleted: boolean;
      user: string;
    };
    championship: string;
    registrationDate: string;
  }[];
  results: {
    id: string;
    idHomeTeam: string;
    homeTeamGoals: number;
    idAwayTeam: string;
    awayTeamGoals: number;
    status: string;
    championship: string;
    statistics: {
      id: string;
      goals: number;
      yellowCards: number;
      redCards: number;
      assists: number;
      minutesPlayed: number;
      goalsConceded: number;
      cleanSheets: number;
      player: {
        id: string;
        name: string;
        position: string;
        number: number;
        team: {
          id: string;
          name: string;
          urlImage: string;
          deleted: boolean;
          user: string;
        };
        createdAt: string;
        updatedAt: string;
      };
      match: {
        id: string;
        championship: string;
        homeTeam: {
          id: string;
          name: string;
          urlImage: string;
          deleted: boolean;
          user: string;
        };
        awayTeam: {
          id: string;
          name: string;
          urlImage: string;
          deleted: boolean;
          user: string;
        };
        homeTeamGoals: number;
        awayTeamGoals: number;
        status: string;
        matchDateTime: string;
        round: number; 
        statistics: string[];
      };
      result: string;
    }[];
  }[];
}

export interface CreateTournamentResponse {
  // id: string;
  name: string;
  description: string;
  img: string;
  statusChampionship: string;
  typeChampionship: string;
  award: number;
  quantityTeams: number;
  userID: string;
}

interface CreateTournamentTeamRequest {
  championshipId: string;
  teamId: string;
}

const tournamentTeamService = {
    getAll: async (): Promise<getAllByUserResponse[]> => {
        const response = await api.get<getAllByUserResponse[]>('/api/v1/championships/all');
        console.log(response.data);
        return response.data;
    },

    checkUserRegistration: async (tournamentId: string): Promise<boolean> => {
        try {
            const response = await api.get(`/api/v1/championships/${tournamentId}/check-registration`);
            console.log(response.data);
            return response.data.registered; // Supondo que a resposta tenha um campo 'registered'
        } catch (error) {
            console.error('Erro ao verificar inscrição do usuário:', error);
            return false; // Retorna false em caso de erro
        }
    },

    registerToTournament: async (tournamentData: CreateTournamentTeamRequest): Promise<string> => {
        try {
            const response = await api.post('/api/v1/championshipsteams', tournamentData);
            console.log(response.data);
            return response.data.message; // Supondo que a resposta tenha um campo 'message'
        } catch (error) {
            console.error('Erro ao registrar no torneio:', error);
            throw error; // Repassa o erro para ser tratado pelo chamador
        }
    }

    unregisterFromTournament: async (tournamentData: CreateTournamentTeamRequest): Promise<string> => {
        try {
            const response = await api.delete(`/api/v1/championshipsteams/${tournamentData.championshipId}/${tournamentData.teamId}`);
            console.log(response.data);
            return response.data.message; // Supondo que a resposta tenha um campo 'message'
        } catch (error) {
            console.error('Erro ao cancelar inscrição no torneio:', error);
            throw error; // Repassa o erro para ser tratado pelo chamador
        }
    }
//     
}

export default tournamentTeamService;