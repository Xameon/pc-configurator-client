import { useGoogleLogin } from '@react-oauth/google';
import { useState, useContext } from 'react';

import { useTranslation } from 'react-i18next';

import { UserContext } from '../../contexts/user.context';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { API_REQUESTS, request } from '../../api/api';

import { setLocalStorageItemsHelper } from '../../helpers/local-storage.helper';

import './sign-in-form.styles.scss';

const defaultFormFields = { email: '', password: '' };

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { setCurrentUser } = useContext(UserContext);

  const { t } = useTranslation();
  const text = t('signIn', { returnObjects: true });

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
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

    try {
      const data = await request(API_REQUESTS.login, 'POST', {
        body: { email, password },
      });

      const { accessToken, refreshToken, user } = data;

      setLocalStorageItemsHelper({ accessToken, refreshToken });
      setCurrentUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='sign-in-container'>
      <h2>{text.header}</h2>
      <h3>{text.subheader}</h3>
      <form onSubmit={(event) => handleSubmit(event)}>
        <FormInput
          label='Email'
          type='email'
          required
          name='email'
          onChange={(e) => handleChange(e)}
        />
        <FormInput
          label='Password'
          type='password'
          required
          name='password'
          onChange={(e) => handleChange(e)}
        />
        <div className='buttons-container'>
          <Button type='submit'>{text.signIn}</Button>
          <Button
            buttonStyle={'google-sign-in'}
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
