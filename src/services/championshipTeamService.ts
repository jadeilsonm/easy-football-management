import api from "./api";

interface ChampionshipTeamRequest {
    teamId: string;
    championshipsId: string;
}

const championshipTeamService = {
    register: async (teamId: string, championshipId: string): Promise<void> => {
        const requestData: ChampionshipTeamRequest = {
            teamId,
            championshipsId: championshipId
        };
        const response = await api.post('/api/v1/championshipsteams', requestData);
        return response.data;
    },

    isExists: async (teamId: string, championshipId: string): Promise<boolean> => {
        const response = await api.get(`/api/v1/championshipsteams/isExists?championshipId=${championshipId}&teamId=${teamId}`);
        console.log("isExists:  ",response.data);
        return response.data ? true : false;
    }
}

export default championshipTeamService;