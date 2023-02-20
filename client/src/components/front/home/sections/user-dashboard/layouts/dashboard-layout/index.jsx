import React from "react";
import { Outlet } from "react-router-dom";
import Container from "../../components/container";
import Navbar from "../../components/navbar";
import Topbar from "../../components/topbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen relative">
      <div className="h-14 sticky top-0">
        <Topbar />
      </div>
      <div className="flex">
        <div className="hidden sm:block border-r border-gray-300 drop-shadow-lg sticky top-14 h-[calc(100vh-56px)] overflow-y-auto">
          <Navbar />
        </div>
        <div className="overflow-x-auto flex-1">
          <Container>
            <Outlet />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
