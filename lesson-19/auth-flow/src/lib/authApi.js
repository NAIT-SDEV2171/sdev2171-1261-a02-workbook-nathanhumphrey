import { getApiBaseUrl } from './apiBaseUrl';

async function parseResponse(response) {
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.error ?? `Response status: ${response.status}`);
  }

  return body;
}

export async function loginRequest(credentials) {
  const response = await fetch(`${getApiBaseUrl()}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  return parseResponse(response);
}

export async function registerRequest(draft) {
  const response = await fetch(`${getApiBaseUrl()}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(draft),
  });

  return parseResponse(response);
}

export async function meRequest(token) {
  const response = await fetch(`${getApiBaseUrl()}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return parseResponse(response);
}

export async function authorizedGet(pathname, token) {
  const response = await fetch(`${getApiBaseUrl()}${pathname}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return parseResponse(response);
}
