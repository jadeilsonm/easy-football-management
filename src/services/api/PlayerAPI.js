
export const RequestAllPlayersTeamAPI = async (PramasId) => {
  const url = `http://localhost:8080/api/v1/players/${PramasId}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify(Body)
  });

  if (!response.ok) {
    throw new Error(`Erro: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};


