
export const createChampionshipsAPI = async (Body) => {
  const url = `http://localhost:8080/api/v1/championships`;
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
};
