<template>
  <svg :width="width" :height="height">
    <path
      v-for="(path, i) in links"
      :key="'link-' + i"
      :d="path"
      fill="none"
      stroke="#999"
      stroke-width="2"
    />

    <MatchNode
      v-for="(node, i) in nodes"
      :key="'node-' + i"
      :x="node.y"
      :y="node.x"
      :team-home="node.teamHome"
      :home-goals="node.homeGoals"
      :team-away="node.teamAway"
      :away-goals="node.awayGoals"
      :link="node.link"
    />
  </svg>
</template>

<script setup lang="ts">
import * as d3 from 'd3'
import { onMounted, shallowRef } from 'vue'
import MatchNode from './MatchNode.vue'

const width = 800
const height = 500
const margin = 50

interface TreeNodeData {
  idMatch?: string
  nameTeamHome: string
  homeTeamGoals: number
  nameTeamAway: string
  awayTeamGoals: number
  children?: TreeNodeData[]
}

interface RenderNode {
  x: number
  y: number
  teamHome: string
  homeGoals: number
  teamAway: string
  awayGoals: number
  link?: string
}

const nodes = shallowRef<RenderNode[]>([])
const links = shallowRef<string[]>([])

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
}

onMounted(() => {
  const root = d3.hierarchy<TreeNodeData>(data)
  const treeLayout = d3.tree<TreeNodeData>().size([height - 2 * margin, width - 2 * margin])
  treeLayout(root)

  nodes.value = root.descendants().map((d) => ({
    x: d.x + margin,
    y: width - margin - d.y,
    teamHome: d.data.nameTeamHome || 'indefinido',
    teamAway: d.data.nameTeamAway || 'indefinido',
    homeGoals: d.data.homeTeamGoals ?? 0,
    awayGoals: d.data.awayTeamGoals ?? 0,
    link: d.data.idMatch ? `/jogos/${d.data.idMatch}` : undefined,
  }))

  links.value = root.links().map((d) => {
    const sourceX = width - margin - d.source.y
    const sourceY = d.source.x + margin
    const targetX = width - margin - d.target.y
    const targetY = d.target.x + margin
    const midX = (sourceX + targetX) / 2
    return `M${sourceX},${sourceY} H${midX} V${targetY} H${targetX}`
  })
})
</script>
