import { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ConfigFieldsContext } from '../../contexts/config-fields.context';
import { UserContext } from '../../contexts/user.context';

import PcConfiguration from '../../components/pc-configuration/pc-configuration.component';
import Button from '../../components/button/button.component';
import ConfigNameInput from '../../components/config-name-input/config-name-input.component';

import './new-pc.styles.scss';
import { API_REQUESTS, request } from '../../api/api';

const NewPc = () => {
  const { currentUser } = useContext(UserContext);
  const { config } = useContext(ConfigFieldsContext);

  const navigate = useNavigate();

  const saveConfigHandler = () => {
    if (currentUser) {
      request(API_REQUESTS.userConfigs, 'POST', {
        header: {},
        body: {
          name: config.name,
          configurationId: config.id,
        },
      });
      // ...
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className='new-pc-container'>
      {config ? (
        <Fragment>
          <ConfigNameInput initialValue={config.name} />
          <PcConfiguration config={config} />
          <div className='buttons-container'>
            <Button buttonStyle='secondary' onClick={() => navigate('/create')}>
              Create new
            </Button>
            <Button buttonStyle='primary' onClick={saveConfigHandler}>
              Save config
            </Button>
          </div>
        </Fragment>
      ) : (
        <div>Oops, something went wrong.</div>
      )}
    </div>
  );
};

export default NewPc;
