import { ReactComponent as Cpu } from '../../assets/icons/cpu.svg';
import { ReactComponent as Chipset } from '../../assets/icons/chipset.svg';
import { ReactComponent as Gpu } from '../../assets/icons/gpu.svg';
import { ReactComponent as Ram } from '../../assets/icons/ram.svg';
import { ReactComponent as Rom } from '../../assets/icons/rom.svg';
import { ReactComponent as PowerUnit } from '../../assets/icons/power-unit.svg';

import './pc-configuration.styles.scss';

const pcComponents = [
  { icon: <Cpu className='pc-component-icon' />, value: 'cpu' },
  { icon: <Chipset className='pc-component-icon' />, value: 'chipset' },
  { icon: <Gpu className='pc-component-icon' />, value: 'gpu' },
  { icon: <Ram className='pc-component-icon' />, value: 'ram' },
  { icon: <Rom className='pc-component-icon' />, value: 'rom' },
  { icon: <PowerUnit className='pc-component-icon' />, value: 'power' },
];

const PcConfiguration = ({ config }) => {
  return (
    <div className='pc-config-container'>
      {pcComponents.map(({ icon, value }, idx) => (
        <div key={idx} className='component' title='Copy'>
          <div className='icon-conainer'>{icon}</div>
          <div className='value'>
            <span className='component-name'>{value}: </span>
            {`${config[value]}`}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PcConfiguration;
