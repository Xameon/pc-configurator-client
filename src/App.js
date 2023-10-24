import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='auth' element={<Authentication />} />
    </Routes>
  );
};

export default App;