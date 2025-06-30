import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import type { NavigationItem } from '../components/Navbar';
import leagueService, { type LeagueStanding, type Team, type Match } from '../services/leagueService';
import { useToast } from '../context/ToastContext';
import { TrophyIcon, ChartBarIcon, PlayIcon } from '@heroicons/react/24/outline';

const LeagueStandings: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [standings, setStandings] = useState<LeagueStanding[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'standings' | 'schedule'>('standings');

  const navigationItems: NavigationItem[] = [
    { name: 'Home', href: '/', current: false },
    { name: 'Gerenciar', href: '/manager', current: false },
    { name: 'Classificação', href: `/league/${id}/standings`, current: true },
  ];

  useEffect(() => {
    if (id) {
      loadLeagueData();
    }
  }, [id]);

  const loadLeagueData = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const [teamsData, matchesData] = await Promise.all([
        leagueService.getTeams(id),
        leagueService.getAllMatches(id),
      ]);

      setTeams(teamsData);
      setMatches(matchesData);

      // Calcular classificação localmente
      const calculatedStandings = leagueService.calculateStandings(matchesData, teamsData);
      setStandings(calculatedStandings);
    } catch (error) {
      console.error('Erro ao carregar dados da liga:', error);
      addToast('Erro ao carregar classificação da liga', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getPositionColor = (position: number): string => {
    if (position <= 4) return 'text-green-600 bg-green-50'; // Classificação para competições
    if (position <= 8) return 'text-blue-600 bg-blue-50'; // Zona intermediária
    if (position >= standings.length - 3) return 'text-red-600 bg-red-50'; // Zona de rebaixamento
    return 'text-gray-600 bg-gray-50';
  };

  const getRecentMatches = (teamId: string): Match[] => {
    return matches
      .filter(match => 
        (match.homeTeam.id === teamId || match.awayTeam.id === teamId) && 
        match.status === 'FINISHED'
      )
      .sort((a, b) => new Date(b.matchDateTime).getTime() - new Date(a.matchDateTime).getTime())
      .slice(0, 5);
  };

  const getMatchResult = (match: Match, teamId: string): 'W' | 'D' | 'L' => {
    const isHome = match.homeTeam.id === teamId;
    const teamGoals = isHome ? match.homeTeamGoals : match.awayTeamGoals;
    const opponentGoals = isHome ? match.awayTeamGoals : match.homeTeamGoals;

    if (teamGoals > opponentGoals) return 'W';
    if (teamGoals < opponentGoals) return 'L';
    return 'D';
  };

  const getResultColor = (result: 'W' | 'D' | 'L'): string => {
    switch (result) {
      case 'W': return 'bg-green-500 text-white';
      case 'D': return 'bg-yellow-500 text-white';
      case 'L': return 'bg-red-500 text-white';
    }
  };

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
      <Navbar navigationItems={navigationItems} />
      <div className="margin-top-navbar min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white shadow-lg rounded-lg mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-900 px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">Liga - Classificação</h1>
                  <p className="text-indigo-100 mt-2">
                    {teams.length} times • {matches.filter(m => m.status === 'FINISHED').length} jogos realizados
                  </p>
                </div>
                <TrophyIcon className="w-16 h-16 text-yellow-300" />
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('standings')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'standings'
                      ? 'border-green-900 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <ChartBarIcon className="w-5 h-5 inline mr-2" />
                  Classificação
                </button>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'schedule'
                      ? 'border-green-900 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <PlayIcon className="w-5 h-5 inline mr-2" />
                  Tabela de Jogos
                </button>
              </nav>
            </div>
          </div>

          {activeTab === 'standings' ? (
            /* Tabela de Classificação */
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pos
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        J
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        V
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        E
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        D
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        GP
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        GC
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SG
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        PTS
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Últimos 5
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {standings.map((standing) => {
                      const recentMatches = getRecentMatches(standing.team.id);
                      return (
                        <tr key={standing.team.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${getPositionColor(standing.position)}`}>
                              {standing.position}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  {standing.team.urlImage ? (
                                    <img
                                      className="h-10 w-10 rounded-full object-cover"
                                      src={standing.team.urlImage}
                                      alt={standing.team.name}
                                    />
                                  ) : (
                                    <span className="text-sm font-medium text-gray-600">
                                      {standing.team.name.charAt(0)}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {standing.team.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                            {standing.matches}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-green-600 font-medium">
                            {standing.wins}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-yellow-600 font-medium">
                            {standing.draws}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-red-600 font-medium">
                            {standing.losses}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                            {standing.goalsFor}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                            {standing.goalsAgainst}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                            <span className={standing.goalDifference >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {standing.goalDifference > 0 ? '+' : ''}{standing.goalDifference}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-indigo-600">
                            {standing.points}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex space-x-1 justify-center">
                              {recentMatches.map((match, index) => {
                                const result = getMatchResult(match, standing.team.id);
                                return (
                                  <span
                                    key={`${match.id}-${index}`}
                                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${getResultColor(result)}`}
                                    title={`${match.homeTeam.name} ${match.homeTeamGoals} x ${match.awayTeamGoals} ${match.awayTeam.name}`}
                                  >
                                    {result}
                                  </span>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Legenda */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-4 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 bg-green-50 border border-green-200 rounded"></span>
                    <span className="text-gray-600">Classificação para competições (1º-4º)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></span>
                    <span className="text-gray-600">Zona intermediária (5º-8º)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 bg-red-50 border border-red-200 rounded"></span>
                    <span className="text-gray-600">Zona de rebaixamento</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Tabela de Jogos */
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Tabela de Jogos</h3>
                  <button
                    onClick={() => navigate(`/league/${id}/rounds`)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Ver Rodadas Detalhadas
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rodada
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data/Hora
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jogo
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {matches.map((match) => (
                      <tr key={match.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {match.round}ª Rodada
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {leagueService.formatMatchDate(match.matchDateTime)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{match.homeTeam.name}</span>
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                              {match.status === 'FINISHED' ? (
                                `${match.homeTeamGoals} - ${match.awayTeamGoals}`
                              ) : (
                                'vs'
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{match.awayTeam.name}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            match.status === 'FINISHED' 
                              ? 'bg-green-100 text-green-800'
                              : match.status === 'IN_PROGRESS'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {match.status === 'FINISHED' && 'Finalizado'}
                            {match.status === 'IN_PROGRESS' && 'Em Andamento'}
                            {match.status === 'SCHEDULED' && 'Agendado'}
                            {match.status === 'CANCELLED' && 'Cancelado'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LeagueStandings;
