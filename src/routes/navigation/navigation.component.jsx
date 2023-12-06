import { useContext, Fragment } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { UserContext } from '../../contexts/user.context';
import { removeLocalStorageItemsHelper } from '../../helpers/local-storage.helper';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import Button from '../../components/button/button.component';

import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    setCurrentUser(null);
    removeLocalStorageItemsHelper(['accessToken', 'refreshToken']);
  };

  return (
    <Fragment>
      <div className='navigation-container'>
        <div className='links-container'>
          <Button buttonStyle={'logo'} onClick={() => navigate('/')}>
            <Logo className='logo' />
          </Button>
        </div>
        <div className='menu-container'>
          {currentUser ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Fragment>
              <Button buttonStyle={'sign-in'} onClick={() => navigate('/auth')}>
                SignIn
              </Button>
              <Button buttonStyle={'sign-up'} onClick={() => navigate('/auth')}>
                SignUp
              </Button>
            </Fragment>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
