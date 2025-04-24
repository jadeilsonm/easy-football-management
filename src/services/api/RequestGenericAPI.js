// import { PiniaStore } from '@/stores';

// const globalStore = PiniaStore();

export const RequestGenericsAPI = async (Url, Params, Method, Body) => {
  const url = `http://localhost:8080${Url}${Params && ("/" + Params)}`;
  const { token } = JSON.parse(localStorage.getItem("GlobalStore"));


  const response = await fetch(url, {
    method: Method || 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    // (Body && body: JSON.stringify(Body || {}))
  });

  if (!response.ok) {
    throw new Error(`Erro: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const RequestGenericPostAPI = async (Url, Params, Method, Body) => {
  const url = `http://localhost:8080${Url}${Params && ("/" + Params)}`;
  const { token } = JSON.parse(localStorage.getItem("GlobalStore"));


  const response = await fetch(url, {
    method: Method || 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(Body || {})
  });

  if (!response.ok) {
    throw new Error(`Erro: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const RequestGenericDeleteAPI = async (Url, Params, Method) => {
  const url = `http://localhost:8080${Url}${Params && ("/" + Params)}`;
  const { token } = JSON.parse(localStorage.getItem("GlobalStore"));


  const response = await fetch(url, {
    method: Method || 'DELETE',
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
