
export const RequestChampionshipsAPI = async () => {
  const url = `http://localhost:8080/api/v1/championships`;
  const { token } = JSON.parse(localStorage.getItem("GlobalStore"));


  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });

  console.log("RequestChampionshipsAPI", url, token);

  if (!response.ok) {
    console.error(`Erro: ${response.status} - ${response.statusText}`);
    throw new Error(`Erro: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  console.log(data);
  return data;
};

export const RequestChampionshipsByIdAPI = async (params) => {
  const url = `http://localhost:8080/api/v1/championships?championshipId=${params}`;
  const { token } = JSON.parse(localStorage.getItem("GlobalStore"));


  const response = await fetch(url, {
    method: 'GET',
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
