import { useState, Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ConfigFieldsContext } from '../../contexts/config-fields.context';

import Button from '../button/button.component';

import { API_REQUESTS, request } from '../../api/api.js';

import './stepper.styles.scss';

const Stepper = ({ stagesCount, setLoaderActive }) => {
  const stagesMaxIndex = stagesCount - 1;
  const startStage = {
    currentStage: 0,
    progress: 0,
    steps: ['active'].concat(Array(stagesMaxIndex).fill('')),
  };

  const [stage, setStage] = useState(startStage);
  const { configFields, setConfigFields, setConfigHandler } =
    useContext(ConfigFieldsContext);

  const { currentStage, progress, steps } = stage;
  const lastStage = currentStage === stagesMaxIndex;

  const { t } = useTranslation();
  const text = t('configureIntelligence', { returnObjects: true });

  const configureIntelligence = {
    perfomance: {
      header: text.perfomance.header,
      min: 1,
      max: 4,
      description: text.perfomance.description,
    },
    budget: {
      header: text.budget.header,
      min: 1,
      max: 500,
      description: text.budget.description,
    },
    memory: {
      header: text.memory.header,
      min: 1,
      max: 6,
      description: text.memory.description,
    },
  };

  const navigate = useNavigate();

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoaderActive(true);

    const { perfomance, budget, memory } = configFields;

    const newConfig = await request(
      `${API_REQUESTS.configurator}?performance=${perfomance}&budget=${budget}&memory=${memory}`,
      'GET',
      { headers: {} }
    );

    setConfigHandler(newConfig);

    setLoaderActive(false);

    navigate('/new');
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
        {Object.keys(configureIntelligence).map((key, idx) => {
          const { header, min, max, description } = configureIntelligence[key];
          return (
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
                value={configFields[key]}
                onChange={(e) =>
                  setConfigFields({
                    ...configFields,
                    [key]: e.target.value,
                  })
                }
              />
              <p className='intelligence-description'>
                {description[configFields[key] - 1] || (
                  <Fragment>
                    <span className='intelligence-value'>
                      {configFields[key]}
                    </span>
                    {description[0]}
                  </Fragment>
                )}
              </p>
            </div>
          );
        })}

        <div className='buttons-container'>
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
