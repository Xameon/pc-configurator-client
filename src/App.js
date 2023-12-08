import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import CreatePc from './routes/create-pc/create-pc.component';
import NewPc from './routes/new-pc/new-pc.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='create' element={<CreatePc />} />
        <Route path='new' element={<NewPc />} />
      </Route>
    </Routes>
  );
};

export default App;
