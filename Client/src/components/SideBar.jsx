import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import userdp from "../assets/IMG_20230312_134619.jpg";
import "./sidebar.css";

export const SideBar = () => {
  const { logout } = useLogout();
  const { user }= useAuthContext();
  const handleClick = () => {
    logout();
  }
  return (
    <>
      <nav className="sideBar">
        <ul>
          <div className="adminlogo">
            <li className="logo">
              <span className="icon">
                <ion-icon name="person"></ion-icon>
              </span>
              <span className="text">Admin</span>
            </li>
          </div>
          <div className="links">
            <li>
              <NavLink to="/adminpage/dashboard">
                <span className="icon">
                  <ion-icon name="home-outline"></ion-icon>
                </span>
                <span className="text">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/adminpage/employees">
                <span className="icon">
                  <ion-icon name="people-outline"></ion-icon>
                </span>
                <span className="text">Employees</span>
              </NavLink>
            </li>
            <li>
              <NavLink>
                <span className="icon">
                  <ion-icon name="bar-chart-outline"></ion-icon>
                </span>
                <span className="text">Analytics</span>
              </NavLink>
            </li>
            <li>
              <NavLink>
                <span className="icon">
                  <ion-icon name="settings-outline"></ion-icon>
                </span>
                <span className="text">Settings</span>
              </NavLink>
            </li>
          </div>
          <div className="bottom">
            <li>
              <NavLink>
                <span className="icon">
                  <div className="imgBx">
                    <img src={userdp} alt="" />
                  </div>
                </span>
                {user && (<span className="text">{user.username}</span>)}
              </NavLink>
            </li>
            <li>
              <NavLink>
                <button className="logout-btn" onClick={handleClick}>
                  <span className="icon">
                    <ion-icon name="log-out-outline"></ion-icon>
                  </span>
                  <span className="text">Logout</span>
                </button>
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};
