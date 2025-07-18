import { AppLayout } from "@/components/AppLayout";
import { DashboardLayout } from "@/components/DashboardLayout";
import { NotFound } from "@/components/NotFound";
import { Dashboard } from "@/pages/Dashboard";
import { Customers } from "@/pages/Customers";
import { Home } from "@/pages/Home";
import { Route, Routes } from "react-router";
import { Users } from "@/pages/Users";
import { Oportunities } from "@/pages/Oportunities";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
      </Route>

      <Route path="/customers" element={<DashboardLayout />}>
        <Route index element={<Customers />} />
      </Route>

      <Route path="/users" element={<DashboardLayout />}>
        <Route index element={<Users />} />
      </Route>

      <Route path="/opportunities" element={<DashboardLayout />}>
        <Route index element={<Oportunities />} />
      </Route>

      <Route path="/customers" element={<DashboardLayout />}>
        <Route index element={<Customers />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
