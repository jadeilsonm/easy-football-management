<!-- <template>
  <div class="bracket-container">
    <div class="stage" v-for="(stage, stageIndex) in stages" :key="stageIndex">
      <div
        class="match"
        v-for="(match, matchIndex) in stage.matches"
        :key="matchIndex"
      >
        <div class="team" v-for="(team, teamIndex) in match.teams" :key="teamIndex">
          <span class="team-name">{{ team.name }}</span>
          <img
            class="team-icon"
            :src="team.icon"
            alt="team icon"
          />
          <span class="result">{{ team.result }}</span>
        </div>
        <div class="advance-indicator">V</div>
      </div>
    </div>
    <div class="final">
      <img src="golden-circle.png" alt="final" class="final-icon" />
    </div>
  </div>
</template>

<script setup>

    const stages = [
      {
        matches: [
          {
            teams: [
              { name: "1A", icon: "ball-icon.png", result: "V" },
              { name: "2B", icon: "ball-icon.png", result: "" },
            ],
          },
          {
            teams: [
              { name: "1C", icon: "ball-icon.png", result: "V" },
              { name: "2D", icon: "ball-icon.png", result: "" },
            ],
          },
          // Adicione outras partidas aqui
        ],
      },
      // Adicione outros estágios
    ];
</script>

<style scoped>
.bracket-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: radial-gradient(circle, #111, #000);
  color: gold;
}

.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.match {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.team {
  display: flex;
  align-items: center;
  gap: 10px;
}

.team-name {
  font-size: 14px;
}

.team-icon {
  width: 20px;
  height: 20px;
}

.result {
  font-size: 14px;
  font-weight: bold;
}

.advance-indicator {
  margin-top: 10px;
  font-size: 16px;
  color: gold;
}

.final {
  margin: 20px;
  display: flex;
  justify-content: center;
}

.final-icon {
  width: 100px;
  height: 100px;
}
</style> -->
