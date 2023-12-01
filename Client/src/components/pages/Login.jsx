import { Link } from 'react-router-dom'
import { useState } from 'react';
import './login.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log( email, password);
  }
  return (
    <div className='login-container'>
      <p>Login page</p>
      <button>
        <Link to="/adminpage">Adminpage</Link>
      </button>
      <button>
        <Link to="/adminpage/dashboard">Dashboard</Link>
      </button>
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
          <button className='log-submit-btn'>Submit</button>
        </form> 
      </div>
    </div>
  );
};
