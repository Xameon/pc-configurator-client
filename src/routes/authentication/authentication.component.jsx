import { useState } from 'react';

import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import Loader from '../../components/loader/loader.component';

import './authentication.component.styles.scss';

const Authentication = () => {
  const [loaderActive, setLoaderActive] = useState(false);

  return (
    <div className='authentication-container'>
      <Loader active={loaderActive} message='Please wait...' />
      <SignInForm setLoaderActive={setLoaderActive} />
      <SignUpForm setLoaderActive={setLoaderActive} />
    </div>
  );
};

export default Authentication;
