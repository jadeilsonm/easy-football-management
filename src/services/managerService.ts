import api from "./api"

interface getAllByUserResponse {
  id: string;
  name: string;
  description: string;
  type: string;
  startDate: string;
  endDate: string;
  award: number;
  quantityTeams: number;
  status: string;
}

const mockResultApiGetAll: getAllByUserResponse[] = [
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "Copa Palmares",
    "description": "Copa Palmares de Futebol",
    "type": "CUP",
    "startDate": "2025-06-22",
    "endDate": "2025-06-22",
    "award": 1500.00,
    "quantityTeams": 8,
    "status": "CREATED",
  }
  , {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa7",
    "name": "Copa Verão",
    "description": "Copa Verão de Futebol",
    "type": "CUP",
    "startDate": "2025-07-01",
    "endDate": "2025-07-15",
    "award": 2000.00,
    "quantityTeams": 4,
    "status": "IN_PROGRESS",
  }, {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa8",
    "name": "Copa Primavera",
    "description": "Copa Primavera de Futebol",
    "type": "CUP",
    "startDate": "2025-09-01",
    "endDate": "2025-09-15",
    "award": 2500.00,
    "quantityTeams": 16,
    "status": "FINISH",}
]

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

const managerService = {
    getAllByUser: (): getAllByUserResponse[] => {
        // const response = await api.get<token>('/auth/login', userAuth);
        return mockResultApiGetAll; //response.data;
    },

    // register: async (user: Omit<user,'id'>): Promise<token> => {
    //     const response = await api.post<token>('/auth/register', user);
    //     return response.data;
    // }

}

export default managerService;