import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import MatchNode from './MatchNode';

interface TreeNodeData {
  idMatch?: string;
  nameTeamHome: string;
  homeTeamGoals: number;
  nameTeamAway: string;
  awayTeamGoals: number;
  children?: TreeNodeData[];
}

interface RenderNode {
  x: number;
  y: number;
  teamHome: string;
  homeGoals: number;
  teamAway: string;
  awayGoals: number;
  link?: string;
}

const width = 800;
const height = 500;
const margin = 50;

const BracketTree: React.FC = () => {
  const [nodes, setNodes] = useState<RenderNode[]>([]);
  const [links, setLinks] = useState<string[]>([]);

  useEffect(() => {
    const data: TreeNodeData = {
      idMatch: 'root',
      nameTeamHome: 'indefinido',
      homeTeamGoals: 0,
      nameTeamAway: 'indefinido',
      awayTeamGoals: 0,
      children: [
        {
          idMatch: '1',
          nameTeamHome: 'indefinido',
          homeTeamGoals: 0,
          nameTeamAway: 'indefinido',
          awayTeamGoals: 0,
          children: [
            {
              idMatch: 'D',
              nameTeamHome: 'Time D',
              homeTeamGoals: 1,
              nameTeamAway: 'Time X',
              awayTeamGoals: 2,
            },
            {
              idMatch: 'E',
              nameTeamHome: 'Time E',
              homeTeamGoals: 3,
              nameTeamAway: 'Time Y',
              awayTeamGoals: 0,
            },
          ],
        },
        {
          idMatch: '2',
          nameTeamHome: 'indefinido',
          homeTeamGoals: 0,
          nameTeamAway: 'indefinido',
          awayTeamGoals: 0,
          children: [
            {
              idMatch: 'F',
              nameTeamHome: 'Time F',
              homeTeamGoals: 2,
              nameTeamAway: 'Time Z',
              awayTeamGoals: 1,
            },
            {
              idMatch: 'final',
              nameTeamHome: 'Zitta',
              homeTeamGoals: 0,
              nameTeamAway: 'Tayna',
              awayTeamGoals: 0,
            },
          ],
        },
      ],
    };

    const root = d3.hierarchy<TreeNodeData>(data);
    const treeLayout = d3.tree<TreeNodeData>().size([height - 2 * margin, width - 2 * margin]);
    treeLayout(root);

    const renderedNodes: RenderNode[] = root.descendants().map((d) => ({
      x: d.x + margin,
      y: width - margin - d.y,
      teamHome: d.data.nameTeamHome,
      teamAway: d.data.nameTeamAway,
      homeGoals: d.data.homeTeamGoals,
      awayGoals: d.data.awayTeamGoals,
      link: d.data.idMatch ? `/jogos/${d.data.idMatch}` : undefined,
    }));

    const renderedLinks = root.links().map((d) => {
      const sourceX = width - margin - d.source.y;
      const sourceY = d.source.x + margin;
      const targetX = width - margin - d.target.y;
      const targetY = d.target.x + margin;
      const midX = (sourceX + targetX) / 2;
      return `M${sourceX},${sourceY} H${midX} V${targetY} H${targetX}`;
    });

    setNodes(renderedNodes);
    setLinks(renderedLinks);
  }, []);

  return (
    <svg width={width} height={height}>
      {links.map((path, i) => (
        <path key={`link-${i}`} d={path} fill="none" stroke="#999" strokeWidth={2} />
      ))}
      {nodes.map((node, i) => (
        <MatchNode
          key={`node-${i}`}
          x={node.y}
          y={node.x}
          teamHome={node.teamHome}
          homeGoals={node.homeGoals}
          teamAway={node.teamAway}
          awayGoals={node.awayGoals}
          link={node.link}
        />
      ))}
    </svg>
  );
};

export default BracketTree;
