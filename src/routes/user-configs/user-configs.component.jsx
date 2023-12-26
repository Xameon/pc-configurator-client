import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../components/button/button.component';
import PcConfiguration from '../../components/pc-configuration/pc-configuration.component';

import { API_REQUESTS, request } from '../../api/api.js';

import { arrowLeft, arrowRight } from '../../assets/special-char.js';

import './user-configs.styles.scss';

const UserConfigs = () => {
  const [configsBarOpened, setConfigsBarOpened] = useState(true);
  const [currentConfig, setCurrentConfig] = useState(null);
  const [configsList, setConfigsList] = useState([]);

  const { t } = useTranslation();
  const text = t('userConfigs', { returnObjects: true });

  useEffect(() => {
    const loadList = async () => {
      const configsListData = await request(API_REQUESTS.userConfigs, 'GET', {
        headers: {},
      });
      setConfigsList(configsListData);
    };
    loadList();
  }, [currentConfig]);

  const toggleConfigsBar = () => {
    setConfigsBarOpened(!configsBarOpened);
  };

  const selectConfigHandler = async (configId, configName) => {
    const currentConfigData = await request(
      `${API_REQUESTS.userConfigs}/${configId}`,
      'GET',
      {
        header: {},
      }
    );

    const { chipset, cpu, gpu } = currentConfigData.configuration;
    const { power, ram, rom, configurationId } = currentConfigData;

    const readableConfig = {
      name: configName,
      cpu: `${cpu.company} ${cpu.branding} ${cpu.model}`,
      chipset,
      gpu: `${gpu.company} ${gpu.model}`,
      ram,
      power,
      rom,
      configurationId,
    };

    setCurrentConfig(readableConfig);
  };

  const deleteConfigHandler = async (configId) => {
    await request(API_REQUESTS.userConfigs, 'DELETE', {
      headers: {},
      body: { configurationId: configId },
    });
    setCurrentConfig(null);
  };

  return (
    <div className='user-page-container'>
      <div className='configs-bar'>
        <div className={`configs ${!configsBarOpened && 'closed'}`}>
          {configsList.map(({ name, id, configurationId }) => (
            <div
              key={id}
              className='config-name'
              onClick={() => selectConfigHandler(configurationId, name)}
            >
              {name}
            </div>
          ))}
        </div>
        <Button buttonStyle='toggle-configs-bar' onClick={toggleConfigsBar}>
          {configsBarOpened ? arrowLeft : arrowRight}
        </Button>
      </div>
      <div className='user-container'>
        <div className='current-config'>
          {currentConfig !== null ? (
            <Fragment>
              <div className='current-config-name'>{currentConfig.name}</div>
              <PcConfiguration config={currentConfig} />
              <div className='buttons'>
                <Button
                  buttonStyle='delete w100'
                  onClick={() =>
                    deleteConfigHandler(currentConfig.configurationId)
                  }
                >
                  {text.delete}
                </Button>
              </div>
            </Fragment>
          ) : configsList.length ? (
            text.selectFromList
          ) : (
            text.noConfigs
          )}
        </div>
      </div>
    </div>
  );
};

export default UserConfigs;
