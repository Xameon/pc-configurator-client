import { useState } from 'react';
import { API_REQUESTS, request } from '../../api/api';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up-form.styles.scss';

const defaultFormFields = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Password mistmatch');
      return;
    }

    const data = await request(API_REQUESTS.register, 'POST', {
      body: { name, email, password },
    });

    console.log(data);
  };

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <h3>Sign up with your email and password</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormInput
          label='Name'
          type='text'
          required
          name='name'
          onChange={(e) => handleChange(e)}
        />

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

        <FormInput
          label='Confirm Password'
          type='password'
          required
          name='confirmPassword'
          onChange={(e) => handleChange(e)}
        />
        <div className='buttons-container'>
          <Button buttonStyle={'sign-up'} type='submit'>
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
