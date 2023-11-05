import { Outlet } from "react-router-dom";
import { SideBar } from "../SideBar";

import "./adminpage.css"

export const AdminPage = () => {
  return (
    <div className="adminLayout">
      <div className="left">
      <SideBar />
      </div>
      <div className="right">
      <Outlet/>
      </div>
    </div>
  );
};
