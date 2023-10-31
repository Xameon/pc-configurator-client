import { useContext, Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import { UserContext, defaultUser } from '../../contexts/user.context';
import { removeLocalStorageItemsHelper } from '../../helpers/local-storage.helper';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <Fragment>
      {currentUser.user ? (
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ color: 'green', fontWeight: 600 }}>Authorized</span>
          <button
            onClick={() => {
              setCurrentUser(defaultUser);
              removeLocalStorageItemsHelper(['accessToken', 'refreshToken']);
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <span style={{ color: 'red', fontWeight: 600 }}>Not Authorized</span>
      )}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
