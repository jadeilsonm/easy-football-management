import api from "./api"

export interface token {
    token: string | null
}

export interface userAuth {
    email: string,
    password: string
}

export interface user {
    id: string,
    name: string,
    email: string,
    password: string
}

const authService = {
    login: async (userAuth: userAuth): Promise<token> => {
        const response = await api.post<token>('/auth/login', userAuth);
        return response.data;
    },

    register: async (user: Omit<user,'id'>): Promise<token> => {
        const response = await api.post<token>('/auth/register', user);
        return response.data;
    }

}

export default authService;