import { createContext, useEffect, useState } from 'react';
import { API_REQUESTS, request } from '../api/api';
import { getLocalStorageItemsHelper } from '../helpers/local-storage.helper';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getUserAuth = async () => {
      try {
        const { accessToken, refreshToken } = getLocalStorageItemsHelper();

        if (!accessToken && !refreshToken) {
          setCurrentUser(null);
          return;
        }

        const data = await request(API_REQUESTS.auth, 'GET', {
          headers: {
            authorization: `Bearer ${accessToken} ${refreshToken}`,
          },
        });

        setCurrentUser(data);
      } catch (error) {
        console.log(error);

        setCurrentUser(null);
      }
    };

    getUserAuth();
  }, []);

  const value = { currentUser, setCurrentUser };

  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
};
