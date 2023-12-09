import { createContext, useState } from 'react';

const defaultConfigFields = {
  budget: 1,
  perfomance: 1,
  memory: 1,
};

export const ConfigFieldsContext = createContext({
  configFields: defaultConfigFields,
  setConfigFields: () => null,
});

export const ConfigFieldsProvider = ({ children }) => {
  const [configFields, setConfigFields] = useState(defaultConfigFields);

  const value = { configFields, setConfigFields };

  return (
    <ConfigFieldsContext.Provider value={value}>
      {children}
    </ConfigFieldsContext.Provider>
  );
};
