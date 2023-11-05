import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AdminPage } from "./components/pages/AdminPage";
import { DashBoard } from "./components/pages/DashBoard";
import { Login } from "./components/pages/Login";
import { PageNotFound } from "./components/pages/PageNotFound";
import { Employees } from "./components/Employees";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="adminpage" element={<AdminPage />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="employees" element={<Employees />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
