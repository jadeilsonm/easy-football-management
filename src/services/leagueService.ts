import api from './api';

// Interfaces para as entidades
export interface Team {
  id: string;
  name: string;
  urlImage?: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeTeamGoals: number;
  awayTeamGoals: number;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'FINISHED' | 'CANCELLED';
  matchDateTime: string;
  round: number;
  championship: string;
}

export interface LeagueStanding {
  position: number;
  team: Team;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface Round {
  number: number;
  matches: Match[];
  isCompleted: boolean;
}

export interface CreateMatchRequest {
  homeTeamId: string;
  awayTeamId: string;
  matchDateTime: string;
  round: number;
  championshipId: string;
}

export interface UpdateMatchResultRequest {
  homeTeamGoals: number;
  awayTeamGoals: number;
  status: string;
}

const leagueService = {
  // Buscar classificação da liga
  getStandings: async (championshipId: string): Promise<LeagueStanding[]> => {
    const response = await api.get<LeagueStanding[]>(`/api/v1/championships/${championshipId}/standings`);
    return response.data;
  },

  // Buscar todas as rodadas de uma liga
  getRounds: async (championshipId: string): Promise<Round[]> => {
    const response = await api.get<Round[]>(`api/v1/classification/matchs/${championshipId}`);
    return response.data;
  },

  // Buscar partidas de uma rodada específica
  getRoundMatches: async (championshipId: string, round: number): Promise<Match[]> => {
    const response = await api.get<Match[]>(`/api/v1/championships/${championshipId}/rounds/${round}/matches`);
    return response.data;
  },

  // Buscar todas as partidas de uma liga
  getAllMatches: async (championshipId: string): Promise<Match[]> => {
    const response = await api.get<Match[]>(`/api/v1/championships/${championshipId}/matches`);
    return response.data;
  },

  // Criar uma nova partida
  createMatch: async (matchData: CreateMatchRequest): Promise<Match> => {
    const response = await api.post<Match>('/api/v1/matches', matchData);
    return response.data;
  },

  // Atualizar resultado de uma partida
  updateMatchResult: async (matchId: string, result: UpdateMatchResultRequest): Promise<Match> => {
    const response = await api.put<Match>(`/api/v1/matches/${matchId}/result`, result);
    return response.data;
  },

  // Buscar times inscritos em uma liga
  getTeams: async (championshipId: string): Promise<Team[]> => {
    const response = await api.get<Team[]>(`/api/v1/championships/${championshipId}/teams`);
    return response.data;
  },

  // Gerar partidas automaticamente para uma liga
  generateMatches: async (championshipId: string): Promise<Round[]> => {
    const response = await api.post<Round[]>(`/api/v1/championships/${championshipId}/generate-matches`);
    return response.data;
  },

  // Calcular classificação baseada nos resultados
  calculateStandings: (matches: Match[], teams: Team[]): LeagueStanding[] => {
    const standings: { [teamId: string]: LeagueStanding } = {};

    // Inicializar standings para todos os times
    teams.forEach((team, index) => {
      standings[team.id] = {
        position: index + 1,
        team,
        matches: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
      };
    });

    // Processar partidas finalizadas
    matches.filter(match => match.status === 'FINISHED').forEach(match => {
      const homeTeam = standings[match.homeTeam.id];
      const awayTeam = standings[match.awayTeam.id];

      if (homeTeam && awayTeam) {
        // Atualizar estatísticas
        homeTeam.matches++;
        awayTeam.matches++;

        homeTeam.goalsFor += match.homeTeamGoals;
        homeTeam.goalsAgainst += match.awayTeamGoals;
        awayTeam.goalsFor += match.awayTeamGoals;
        awayTeam.goalsAgainst += match.homeTeamGoals;

        // Determinar resultado
        if (match.homeTeamGoals > match.awayTeamGoals) {
          // Vitória do time da casa
          homeTeam.wins++;
          homeTeam.points += 3;
          awayTeam.losses++;
        } else if (match.homeTeamGoals < match.awayTeamGoals) {
          // Vitória do time visitante
          awayTeam.wins++;
          awayTeam.points += 3;
          homeTeam.losses++;
        } else {
          // Empate
          homeTeam.draws++;
          awayTeam.draws++;
          homeTeam.points += 1;
          awayTeam.points += 1;
        }

        // Calcular saldo de gols
        homeTeam.goalDifference = homeTeam.goalsFor - homeTeam.goalsAgainst;
        awayTeam.goalDifference = awayTeam.goalsFor - awayTeam.goalsAgainst;
      }
    });

    // Ordenar por pontos, saldo de gols e gols marcados
    const sortedStandings = Object.values(standings).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return a.team.name.localeCompare(b.team.name);
    });

    // Atualizar posições
    sortedStandings.forEach((standing, index) => {
      standing.position = index + 1;
    });

    return sortedStandings;
  },

  // Formatar data para exibição
  formatMatchDate: (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  // Validar se uma rodada está completa
  isRoundComplete: (matches: Match[]): boolean => {
    return matches.every(match => match.status === 'FINISHED');
  },

  // Obter próxima rodada
  getNextRound: (rounds: Round[]): Round | null => {
    return rounds.find(round => !round.isCompleted) || null;
  },
};

export default leagueService;
