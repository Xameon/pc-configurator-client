import { Fragment, useContext, useState } from 'react';
import { UserContext } from '../../contexts/user.context';

import Button from '../../components/button/button.component';
import PcConfiguration from '../../components/pc-configuration/pc-configuration.component';
import ConfigNameInput from '../../components/config-name-input/config-name-input.component';

import './user-configs.styles.scss';

const configs = [
  {
    name: 'Config 1',
    cpu: 'AMD Ryzen 5 5600G',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3060',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 2',
    cpu: 'AMD Ryzen 5 5600',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3060 Ti',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 3',
    cpu: 'AMD Ryzen 5 5500',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3050',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 4',
    cpu: 'AMD Ryzen 5 5600G',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3060',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 5',
    cpu: 'AMD Ryzen 5 5600',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3060 Ti',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 6',
    cpu: 'AMD Ryzen 5 5500',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3050',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 7',
    cpu: 'AMD Ryzen 5 5600G',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3060',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 8',
    cpu: 'AMD Ryzen 5 5600',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3060 Ti',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 9',
    cpu: 'AMD Ryzen 5 5500',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3050',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 10',
    cpu: 'AMD Ryzen 5 5600G',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3060',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 2',
    cpu: 'AMD Ryzen 5 5600',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3060 Ti',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 3',
    cpu: 'AMD Ryzen 5 5500',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3050',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 1',
    cpu: 'AMD Ryzen 5 5600G',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3060',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 2',
    cpu: 'AMD Ryzen 5 5600',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3060 Ti',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 3',
    cpu: 'AMD Ryzen 5 5500',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3050',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 1',
    cpu: 'AMD Ryzen 5 5600G',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3060',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 2',
    cpu: 'AMD Ryzen 5 5600',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3060 Ti',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 3',
    cpu: 'AMD Ryzen 5 5500',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3050',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 1',
    cpu: 'AMD Ryzen 5 5600G',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3060',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 2',
    cpu: 'AMD Ryzen 5 5600',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3060 Ti',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 3',
    cpu: 'AMD Ryzen 5 5500',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3050',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 1',
    cpu: 'AMD Ryzen 5 5600G',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3060',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 2',
    cpu: 'AMD Ryzen 5 5600',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3060 Ti',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
  {
    name: 'Config 3',
    cpu: 'AMD Ryzen 5 5500',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3050',
    ram: '16GB',
    rom: '1 TGB',
    power: '500W',
  },
];

const UserConfigs = () => {
  const { currentUser } = useContext(UserContext);
  const [configsBarOpened, setConfigsBarOpened] = useState(true);
  const [currentConfig, setCurrentConfig] = useState(null);

  const [arrowLeft, arrowRight] = [
    String.fromCharCode(8249),
    String.fromCharCode(8250),
  ];

  const toggleConfigsBar = () => {
    setConfigsBarOpened(!configsBarOpened);
  };

  return (
    <div className='user-page-container'>
      <div className='configs-bar'>
        <div className={`configs ${!configsBarOpened && 'closed'}`}>
          {configs.map((config, idx) => (
            <div
              key={idx}
              className='config-name'
              onClick={() => setCurrentConfig(configs[idx])}
            >
              {config.name}
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
              <ConfigNameInput initialValue={currentConfig.name} />
              <PcConfiguration config={currentConfig} />
              <div className='buttons'>
                <Button buttonStyle='delete'>Delete</Button>
                <Button buttonStyle='primary'>Save</Button>
              </div>
            </Fragment>
          ) : (
            'Select your configuration from left list.'
          )}
        </div>
      </div>
    </div>
  );
};

export default UserConfigs;
