<template>
  <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer" class="match-node-link">
    <g :transform="`translate(${x}, ${y})`" class="match-node">
      <rect x="-60" y="-25" width="120" height="50" rx="8" ry="8" fill="white" stroke="black" />

      <text x="-50" y="-7" font-size="12" text-anchor="start" fill="black">{{ teamHome }}</text>
      <text x="50" y="-7" font-size="12" text-anchor="end" fill="black">{{ homeGoals }}</text>

      <text x="-50" y="13" font-size="12" text-anchor="start" fill="black">{{ teamAway }}</text>
      <text x="50" y="13" font-size="12" text-anchor="end" fill="black">{{ awayGoals }}</text>
    </g>
  </a>

  <g v-else :transform="`translate(${x}, ${y})`" class="match-node">
    <rect x="-60" y="-25" width="120" height="50" rx="8" ry="8" fill="white" stroke="black" />

    <text x="-50" y="-7" font-size="12" text-anchor="start" fill="black">{{ teamHome }}</text>
    <text x="50" y="-7" font-size="12" text-anchor="end" fill="black">{{ homeGoals }}</text>

    <text x="-50" y="13" font-size="12" text-anchor="start" fill="black">{{ teamAway }}</text>
    <text x="50" y="13" font-size="12" text-anchor="end" fill="black">{{ awayGoals }}</text>
  </g>
</template>

<script setup lang="ts">
interface MatchNodeProps {
  x: number
  y: number
  teamHome: string
  homeGoals: number
  teamAway: string
  awayGoals: number
  link?: string
}

const props = defineProps<MatchNodeProps>()
</script>

<style scoped>
.match-node-link {
  cursor: pointer;
}

.match-node-link:hover rect {
  stroke: #007bff;
  stroke-width: 2;
}
</style>
