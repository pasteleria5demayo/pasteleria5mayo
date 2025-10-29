// src/components/Layout.tsx
import React from "react";
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>
      <Sidebar />
      <main style={{ marginLeft: 70, padding: 20 }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
