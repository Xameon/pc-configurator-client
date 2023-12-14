import { useNavigate } from 'react-router-dom';

import Button from '../../components/button/button.component';
import Card from '../../components/card/card.component';

import { ReactComponent as RocketIcon } from '../../assets/icons/rocket.svg';

import './home.styles.scss';

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    {
      header: 'Step 1',
      body: 'Indicate for what purposes you need a computer.',
    },
    {
      header: 'Step 2',
      body: 'Indicate the amount of money you are willing to pay for your computer.',
    },
    {
      header: 'Step 3',
      body: 'Indicate how much memory you need',
    },
    {
      header: 'Step 4',
      body: 'Get the configuration of the computer you were looking for!',
    },
  ];

  return (
    <div>
      <div className='home-page-container'>
        <h1>Heap Configurator PC</h1>
        <div className='buttons-container'>
          <Button buttonStyle='go' onClick={() => navigate('/create')}>
            <p>Create Config</p>
            <RocketIcon className='icon' />
          </Button>
        </div>
        <div className='cards-container'>
          {cards.map(({ header, body }, index) => (
            <Card key={index} header={header} body={body} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
