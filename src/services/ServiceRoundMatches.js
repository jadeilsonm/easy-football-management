const serialize = (arr) => {
  return arr.map(obj => {
    console.log(obj);
    const { id , name } = obj;
    return { teamId: id, name, golsPlay: [], cardRed: [], caardYellow: [], golsAgainst: []  };
  });
}

const generatedRoundMatchCup = (listTeams) => {

};

const genereateRoundMatches = (listTeams) => {
  console.log('listTeams', listTeams);
    const teams = serialize(listTeams);
    const rounds = [];
    const totalTeams = teams.length;

    const numberOfRounds = totalTeams - 1;
    const gamesPerRound = totalTeams / 2;

    for (let round = 0; round < numberOfRounds; round++) {
      const currentRound = {};

      for (let game = 0; game < gamesPerRound; game++) {
        const team1 = teams[game];
        const team2 = teams[totalTeams - 1 - game];

        currentRound[`match${game + 1}`] = { team1, team2 };
      }

      rounds.push({ round: round + 1, games: { ...currentRound } });

      teams.splice(1, 0, teams.pop());
    }

    for (let round = 0; round < numberOfRounds; round++) {
      const returnRound = {};

      for (let game = 0; game < gamesPerRound; game++) {
        const team1 = teams[game];
        const team2 = teams[totalTeams - 1 - game];

        returnRound[`match${game + 1}`] = { team1: team2, team2: team1 };
      }

      rounds.push({ round: round + 1, games: { ...returnRound } });

      teams.splice(1, 0, teams.pop());
    }
    return rounds;
}

export {
  genereateRoundMatches
};
