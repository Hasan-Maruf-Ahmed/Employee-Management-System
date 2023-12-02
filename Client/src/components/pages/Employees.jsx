import Modal from 'react-modal';
import { useState } from 'react';
import { UserTable } from "../UserTable";
import "./employees.css";
import { useSignup } from '../../hooks/useSignup';
import { useAuthContext } from '../../hooks/useAuthContext';
// import { Outlet } from "react-router-dom";


export const Employees = () => {
  const [open, setOpen ] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const { user } = useAuthContext();

  const { signup, signuprole, error, clearError } = useSignup();

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    if(checked){
      setRole('admin');
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    // setOpen(false);
    if(isChecked)
    {
      await signuprole(username, email, password, role);
    }
    else {
      await signup(username, email, password);
    }
    // console.log(error);
    setUsername('');
    setEmail('');
    setPassword('');
    setRole('');
    setIsChecked(false);
    setTimeout(() => {
      clearError();
    },1500);
  }
  Modal.setAppElement('#root');
  return (
    <div className="table-container">
      <UserTable />
      <button className="signUp" disabled={(!user) ? true : false} onClick={() => setOpen(true)}>Add Employee</button>
      <Modal isOpen={open} onRequestClose={() => setOpen(false)} style={{
        content:{
          margin: 'auto',
          height: '450px',
          width: '450px'
        }
      }}>
        {/* <button onClick={() => setOpen(false)}>close</button> */}
        <form className='signupForm' onSubmit={handleSubmit}>
          <label className='signupLabel'>User Name:</label>
          <input className='signupInput'
            type='text'
            placeholder='Enter a user name'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <label className='signupLabel'>Email:</label>
          <input className='signupInput'
            type='email'
            placeholder='Enter a email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label className='signupLabel'>Password:</label>
          <input className='signupInput'
            type='password'
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div><input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
          /><span className='checkboxMsg'>Assign as Admin</span></div>
           <div className={`error ${error ? '' : 'hidden'}`}>{error}</div>
          <button className='sign-submit-btn'>Submit</button>
        </form>        
      </Modal>
    </div>
  );
};
