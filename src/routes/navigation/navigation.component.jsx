import { useContext, Fragment } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { UserContext } from '../../contexts/user.context';

import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import Button from '../../components/button/button.component';
import UserMiniprofile from '../../components/user-miniprofile/user-miniprofile.component';
import LangChanger from '../../components/language-changer/lang-changer.component';

import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className='navigation-container'>
        <div className='links-container'>
          <Button buttonStyle={'logo'} onClick={() => navigate('/')}>
            <Logo className='logo' />
          </Button>
        </div>
        <div className='menu-container'>
          <LangChanger />
          {currentUser ? (
            <UserMiniprofile />
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
