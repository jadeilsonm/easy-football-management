import { DAOService } from "./DAOService";

const DAOUsers = new DAOService("users");
const DAOChanpionShip = new DAOService("chanpionShip");
const DAOClassification = new DAOService("classification");
const DAOPlayers = new DAOService("players");
const DAOTeams = new DAOService("teams");
const DAORoundMatches = new DAOService("roundMatches");

export {
  DAOUsers,
  DAOChanpionShip,
  DAOClassification,
  DAOPlayers,
  DAOTeams,
  DAORoundMatches,
};
