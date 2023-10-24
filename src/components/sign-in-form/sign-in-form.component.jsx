import { useGoogleLogin } from '@react-oauth/google';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import { useState, useEffect } from 'react';

const defaultFormFields = { email: '', password: '' };

const SignInForm = () => {
  const [googleUser, setGoogleUser] = useState(null);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  useEffect(() => {
    if (googleUser) {
      const { access_token } = googleUser;
      const passAccessToken = async () => {
        const response = await fetch(
          'http://pc-api-env.eba-ff8mdmg7.us-east-1.elasticbeanstalk.com/api/auth/google',
          {
            headers: {
              authorization: access_token,
            },
          }
        );
        const { accessToken, refreshToken } = await response.json();
      };

      passAccessToken();
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

    try {
      const response = await fetch(
        'http://pc-api-env.eba-ff8mdmg7.us-east-1.elasticbeanstalk.com/api/auth/login',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch {}
  };

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
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
          <button type='submit'>Sign In</button>
          <button type='button' onClick={() => loginWithGoogle()}>
            Sign In With Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
