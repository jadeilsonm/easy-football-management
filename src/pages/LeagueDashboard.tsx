import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import type { NavigationItem } from '../components/Navbar';
import MatchCard from '../components/MatchCard';
import leagueService, { type LeagueStanding, type Team, type Match, type Round } from '../services/leagueService';
import tournamentService from '../services/tournamentService';
import { useToast } from '../context/ToastContext';
import { 
  TrophyIcon, 
  CalendarIcon, 
  ChartBarIcon,
  PlayIcon,
  EyeIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const LeagueDashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [tournamentInfo, setTournamentInfo] = useState<any>(null);
  const [standings, setStandings] = useState<LeagueStanding[]>([]);
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [nextMatches, setNextMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  const navigationItems: NavigationItem[] = [
    { name: 'Home', href: '/', current: false },
    { name: 'Gerenciar', href: '/manager', current: false },
    { name: 'Liga', href: `/league/${id}`, current: true },
  ];

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const [tournamentData, teamsData, matchesData] = await Promise.all([
        tournamentService.getById(id),
        leagueService.getTeams(id),
        leagueService.getAllMatches(id),
      ]);

      setTournamentInfo(tournamentData);
      setTeams(teamsData);

      // Calcular classificação
      const calculatedStandings = leagueService.calculateStandings(matchesData, teamsData);
      setStandings(calculatedStandings.slice(0, 8)); // Top 8

      // Filtrar partidas recentes e próximas
      const now = new Date();
      const finished = matchesData
        .filter(match => match.status === 'FINISHED')
        .sort((a, b) => new Date(b.matchDateTime).getTime() - new Date(a.matchDateTime).getTime())
        .slice(0, 5);

      const upcoming = matchesData
        .filter(match => match.status === 'SCHEDULED' && new Date(match.matchDateTime) > now)
        .sort((a, b) => new Date(a.matchDateTime).getTime() - new Date(b.matchDateTime).getTime())
        .slice(0, 5);

      setRecentMatches(finished);
      setNextMatches(upcoming);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      addToast('Erro ao carregar dados da liga', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getLeagueStats = () => {
    const totalMatches = recentMatches.length + nextMatches.length;
    const completedMatches = recentMatches.length;
    const totalGoals = recentMatches.reduce((sum, match) => 
      sum + match.homeTeamGoals + match.awayTeamGoals, 0
    );
    
    return {
      totalMatches,
      completedMatches,
      remainingMatches: nextMatches.length,
      totalGoals,
      averageGoals: completedMatches > 0 ? (totalGoals / completedMatches).toFixed(1) : '0'
    };
  };

  const stats = getLeagueStats();

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="margin-top-navbar min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="margin-top-navbar min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white shadow-lg rounded-lg mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-purple-600 px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    {tournamentInfo?.name || 'Liga'}
                  </h1>
                  <p className="text-indigo-100 mt-2">
                    {tournamentInfo?.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-4 text-indigo-100">
                    <span>🏆 Premiação: ${tournamentInfo?.award}</span>
                    <span>👥 {teams.length} times</span>
                    <span>⚽ {stats.completedMatches} jogos realizados</span>
                  </div>
                </div>
                <TrophyIcon className="w-16 h-16 text-yellow-300" />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white px-6 py-4 border-b border-gray-200">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => navigate(`/league/${id}/standings`)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <ChartBarIcon className="w-4 h-4 mr-2" />
                  Ver Classificação Completa
                </button>
                
                <button
                  onClick={() => navigate(`/league/${id}/rounds`)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <CogIcon className="w-4 h-4 mr-2" />
                  Gerenciar Rodadas
                </button>
                
                <button
                  onClick={() => navigate(`/league/${id}/rounds`)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Calendário de Jogos
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <PlayIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Jogos Realizados
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.completedMatches}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CalendarIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Próximos Jogos
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.remainingMatches}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">⚽</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total de Gols
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.totalGoals}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ChartBarIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Média de Gols
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.averageGoals}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Classificação (Top 8) */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Classificação</h3>
                <button
                  onClick={() => navigate(`/league/${id}/standings`)}
                  className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
                >
                  <EyeIcon className="w-4 h-4 mr-1" />
                  Ver Completa
                </button>
              </div>
              
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Pos
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Time
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        J
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        PTS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {standings.map((standing, index) => (
                      <tr key={standing.team.id} className={index < 4 ? 'bg-green-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {standing.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-600">
                                  {standing.team.name.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900 truncate max-w-32">
                                {standing.team.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                          {standing.matches}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-green-600">
                          {standing.points}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Próximos Jogos e Resultados Recentes */}
            <div className="space-y-8">
              {/* Próximos Jogos */}
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Próximos Jogos</h3>
                  <button
                    onClick={() => navigate(`/league/${id}/rounds`)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                  >
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    Ver Todos
                  </button>
                </div>
                
                <div className="p-6 space-y-4">
                  {nextMatches.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      Nenhum jogo agendado
                    </p>
                  ) : (
                    nextMatches.slice(0, 3).map(match => (
                      <MatchCard key={match.id} match={match} compact showRound />
                    ))
                  )}
                </div>
              </div>

              {/* Resultados Recentes */}
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Resultados Recentes</h3>
                </div>
                
                <div className="p-6 space-y-4">
                  {recentMatches.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      Nenhum resultado disponível
                    </p>
                  ) : (
                    recentMatches.slice(0, 3).map(match => (
                      <MatchCard key={match.id} match={match} compact showRound />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeagueDashboard;
