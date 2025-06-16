// import { PiniaStore } from '@/stores';

// const globalStore = PiniaStore();

export const RequestAPI = async (url, options = {}) => {
  const {
    params,
    method = 'GET',
    body = null,
  } = options;

  try {
    const baseUrl = 'http://localhost:8080';
    const fullUrl = `${baseUrl}${url}${params ? '/' + params : ''}`;
    
    const globalStore = localStorage.getItem("GlobalStore");
    const { token } = globalStore ? JSON.parse(globalStore) : { token: null };

    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      ...(body && { body: JSON.stringify(body) })
    };

    const response = await fetch(fullUrl, config);
    console.log("ResponseAPI: ", response);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("ResponseAPI Data: ", data);
    return data;
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
};

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
