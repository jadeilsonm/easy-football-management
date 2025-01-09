import { DAOService } from "./DAOService";

const DAOUsers = new DAOService("users");
const DAOComp = new DAOService("chanpions_ships");
const DAOClassification = new DAOService("classification");
const DAOPlayers = new DAOService("players");
const DAOTeams = new DAOService("teams");

export { DAOUsers, DAOComp, DAOClassification, DAOPlayers, DAOTeams };
