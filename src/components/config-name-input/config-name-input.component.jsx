import { useContext } from 'react';

import { ConfigFieldsContext } from '../../contexts/config-fields.context';

import './config-name-input.styles.scss';

const ConfigNameInput = () => {
  const { config, setConfig } = useContext(ConfigFieldsContext);

  return (
    <div className='config-name-input'>
      <input
        type='text'
        required
        value={config.name}
        onChange={(e) => setConfig({ ...config, name: e.target.value })}
      />
    </div>
  );
};

export default ConfigNameInput;
