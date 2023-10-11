import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className='home-page-container'>
      <h1>Welcome to 'PC Configurator'</h1>
      <Link to='/auth'>Authentication</Link>
    </div>
  );
};

export default Home;
