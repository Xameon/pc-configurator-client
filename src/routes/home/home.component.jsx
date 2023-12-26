import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from '../../components/button/button.component';
import Card from '../../components/card/card.component';

import { ReactComponent as RocketIcon } from '../../assets/icons/rocket.svg';

import './home.styles.scss';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const headerText = t('homeHeader');
  const createConfigText = t('homeCreateConfig');
  const cards = t('homeCards', { returnObjects: true });

  return (
    <div className='home-page-container'>
      <h1>{headerText}</h1>
      <div className='buttons-container'>
        <Button buttonStyle='go' onClick={() => navigate('/create')}>
          <p>{createConfigText}</p>
          <RocketIcon className='icon' />
        </Button>
      </div>
      <div className='cards-container'>
        {cards.map(({ header, body }, index) => (
          <Card key={index} header={header} body={body} />
        ))}
      </div>
    </div>
  );
};

export default Home;
