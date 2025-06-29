import api from "./api"

interface IPlayer {
    id: string;
    name: string;
    position: string;
    number: number;
}

interface IPlayerRequest {
    name: string;
    position: string;
    number: number;
    teamId: string;
}

const tournamentService = {
    getAll: async (): Promise<IPlayer[]> => {
        const response = await api.get<IPlayer[]>('/api/v1/player/team/3f65f1e8-0f6c-4471-9851-accdadb40f5b');
        // console.log(response.data);
        return response.data;
    },

    create: async (player: Omit<IPlayer, 'id'>): Promise<IPlayer> => {
        const response = await api.post<IPlayer>('/api/v1/player', player);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/api/v1/player/${id}`);

    },
}

export default tournamentService;