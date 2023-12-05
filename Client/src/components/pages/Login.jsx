import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import './login.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading, clearError} = useLogin();

  const handleSubmit = async(e) => {
    e.preventDefault();
    await login(email, password);
    // console.log( email, password);
    setTimeout(() => {
      clearError();
    }, 1500);
    setEmail('');
    setPassword('');
  }
  return (
    <div className='login-container'>
      <div className="loginbox">
      <form className='loginForm' onSubmit={handleSubmit}>
          <label className='loginLabel'>Email:</label>
          <input className='loginInput'
            type='email'
            placeholder='Enter a email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label className='loginLabel'>Password:</label>
          <input className='loginInput'
            type='password'
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className={`error ${error ? '' : 'hidden'}`}>{error}</div>
          <button className='log-submit-btn' disabled={isLoading}>Submit</button>
        </form> 
      </div>
    </div>
  );
};
