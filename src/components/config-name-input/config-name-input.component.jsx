import { useEffect, useState } from 'react';

import './config-name-input.styles.scss';

const ConfigNameInput = ({ initialValue }) => {
  const [configName, setConfigName] = useState(initialValue);

  useEffect(() => setConfigName(initialValue), [initialValue]);

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
