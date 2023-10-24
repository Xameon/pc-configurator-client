import { useGoogleLogin } from '@react-oauth/google';
import { useState, useEffect } from 'react';

import { API_REQUESTS, request } from '../../api/api';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';

const defaultFormFields = { email: '', password: '' };

const SignInForm = () => {
  const [googleUser, setGoogleUser] = useState(null);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  useEffect(() => {
    if (googleUser) {
      const { access_token } = googleUser;

      const passGoogleUser = async () => {
        const data = await request(API_REQUESTS.googleAuth, 'GET', {
          headers: {
            authorization: access_token,
          },
        });
        console.log(data);
      };

      passGoogleUser();
    }
  }, [googleUser]);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setGoogleUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await request(API_REQUESTS.login, 'POST', {
      body: { email, password },
    });

    console.log(data);
  };

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <h3>Sign in with your email and password</h3>
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
          <Button buttonStyle={'sign-in'} type='submit'>
            Sign In
          </Button>
          <Button
            buttonStyle={'google-sign-in'}
            type='button'
            onClick={() => loginWithGoogle()}
          >
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
