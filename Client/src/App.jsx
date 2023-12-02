import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { AdminPage } from "./components/pages/AdminPage";
import { DashBoard } from "./components/pages/DashBoard";
import { Login } from "./components/pages/Login";
import { PageNotFound } from "./components/pages/PageNotFound";
import { Employees } from "./components/pages/Employees";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/adminpage/dashboard"/>} />
        <Route path="adminpage" element={user ? <AdminPage /> : <Navigate to="/login"/>}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="employees" element={<Employees />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
