import { createContext, useEffect, useState } from 'react';
import { API_REQUESTS, request } from '../api/api';
import { getLocalStorageItemsHelper } from '../helpers/local-storage.helper';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const defaultUser = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(defaultUser);

  useEffect(() => {
    const getUserAuth = async () => {
      try {
        const { accessToken, refreshToken } = getLocalStorageItemsHelper();

        if (!accessToken && !refreshToken) {
          setCurrentUser(defaultUser);
          return;
        }

        const data = await request(API_REQUESTS.auth, 'GET', {
          headers: {
            Authorization: `Bearer ${accessToken} ${refreshToken}`,
          },
        });

        if (data?.message) {
          throw new Error(data.message);
        }

        setCurrentUser({ ...currentUser, user: data });
      } catch (error) {
        console.error(error);

        if (error.message === 'Invalid Jwt Error') {
          setCurrentUser(defaultUser);
        }
      }
    };

    getUserAuth();
  }, []);

  const value = { currentUser, setCurrentUser };

  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
};
