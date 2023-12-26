import { useState, useContext } from 'react';
import { API_REQUESTS, request } from '../../api/api';
import { setLocalStorageItemsHelper } from '../../helpers/local-storage.helper';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { UserContext } from '../../contexts/user.context';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up-form.styles.scss';

const defaultFormFields = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = ({ setLoaderActive }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password, confirmPassword } = formFields;
  const [authError, setAuthError] = useState('');
  const { setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const { t } = useTranslation();
  const text = t('signUp', { returnObjects: true });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoaderActive(true);

    if (password !== confirmPassword) {
      setAuthError(text.passwordsMismatch);
      setLoaderActive(false);
      return;
    }

    try {
      const data = await request(API_REQUESTS.register, 'POST', {
        body: { name, email, password },
      });

      const { accessToken, refreshToken, user } = data;

      setLocalStorageItemsHelper({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });

      setCurrentUser(user);
      checkSavedConfig();
    } catch (error) {
      setAuthError(text.unexpectedError);
      setLoaderActive(false);
    }
  };

  return (
    <div className='sign-up-container'>
      <h2>{text.header}</h2>
      <h3>{text.subheader}</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormInput
          label={text.name}
          type='text'
          required
          name='name'
          onChange={(e) => handleChange(e)}
        />

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

        <FormInput
          label={text.confirmPassword}
          type='password'
          required
          name='confirmPassword'
          onChange={(e) => handleChange(e)}
        />
        {authError && <div className='error'>{authError}</div>}
        <div className='buttons-container'>
          <Button type='submit' buttonStyle='primary w100'>
            {text.signUp}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
