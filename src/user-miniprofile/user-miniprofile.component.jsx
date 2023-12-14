import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../contexts/user.context';

import Button from '../components/button/button.component';

import { ReactComponent as ArrowDown } from '../assets/icons/chevron-down-outline.svg';
import { ReactComponent as ListIcon } from '../assets/icons/list.svg';
import { ReactComponent as SettingsIcon } from '../assets/icons/settings.svg';
import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg';

import { removeLocalStorageItemsHelper } from '../helpers/local-storage.helper';

import './user-minifpofile.styles.scss';

const UserMiniprofile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { name } = currentUser;
  const navigate = useNavigate();

  const [miniprofileOpened, setMiniprofileOpened] = useState(false);

  const toggleMiniprofile = () => {
    setMiniprofileOpened(!miniprofileOpened);
  };

  const logout = () => {
    setCurrentUser(null);
    removeLocalStorageItemsHelper(['accessToken', 'refreshToken']);
  };

  return (
    <div className='user-miniprofile-container'>
      <div
        className={`user-name-container ${miniprofileOpened && 'active'}`}
        onClick={toggleMiniprofile}
      >
        <span>{name}</span>
        <ArrowDown className={`arrow ${miniprofileOpened && 'active'}`} />
      </div>
      <div
        className={`user-options-container ${miniprofileOpened && 'active'}`}
      >
        <Button
          buttonStyle='user-option'
          onClick={() => navigate('/user-configs')}
        >
          <ListIcon className='option-icon' />
          <span>Configurations</span>
        </Button>
        <Button buttonStyle='user-option'>
          <SettingsIcon className='option-icon' />
          <span>Settings</span>
        </Button>
        <Button buttonStyle='logout' onClick={logout}>
          <span>Logout</span>
          <LogoutIcon className='option-icon' />
        </Button>
      </div>
    </div>
  );
};

export default UserMiniprofile;
