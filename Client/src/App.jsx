import { Routes, Route } from 'react-router-dom'
import "./App.css";
import { Login } from "./components/pages/Login";
import { DashBoard } from './components/pages/DashBoard';
import { PageNotFound } from './components/pages/PageNotFound';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={ <Login />} />
        <Route path='/DashBoard' element={ <DashBoard /> } />
        <Route path='*' element={ <PageNotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
