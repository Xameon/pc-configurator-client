import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';

const SignUpForm = () => {
  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form>
        <FormInput
          label='Display Name'
          type='text'
          required
          name='displayName'
        />

        <FormInput label='Email' type='email' required name='email' />

        <FormInput label='Password' type='password' required name='password' />

        <FormInput
          label='Confirm Password'
          type='password'
          required
          name='confirmPassword'
        />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
