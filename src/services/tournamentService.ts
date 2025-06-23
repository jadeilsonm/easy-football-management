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
  StatusChampionship: string;
  typeChampionship: string;
  award: number;
  quantityTeams: number;
  userID: string;
}   

const tournamentService = {
    getAllByUser: async (): Promise<getAllByUserResponse[]> => {
        const response = await api.get<getAllByUserResponse[]>('/api/v1/championships/all');
        return response.data;
    },

    Create: async (TournamentData: CreateTournamentResponse): Promise<CreateTournamentResponse> => {
        const response = await api.post<CreateTournamentResponse>('/api/v1/championships', TournamentData);
        return response.data;
    },
}

export default tournamentService;