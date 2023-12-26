import { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ConfigFieldsContext } from '../../contexts/config-fields.context';
import { UserContext } from '../../contexts/user.context';

import PcConfiguration from '../../components/pc-configuration/pc-configuration.component';
import Button from '../../components/button/button.component';
import ConfigNameInput from '../../components/config-name-input/config-name-input.component';
import { API_REQUESTS, request } from '../../api/api';

import './new-pc.styles.scss';

const NewPc = () => {
  const { currentUser } = useContext(UserContext);
  const { config } = useContext(ConfigFieldsContext);

  const [configSaved, setConfigSaved] = useState(false);

  const navigate = useNavigate();

  const { t } = useTranslation();
  const text = t('newPc', { returnObjects: true });

  const saveConfigHandler = () => {
    const createdConfig = {
      name: config.name,
      configurationId: config.id,
      ram: config.ram,
      rom: config.rom,
      power: config.power,
    };

    if (currentUser) {
      request(API_REQUESTS.userConfigs, 'POST', {
        header: {},
        body: createdConfig,
      });

      setConfigSaved(true);
    } else {
      localStorage.setItem('createdConfig', JSON.stringify(createdConfig));
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
            <Button
              buttonStyle='secondary w50'
              onClick={() => navigate('/create')}
            >
              {text.createNew}
            </Button>
            <Button
              buttonStyle={`primary w50 ${configSaved && 'lock'}`}
              onClick={saveConfigHandler}
            >
              {configSaved ? text.saved : text.save}
            </Button>
          </div>
        </Fragment>
      ) : (
        <div>{text.unexpectedError}</div>
      )}
    </div>
  );
};

export default NewPc;
