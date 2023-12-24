import { useState } from 'react';
import Loader from '../../components/loader/loader.component';
import Stepper from '../../components/stepper/stepper.component';

import './create-pc.styles.scss';

const CreatePc = () => {
  const [loaderActive, setLoaderActive] = useState(false);

  return (
    <div className='create-pc-container'>
      <Loader active={loaderActive} message='Creating config...' />
      <Stepper stagesCount={3} setLoaderActive={setLoaderActive} />
    </div>
  );
};

export default CreatePc;
