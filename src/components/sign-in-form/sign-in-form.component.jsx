import { useGoogleLogin } from '@react-oauth/google';
import { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { UserContext } from '../../contexts/user.context';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { API_REQUESTS, request } from '../../api/api';

import { setLocalStorageItemsHelper } from '../../helpers/local-storage.helper';

import './sign-in-form.styles.scss';

const defaultFormFields = { email: '', password: '' };

const SignInForm = ({ setLoaderActive }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { setCurrentUser } = useContext(UserContext);

  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const { t } = useTranslation();
  const text = t('signIn', { returnObjects: true });

  const checkSavedConfig = async () => {
    if (localStorage.getItem('createdConfig')) {
      await request(API_REQUESTS.userConfigs, 'POST', {
        header: {},
        body: JSON.parse(localStorage.getItem('createdConfig')),
      });

      localStorage.removeItem('createdConfig');

      setLoaderActive(false);
      navigate('/user-configs');
    } else {
      setLoaderActive(false);
      navigate('/');
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setLoaderActive(true);
      if (codeResponse) {
        const { access_token } = codeResponse;
        try {
          const data = await request(API_REQUESTS.googleAuth, 'GET', {
            headers: {
              authorization: access_token,
            },
          });

          const { accessToken, refreshToken, user } = data;

          setLocalStorageItemsHelper({ accessToken, refreshToken });
          setCurrentUser(user);

          checkSavedConfig();
        } catch (error) {
          console.log(error);
        }
      }
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoaderActive(true);

    try {
      const data = await request(API_REQUESTS.login, 'POST', {
        body: { email, password },
      });

      const { accessToken, refreshToken, user } = data;

      setLocalStorageItemsHelper({ accessToken, refreshToken });
      setCurrentUser(user);

      checkSavedConfig();
    } catch (error) {
      setLoaderActive(false);
      setLoginError(true);
    }
  };

  return (
    <div className='sign-in-container'>
      <h2>{text.header}</h2>
      <h3>{text.subheader}</h3>
      <form onSubmit={(event) => handleSubmit(event)}>
        <FormInput
          label={text.email}
          type='email'
          required
          name='email'
          onChange={(e) => handleChange(e)}
        />
        <FormInput
          label={text.password}
          type='password'
          required
          name='password'
          onChange={(e) => handleChange(e)}
        />
        {loginError && (
          <div className='error-container'>{text.wrongCredentials}</div>
        )}
        <div className='buttons-container'>
          <Button type='submit' buttonStyle='primary w50'>
            {text.signIn}
          </Button>
          <Button
            buttonStyle={'google-sign-in w50'}
            type='button'
            onClick={() => loginWithGoogle()}
          >
            {text.signInGoogle}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
