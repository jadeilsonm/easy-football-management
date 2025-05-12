import { API_URL } from "@/Utils/constantes";

export const RequestAllPlayersTeamAPI = async (PramasId) => {
  const url = `http://localhost:8080/api/v1/players/${PramasId}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (!response.ok) {
    throw new Error(`Erro: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const CreatePlayersAPI = async (PramasId) => {
  const url = `http://localhost:8080/api/v1/player/${PramasId}`;
  const { token } = JSON.parse(localStorage.getItem("GlobalStore"));


  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });

  if (!response.ok) {
    throw new Error(`Erro: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const DeletePlayersTeamAPI = async (PramasId) => {
  const url = `http://localhost:8080/api/v1/player/${PramasId}`;
  const { token } = JSON.parse(localStorage.getItem("GlobalStore"));

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }


  if (response.status !== 204) {
    const data = await response.json();
    return data;
  }

  return null;
};

export const RequestUpdatePlayerAPI = async (PramasId, Body) => {
  const url = `http://localhost:8080/api/v1/player/${PramasId}`;
  const { token } = JSON.parse(localStorage.getItem("GlobalStore"));

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(Body)
  });

  if (!response.ok) {
    throw new Error(`Erro: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
