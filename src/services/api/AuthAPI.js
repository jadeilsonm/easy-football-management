export const RequestLoginAPI = async (RequestBody) => {
  const url = `http://localhost:8080/auth/login`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(RequestBody)
  });

  if (!response.ok) {
    throw new Error(`Erro: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const RequestRegisterAPI = async (RequestBody) => {
  const url = `http://localhost:8080/auth/register`;
  console.log("foi")
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(RequestBody)
  });

  if (!response.ok) {
    throw new Error(`Erro: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  console.log("foi", data)
  return data;
};
