import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import type { NavigationItem } from '../components/Navbar';
import leagueService, { type Round, type Match, type Team, type CreateMatchRequest, type UpdateMatchResultRequest } from '../services/leagueService';
import { useToast } from '../context/ToastContext';
import { 
  CalendarIcon, 
  PlusIcon, 
  PencilIcon, 
  CheckCircleIcon,
  PlayCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const LeagueRounds: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [rounds, setRounds] = useState<Round[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedRound, setSelectedRound] = useState<number>(1);
  const [currentMatches, setCurrentMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMatch, setEditingMatch] = useState<string | null>(null);
  const [matchResult, setMatchResult] = useState({ homeGoals: 0, awayGoals: 0 });
  const [showCreateMatch, setShowCreateMatch] = useState(false);
  const [newMatch, setNewMatch] = useState<Partial<CreateMatchRequest>>({
    homeTeamId: '',
    awayTeamId: '',
    matchDateTime: '',
    round: 1,
  });

  const navigationItems: NavigationItem[] = [
    { name: 'Home', href: '/', current: false },
    { name: 'Gerenciar', href: '/manager', current: false },
    { name: 'Classificação', href: `/league/${id}/standings`, current: false },
    { name: 'Rodadas', href: `/league/${id}/rounds`, current: true },
  ];

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  useEffect(() => {
    if (selectedRound && id) {
      loadRoundMatches();
    }
  }, [selectedRound, id]);

  const loadData = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const [roundsData, teamsData] = await Promise.all([
        leagueService.getRounds(id),
        leagueService.getTeams(id),
      ]);

      setRounds(roundsData);
      setTeams(teamsData);

      if (roundsData.length > 0) {
        const nextRound = leagueService.getNextRound(roundsData);
        setSelectedRound(nextRound?.number || 1);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      addToast('Erro ao carregar dados da liga', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadRoundMatches = async () => {
    if (!id || !selectedRound) return;

    try {
      const matches = await leagueService.getRoundMatches(id, selectedRound);
      setCurrentMatches(matches);
    } catch (error) {
      console.error('Erro ao carregar partidas da rodada:', error);
      addToast('Erro ao carregar partidas da rodada', 'error');
    }
  };

  const handleCreateMatch = async () => {
    if (!id || !newMatch.homeTeamId || !newMatch.awayTeamId || !newMatch.matchDateTime) {
      addToast('Preencha todos os campos obrigatórios', 'error');
      return;
    }

    if (newMatch.homeTeamId === newMatch.awayTeamId) {
      addToast('Um time não pode jogar contra ele mesmo', 'error');
      return;
    }

    try {
      const matchData: CreateMatchRequest = {
        homeTeamId: newMatch.homeTeamId!,
        awayTeamId: newMatch.awayTeamId!,
        matchDateTime: newMatch.matchDateTime!,
        round: selectedRound,
        championshipId: id,
      };

      await leagueService.createMatch(matchData);
      addToast('Partida criada com sucesso!', 'success');
      
      setShowCreateMatch(false);
      setNewMatch({
        homeTeamId: '',
        awayTeamId: '',
        matchDateTime: '',
        round: selectedRound,
      });
      
      await loadRoundMatches();
    } catch (error) {
      console.error('Erro ao criar partida:', error);
      addToast('Erro ao criar partida', 'error');
    }
  };

  const handleUpdateResult = async (matchId: string) => {
    if (matchResult.homeGoals < 0 || matchResult.awayGoals < 0) {
      addToast('Gols não podem ser negativos', 'error');
      return;
    }

    try {
      const updateData: UpdateMatchResultRequest = {
        homeTeamGoals: matchResult.homeGoals,
        awayTeamGoals: matchResult.awayGoals,
        status: 'FINISHED',
      };

      await leagueService.updateMatchResult(matchId, updateData);
      addToast('Resultado atualizado com sucesso!', 'success');
      
      setEditingMatch(null);
      setMatchResult({ homeGoals: 0, awayGoals: 0 });
      
      await loadRoundMatches();
    } catch (error) {
      console.error('Erro ao atualizar resultado:', error);
      addToast('Erro ao atualizar resultado', 'error');
    }
  };

  const startEditMatch = (match: Match) => {
    setEditingMatch(match.id);
    setMatchResult({
      homeGoals: match.homeTeamGoals,
      awayGoals: match.awayTeamGoals,
    });
  };

  const cancelEdit = () => {
    setEditingMatch(null);
    setMatchResult({ homeGoals: 0, awayGoals: 0 });
  };

  const generateMatches = async () => {
    if (!id) return;

    try {
      const generatedRounds = await leagueService.generateMatches(id);
      setRounds(generatedRounds);
      addToast('Partidas geradas automaticamente com sucesso!', 'success');
      await loadRoundMatches();
    } catch (error) {
      console.error('Erro ao gerar partidas:', error);
      addToast('Erro ao gerar partidas automaticamente', 'error');
    }
  };

  const getMatchStatusIcon = (status: string) => {
    switch (status) {
      case 'FINISHED':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'IN_PROGRESS':
        return <PlayCircleIcon className="w-5 h-5 text-yellow-500" />;
      case 'SCHEDULED':
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
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
      <Navbar />
      <div className="margin-top-navbar min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white shadow-lg rounded-lg mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-purple-600 px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">Gerenciar Rodadas</h1>
                  <p className="text-indigo-100 mt-2">
                    Adicione jogos e registre resultados da liga
                  </p>
                </div>
                <CalendarIcon className="w-16 h-16 text-indigo-200" />
              </div>
            </div>

            {/* Controles */}
            <div className="bg-white px-6 py-4 border-b border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedRound}
                    onChange={(e) => setSelectedRound(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {Array.from({ length: Math.max(rounds.length, 10) }, (_, i) => i + 1).map(round => (
                      <option key={round} value={round}>
                        {round}ª Rodada
                      </option>
                    ))}
                  </select>
                  
                  <span className="text-sm text-gray-500">
                    {currentMatches.length} jogos nesta rodada
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowCreateMatch(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Novo Jogo
                  </button>
                  
                  <button
                    onClick={generateMatches}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Gerar Jogos Automaticamente
                  </button>
                  
                  <button
                    onClick={() => navigate(`/league/${id}/standings`)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Ver Classificação
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal para criar nova partida */}
          {showCreateMatch && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Criar Nova Partida</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Time da Casa</label>
                      <select
                        value={newMatch.homeTeamId}
                        onChange={(e) => setNewMatch({...newMatch, homeTeamId: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Selecione um time</option>
                        {teams.map(team => (
                          <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Time Visitante</label>
                      <select
                        value={newMatch.awayTeamId}
                        onChange={(e) => setNewMatch({...newMatch, awayTeamId: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Selecione um time</option>
                        {teams.filter(team => team.id !== newMatch.homeTeamId).map(team => (
                          <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Data e Hora</label>
                      <input
                        type="datetime-local"
                        value={newMatch.matchDateTime}
                        onChange={(e) => setNewMatch({...newMatch, matchDateTime: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-6">
                    <button
                      onClick={() => setShowCreateMatch(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleCreateMatch}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                    >
                      Criar Partida
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lista de Partidas */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedRound}ª Rodada
              </h3>
            </div>

            <div className="divide-y divide-gray-200">
              {currentMatches.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma partida cadastrada</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Comece criando uma nova partida para esta rodada.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => setShowCreateMatch(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Nova Partida
                    </button>
                  </div>
                </div>
              ) : (
                currentMatches.map((match) => (
                  <div key={match.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        {getMatchStatusIcon(match.status)}
                        
                        <div className="flex items-center space-x-8 flex-1">
                          <div className="flex items-center space-x-3 min-w-0 flex-1">
                            <span className="text-sm font-medium text-gray-900 truncate">
                              {match.homeTeam.name}
                            </span>
                          </div>

                          <div className="text-center">
                            {editingMatch === match.id ? (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="number"
                                  min="0"
                                  value={matchResult.homeGoals}
                                  onChange={(e) => setMatchResult({...matchResult, homeGoals: parseInt(e.target.value) || 0})}
                                  className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                                />
                                <span>-</span>
                                <input
                                  type="number"
                                  min="0"
                                  value={matchResult.awayGoals}
                                  onChange={(e) => setMatchResult({...matchResult, awayGoals: parseInt(e.target.value) || 0})}
                                  className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                                />
                              </div>
                            ) : (
                              <div className="text-lg font-bold text-gray-900">
                                {match.status === 'FINISHED' ? (
                                  `${match.homeTeamGoals} - ${match.awayTeamGoals}`
                                ) : (
                                  'vs'
                                )}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center space-x-3 min-w-0 flex-1 justify-end">
                            <span className="text-sm font-medium text-gray-900 truncate">
                              {match.awayTeam.name}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <div className="text-xs text-gray-500">
                          {leagueService.formatMatchDate(match.matchDateTime)}
                        </div>
                        
                        {editingMatch === match.id ? (
                          <div className="flex space-x-1">
                            <button
                              onClick={() => handleUpdateResult(match.id)}
                              className="p-1 text-green-600 hover:text-green-800"
                              title="Salvar"
                            >
                              <CheckCircleIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="p-1 text-gray-600 hover:text-gray-800"
                              title="Cancelar"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startEditMatch(match)}
                            className="p-1 text-indigo-600 hover:text-indigo-800"
                            title="Editar resultado"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeagueRounds;
