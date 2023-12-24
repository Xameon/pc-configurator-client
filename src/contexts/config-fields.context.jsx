import { createContext, useState } from 'react';

const defaultConfigFields = {
  budget: 1,
  perfomance: 1,
  memory: 1,
};

export const ConfigFieldsContext = createContext({
  configFields: defaultConfigFields,
  setConfigFields: () => null,
  config: null,
  setConfig: () => null,
  lastConfig: null,
});

export const ConfigFieldsProvider = ({ children }) => {
  const [configFields, setConfigFields] = useState(defaultConfigFields);
  const [config, setConfig] = useState(
    JSON.parse(localStorage.getItem('lastConfig'))
  );

  console.log(config.name);

  const setConfigHandler = (config) => {
    try {
      const { configuration, rom, ram, power } = config;

      const { id, chipset, cpu, gpu } = configuration;

      const readableConfig = {
        name: 'New Config',
        cpu: `${cpu.сompany} ${cpu.branding} ${cpu.model}`,
        chipset,
        gpu: `${gpu.company} ${gpu.model}`,
        ram: `${ram.toString()} GB`,
        power: `${power.toString()} W`,
        id,
      };

      switch (rom) {
        case 1:
          readableConfig.rom = '128 GB';
          break;
        case 2:
          readableConfig.rom = '256 GB';
          break;
        case 3:
          readableConfig.rom = '512 GB';
          break;
        case 4:
          readableConfig.rom = '1 TB';
          break;
        case 5:
          readableConfig.rom = '2 TB';
          break;
        case 6:
          readableConfig.rom = '4 TB';
          break;
        default:
          readableConfig.rom = '128 GB';
      }

      setConfig(readableConfig);
      setConfigFields(defaultConfigFields);

      localStorage.setItem('lastConfig', JSON.stringify(readableConfig));
    } catch (e) {
      setConfig(null);
      localStorage.removeItem('lastConfig');
    }
  };

  const value = {
    configFields,
    setConfigFields,
    config,
    setConfig,
    setConfigHandler,
  };

  return (
    <ConfigFieldsContext.Provider value={value}>
      {children}
    </ConfigFieldsContext.Provider>
  );
};
