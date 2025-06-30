import React from 'react';
import type { Match } from '../services/leagueService';
import leagueService from '../services/leagueService';
import { 
  ClockIcon, 
  PlayCircleIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

interface MatchCardProps {
  match: Match;
  showRound?: boolean;
  compact?: boolean;
}

const MatchCard: React.FC<MatchCardProps> = ({ 
  match, 
  showRound = true, 
  compact = false 
}) => {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'FINISHED':
        return {
          icon: <CheckCircleIcon className="w-5 h-5" />,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          label: 'Finalizado'
        };
      case 'IN_PROGRESS':
        return {
          icon: <PlayCircleIcon className="w-5 h-5" />,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          label: 'Em Andamento'
        };
      case 'SCHEDULED':
        return {
          icon: <ClockIcon className="w-5 h-5" />,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          label: 'Agendado'
        };
      case 'CANCELLED':
        return {
          icon: <ExclamationTriangleIcon className="w-5 h-5" />,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          label: 'Cancelado'
        };
      default:
        return {
          icon: <ClockIcon className="w-5 h-5" />,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          label: 'Agendado'
        };
    }
  };

  const statusInfo = getStatusInfo(match.status);
  const formattedDate = leagueService.formatMatchDate(match.matchDateTime);

  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-3">
          <div className={`p-1 rounded-full ${statusInfo.bgColor}`}>
            <div className={statusInfo.color}>
              {statusInfo.icon}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900">
              {match.homeTeam.name}
            </span>
            <span className="text-lg font-bold text-gray-700">
              {match.status === 'FINISHED' ? 
                `${match.homeTeamGoals} - ${match.awayTeamGoals}` : 
                'vs'
              }
            </span>
            <span className="text-sm font-medium text-gray-900">
              {match.awayTeam.name}
            </span>
          </div>
        </div>

        <div className="text-right">
          {showRound && (
            <div className="text-xs text-gray-500 mb-1">
              {match.round}ª Rodada
            </div>
          )}
          <div className="text-xs text-gray-500">
            {formattedDate}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {showRound && (
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-600">
            {match.round}ª Rodada
          </span>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
            {statusInfo.icon}
            <span className="ml-1">{statusInfo.label}</span>
          </div>
          
          <div className="text-sm text-gray-500">
            {formattedDate}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-6 w-full">
            {/* Time da Casa */}
            <div className="flex-1 text-center">
              <div className="flex items-center justify-center mb-2">
                {match.homeTeam.urlImage ? (
                  <img
                    src={match.homeTeam.urlImage}
                    alt={match.homeTeam.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-600">
                      {match.homeTeam.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {match.homeTeam.name}
              </h3>
            </div>

            {/* Placar */}
            <div className="text-center px-4">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {match.status === 'FINISHED' ? (
                  <>
                    <span className={match.homeTeamGoals > match.awayTeamGoals ? 'text-green-600' : ''}>
                      {match.homeTeamGoals}
                    </span>
                    <span className="text-gray-400 mx-2">-</span>
                    <span className={match.awayTeamGoals > match.homeTeamGoals ? 'text-green-600' : ''}>
                      {match.awayTeamGoals}
                    </span>
                  </>
                ) : (
                  <span className="text-gray-400">vs</span>
                )}
              </div>
              {match.status !== 'FINISHED' && (
                <div className="text-xs text-gray-500">
                  {statusInfo.label}
                </div>
              )}
            </div>

            {/* Time Visitante */}
            <div className="flex-1 text-center">
              <div className="flex items-center justify-center mb-2">
                {match.awayTeam.urlImage ? (
                  <img
                    src={match.awayTeam.urlImage}
                    alt={match.awayTeam.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-600">
                      {match.awayTeam.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {match.awayTeam.name}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
