import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  // console.log("DashboardLayout user:", user); // 🚨 Check browser console

  return (
    <div className="flex flex-col h-screen">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex flex-1 overflow-hidden">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="flex-1 overflow-auto mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
