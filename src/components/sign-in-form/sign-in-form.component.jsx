import './sign-in-form.styles.scss';
import FormInput from '../form-input/form-input.component';

const SignInForm = () => {
  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form>
        <FormInput
          label='Display Name'
          type='text'
          required
          name='displayName'
        />
        <FormInput label='Email' type='email' required name='email' />
        <FormInput label='Password' type='password' required name='password' />
        <div className='buttons-container'>
          <button type='submit'>Sign In</button>
          <button type='button'>Sign In with Google</button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
