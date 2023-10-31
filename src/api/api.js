const API_URL = 'https://pc-api.fly.dev/api';

export const API_REQUESTS = {
  googleAuth: `${API_URL}/auth/google`,
  register: `${API_URL}/auth/register`,
  login: `${API_URL}/auth/login`,
  auth: `${API_URL}/auth`,
};

export const request = async (url, method, args) => {
  if (!url) return;

  const { headers, body } = args;

  const response = await fetch(url, {
    method,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem(
        'accessToken'
      )} ${localStorage.getItem('refreshToken')}`,
      ...headers,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  return response.json();
};
