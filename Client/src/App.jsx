import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { AdminPage } from "./components/pages/AdminPage";
import { DashBoard } from "./components/pages/DashBoard";
import { Login } from "./components/pages/Login";
import { PageNotFound } from "./components/pages/PageNotFound";
import { Employees } from "./components/pages/Employees";
import { useAuthContext } from "./hooks/useAuthContext";
import { UserDetails } from "./components/pages/UserDetails";
import { UpdatePage } from "./components/pages/UpdatePage";
import { UserPage } from "./components/pages/UserPage";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Navigate to="/adminpage/dashboard"/>} />
        <Route path="userpage" element={<UserPage/>} />
        <Route path="adminpage" element={user ? <AdminPage /> : <Navigate to="/"/>}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="employees/users/:id" element={<UserDetails />} />
          <Route path="employees/update/:id" element={<UpdatePage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
