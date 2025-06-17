
export const RequestChampionshipsTeamsAPI = async (Body) => {
  const url = `http://localhost:8080/api/v1/championshipsteams`;
  const { token } = JSON.parse(localStorage.getItem("GlobalStore"));


  const response = await fetch(url, {
    method: 'POST',
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

export const getChampionshipsTeams = async (championshipId, teamId) => {
  const url = `http://localhost:8080/api/v1/championshipsteams/isExists?championshipId=${championshipId}&teamId=${teamId}`;
  console.log("Constructed URL:", url);
  const { token } = JSON.parse(localStorage.getItem("GlobalStore"));


  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
  });

  console.log("Response from getChampionshipsTeams:", response);

  if (response.status === 200) {
    return true;
  }

  if (response.status === 204)
    return false;

  throw new Error(`Erro: ${response.status} - ${response.statusText}`);
};

export const DeleteChampionshipsTeams = async (Body) => {
  const url = `http://localhost:8080/api/v1/championshipsteams`;
  const { token } = JSON.parse(localStorage.getItem("GlobalStore"));


  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(Body)
  });

  console.log("Response from DeleteChampionshipsTeams:", response);

  if (!response.ok) {
    throw new Error(`Erro: ${response.status} - ${response.statusText}`);
  }


  // const data = await response.json();
  return true;
};
