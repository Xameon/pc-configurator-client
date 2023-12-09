import { useState } from 'react';
import './config-name-input.styles.scss';

const ConfigNameInput = () => {
  const [configName, setConfigName] = useState('New Config');

  return (
    <div className='config-name-input'>
      <input
        type='text'
        value={configName}
        onChange={(e) => setConfigName(e.target.value)}
      />
    </div>
  );
};

export default ConfigNameInput;
