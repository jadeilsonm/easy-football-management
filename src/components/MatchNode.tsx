import React from 'react';

interface MatchNodeProps {
  x: number;
  y: number;
  teamHome: string;
  homeGoals: number;
  teamAway: string;
  awayGoals: number;
  link?: string;
}

const MatchNode: React.FC<MatchNodeProps> = ({
  x,
  y,
  teamHome,
  homeGoals,
  teamAway,
  awayGoals,
  link,
}) => {
  const nodeGroup = (
    <g transform={`translate(${x}, ${y})`} className="match-node">
      <rect
        x={-60}
        y={-25}
        width={120}
        height={50}
        rx={8}
        ry={8}
        fill="white"
        stroke="black"
      />
      <text x={-50} y={-7} fontSize={12} textAnchor="start" fill="black">
        {teamHome}
      </text>
      <text x={50} y={-7} fontSize={12} textAnchor="end" fill="black">
        {homeGoals}
      </text>
      <text x={-50} y={13} fontSize={12} textAnchor="start" fill="black">
        {teamAway}
      </text>
      <text x={50} y={13} fontSize={12} textAnchor="end" fill="black">
        {awayGoals}
      </text>
    </g>
  );

  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="match-node-link"
    >
      {nodeGroup}
    </a>
  ) : (
    nodeGroup
  );
};

export default MatchNode;