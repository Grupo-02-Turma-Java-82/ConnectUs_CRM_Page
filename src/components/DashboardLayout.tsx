import React from "react";
import { NavbarDashboard } from "./NavbarDashboard";
import { Outlet } from "react-router";

export function DashboardLayout() {
  return (
    <main className="w-full md:w-auto">
      <NavbarDashboard />
      <Outlet />
    </main>
  );
}
