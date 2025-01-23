const templateObj = (name = "indefinido", id = null) => {
  return {
    teamId: id,
    name,
    golsPlay: [],
    cardRed: [],
    caardYellow: [],
    golsAgainst: [],
  };
};

const mapToMatch = (num) => {
  const res = [];
  for (let i = 0; i < num; i++) {
    res.push({
      stage: "PENDENT",
      team1: templateObj(),
      team2: templateObj(),
    });
  }
  return res;
};

const serialize = (arr) => {
  return arr.map((obj) => {
    console.log(obj);
    const { id, name } = obj;
    return templateObj(name, id);
  });
};

const sortMatches = (teamsAll) => {
  const games = {
    round: 1,
  };
  const lengthAllMatches = teamsAll.length / 2;
  if (lengthAllMatches === 1)
    return (games[games] = {
      match1: {
        stage: "PENDENT",
        team1: templateObj(teamsAll[0].name, teamsAll[0].id),
        team2: templateObj(teamsAll[1].name, teamsAll[1].id),
      },
    });
  if (lengthAllMatches === 8) {
    const res = {};
    for (let i = 0; i < lengthAllMatches; i++) {
      const home = teamsAll.shift();
      teamsAll = teamsAll.sort(() => Math.random() - 0.5);
      const away = teamsAll.shift();
      res[`match ${i + 1}`] = {
        stage: home.id != null ? "CURRENT" : "PENDENT",
        team1: templateObj(home.name, home.id),
        team2: templateObj(away.name, away.id),
      };
    }
    return (games[games] = res);
  } else if (lengthAllMatches === 4) {
    const res = {};
    for (let i = 0; i < lengthAllMatches; i++) {
      const home = teamsAll.shift();
      teamsAll = teamsAll.sort(() => Math.random() - 0.5);
      const away = teamsAll.shift();
      res[`match ${i + 1}`] = {
        stage: home.id != null ? "CURRENT" : "PENDENT",
        team1: templateObj(home.name, home.id),
        team2: templateObj(away.name, away.id),
      };
    }
    return (games[games] = res);
  } else if (lengthAllMatches === 2) {
    const res = {};
    for (let i = 0; i < lengthAllMatches; i++) {
      const home = teamsAll.pop();
      teamsAll = teamsAll.sort(() => Math.random() - 0.5);
      const away = teamsAll.pop() || teamsAll[0];
      res[`match ${i + 1}`] = {
        stage: home.id != null ? "CURRENT" : "PENDENT",
        team1: templateObj(home.name, home.id),
        team2: templateObj(away.name, away.id),
      };
    }
    return (games[games] = res);
  }
};

const generatedRoundMatchCup = (listTeams) => {
  console.log("listTeams", listTeams);
  const countList = listTeams.length;
  const result = [];
  const x = sortMatches(listTeams);
  result.push(x);
  console.log(countList);
  if (countList == 2) {
    return result;
  }
  if (countList == 4) {
    const l = sortMatches(mapToMatch(2));
    console.log("2: ", l);
    result.push(l);
  }
  if (countList == 8) {
    const l = sortMatches(mapToMatch(4));
    console.log("2: ", l);
    result.push(l);
    result.push(sortMatches(mapToMatch(2)));
  }
  if (countList == 16) {
    const l = sortMatches(mapToMatch(8));
    console.log("2: ", l);
    result.push(l);
    result.push(sortMatches(mapToMatch(4)));
    result.push(sortMatches(mapToMatch(2)));
  }
  console.log("result", result);
  return result;
};

const genereateRoundMatches = (listTeams) => {
  console.log("listTeams", listTeams);
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
};

export { genereateRoundMatches, generatedRoundMatchCup };
