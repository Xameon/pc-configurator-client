import PcConfiguration from '../../components/pc-configuration/pc-configuration.component';
import Button from '../../components/button/button.component';

import './new-pc.styles.scss';
import ConfigNameInput from '../../components/config-name-input/config-name-input.component';

const NewPc = () => {
  const pcConfig = {
    cpu: 'Ryzen 5 5600G',
    chipset: 'B450',
    gpu: 'NVIDIA RTX 3060',
    rom: '1 TB',
    ram: '16 GB',
    power: '500W',
  };

  return (
    <div className='new-pc-container'>
      <ConfigNameInput />

      <PcConfiguration config={pcConfig} />

      <div className='buttons-container'>
        <Button buttonStyle='secondary'>Create new</Button>
        <Button buttonStyle='primary'>Save config</Button>
      </div>
    </div>
  );
};

export default NewPc;
