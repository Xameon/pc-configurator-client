import { useNavigate } from 'react-router-dom';

import Button from '../../components/button/button.component';

import './home.styles.scss';
// import { useEffect, useState } from 'react';
// import { request } from '../../api/api';

const Home = () => {
  const navigate = useNavigate();
  // const [userAuth, isUserAuth] = useState(false);

  // useEffect(() => {
  //   // request('http://pc-api-env.eba-ff8mdmg7.us-east-1.elasticbeanstalk.com/api/auth/', 'GET')
  // }, []);

  const goToAccountHandler = () => {
    navigate('/auth');
  };

  const goToCreatePcHandler = () => {
    navigate('/create');
  };

  return (
    <div className='home-page-container'>
      <h1>Your computer configurator</h1>
      <div className='buttons-container'>
        <Button buttonStyle='home-page' onClick={() => goToAccountHandler()}>
          Account
        </Button>
        <Button buttonStyle='home-page' onClick={() => goToCreatePcHandler()}>
          Create PC
        </Button>
      </div>
    </div>
  );
};

export default Home;
