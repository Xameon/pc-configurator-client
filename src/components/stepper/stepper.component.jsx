import { useState, Fragment } from 'react';
import Button from '../button/button.component';

import { configureIntelligence } from '../../assets/configure-intelligence';

import './stepper.styles.scss';

const Stepper = ({ stagesCount }) => {
  const stagesMaxIndex = stagesCount - 1;

  const startStage = {
    currentStage: 0,
    progress: 0,
    steps: ['active'].concat(Array(stagesMaxIndex).fill('')),
  };

  const defaultFormFields = {
    budget: 1,
    perfomance: 1,
    memory: 1,
  };

  const [stage, setStage] = useState(startStage);
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { currentStage, progress, steps } = stage;
  const lastStage = currentStage === stagesMaxIndex;

  const handleNextStep = () => {
    if (lastStage) {
      return;
    }

    const newSteps = steps.map((step, idx) => {
      if (idx > currentStage + 1) {
        return step;
      }
      return !step ? 'active' : 'after';
    });

    setStage({
      currentStage: currentStage + 1,
      progress: progress + 1,
      steps: newSteps,
    });
  };

  const handlePrevStep = () => {
    if (currentStage === 0) {
      return;
    }

    const prevSteps = steps.map((step, idx) => {
      if (idx < currentStage - 1 || idx > currentStage) {
        return step;
      }

      return step === 'active' ? '' : 'active';
    });

    setStage({
      currentStage: currentStage - 1,
      progress: progress - 1,
      steps: prevSteps,
    });
  };

  const handleSubmit = (event) => {
    console.log('submit');
  };

  return (
    <div className='stepper-container'>
      <div className='slider'>
        <div
          className='progress'
          style={{
            transform: `translate(${-50 + (50 / stagesMaxIndex) * progress}%)`,
          }}
        >
          <div className='progress-after progress-part'></div>
          <div className='progress-before progress-part'></div>
        </div>
        {steps.map((step, idx) => (
          <div className={`step ${step}`} key={idx}></div>
        ))}
      </div>

      <form className='configure-form-container' onSubmit={handleSubmit}>
        {configureIntelligence.map(
          ({ header, min, max, description, property }, idx) => (
            <div
              className={`intelligence-container ${
                currentStage === idx ? 'active' : ''
              }`}
              key={idx}
            >
              <p className='intelligence-header'>{header}</p>
              <input
                className='intelligence-range'
                type='range'
                min={min}
                max={max}
                value={formFields[property]}
                onChange={(e) =>
                  setFormFields({ ...formFields, [property]: e.target.value })
                }
              />
              <p className='intelligence-description'>
                {description[formFields[property] - 1] || (
                  <Fragment>
                    <span className='intelligence-value'>
                      {formFields[property]}
                    </span>
                    {description[0]}
                  </Fragment>
                )}
              </p>
            </div>
          )
        )}

        <div className='buttons'>
          <Button
            buttonStyle='secondary'
            type='button'
            onClick={handlePrevStep}
          >
            Previous
          </Button>
          {lastStage && (
            <Button buttonStyle='primary' type='submit'>
              To configuration
            </Button>
          )}
          {!lastStage && (
            <Button
              buttonStyle='primary'
              type='button'
              onClick={handleNextStep}
            >
              Next
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Stepper;
