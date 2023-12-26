const API_URL = 'https://comp-api.fly.dev/api';

export const API_REQUESTS = {
  googleAuth: `${API_URL}/auth/google`,
  register: `${API_URL}/auth/register`,
  login: `${API_URL}/auth/login`,
  auth: `${API_URL}/auth`,
  configurator: `${API_URL}/configurator`,
  userConfigs: `${API_URL}/user-configuration`,
};

export const request = async (url, method, args) => {
  if (!url) return;

  const { headers, body } = args;

  const requestInfo = {
    method,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem(
        'accessToken'
      )} ${localStorage.getItem('refreshToken')}`,
      ...headers,
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(url, requestInfo);

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  return response.json();
};
