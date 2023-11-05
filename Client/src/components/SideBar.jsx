import { NavLink } from "react-router-dom";

import user from "../../public/images/IMG_20230312_134619.jpg";
import "./sidebar.css";

export const SideBar = () => {
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
                    <img src={user} alt="" />
                  </div>
                </span>
                <span className="text">Logout</span>
              </NavLink>
            </li>
            <li>
              <NavLink>
                <span className="icon">
                  <ion-icon name="log-out-outline"></ion-icon>
                </span>
                <span className="text">Logout</span>
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};
