import { Link } from 'react-router-dom'

export const Login = () => {
  return (
    <>
      <p>Login page</p>
      <button>
        <Link to="/adminpage">Adminpage</Link>
      </button>
    </>
  );
};
