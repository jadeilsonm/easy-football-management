import { DAOChanpionShip } from ".";
import { genereateRoundMatches } from "./ServiceRoundMatches";

const getChampionShip = async (championShipId) => {
  const result = await DAOChanpionShip.getById(championShipId);
  if (result.matches === undefined) {
    const matchsGenerated = genereateRoundMatches(result.teams);
    result.matches = matchsGenerated;
    await DAOChanpionShip.update(championShipId, result);
  }
  return result;
};

const staticTeam = {
  pontos: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsDifference: 0,
  efficiency: 0,
};

const sortClassification = (chanpionShip) => {
  const teams = {};
  chanpionShip.matches.forEach((round) => {
    console.log("round game", round.games);
    for (const key in round.games) {
      const { team1, team2 } = round.games[key];
      if (!teams[team1.teamId]) {
        teams[team1.teamId] = { ...staticTeam, name: team1.name };
      }
      if (!teams[team2.teamId]) {
        teams[team2.teamId] = { ...staticTeam, name: team2.name };
      }
      if (team1.stage === "FINISHED" && team2.stage === "FINISHED") {
        teams[team1.teamId].totalGames += 1;
        teams[team2.teamId].totalGames += 1;
        teams[team1.teamId].goalsFavor += team1.score;
        teams[team2.teamId].goalsFavor += team2.score;
        teams[team1.teamId].goalsOwn += team2.score;
        teams[team2.teamId].goalsOwn += team1.score;
        teams[team1.teamId].goalsDifference = teams[team1.teamId].goalsFavor - teams[team1.teamId].goalsOwn;
        teams[team2.teamId].goalsDifference = teams[team2.teamId].goalsFavor - teams[team2.teamId].goalsOwn;

        if (team1.score > team2.score) {
          console.log("ok");
          console.log("match", round.games[key]);
          console.log("team1", teams[team1.teamId].totalGames);
          teams[team1.teamId].totalVictories += 1;
          teams[team2.teamId].totalLosses += 1;
          teams[team1.teamId].pontos += 3;
        } else if (team1.score < team2.score) {
          teams[team2.teamId].totalVictories += 1;
          teams[team1.teamId].totalLosses += 1;
          teams[team2.teamId].pontos += 3;
        } else {
          teams[team1.teamId].totalDraws += 1;
          teams[team2.teamId].totalDraws += 1;
          teams[team1.teamId].pontos += 1;
          teams[team2.teamId].pontos += 1;
        }
      }
    };
    console.log("finish", teams);
  });

  console.log("teams", teams);
  const x = Object.values(teams).sort((a, b) => {
    if (a.pontos === b.pontos) {
      if (a.totalVictories === b.totalVictories) {
        if (a.goalsDifference === b.goalsDifference) {
          return a.goalsFavor - b.goalsFavor;
        }
        return a.goalsDifference - b.goalsDifference;
      }
      return a.totalVictories - b.totalVictories;
    }
    return b.pontos - a.pontos;
  });
  console.log("x", x);
  return x;
};

const generateClassification = async (championShipId) => {
  const result = await getChampionShip(championShipId);
  const classification = sortClassification(
    result
  );
  return classification;
};

export { generateClassification };
