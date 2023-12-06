import Stepper from '../../components/stepper/stepper.component';

import './create-pc.styles.scss';

const CreatePc = () => {
  return (
    <div className='create-pc-container'>
      <Stepper stagesCount={3} />
    </div>
  );
};

export default CreatePc;
