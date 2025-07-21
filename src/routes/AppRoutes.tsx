import { AppLayout } from "@/components/AppLayout";
import { DashboardLayout } from "@/components/DashboardLayout";
import { NotFound } from "@/components/NotFound";
import { Dashboard } from "@/pages/Dashboard";
import { Customers } from "@/pages/Customers";
import { Home } from "@/pages/Home";
import { Route, Routes } from "react-router";
import { Users } from "@/pages/Users";
import { Oportunities } from "@/pages/Oportunities";
import { CustomersProvider } from "@/contexts/CustomersContext";
import { UsersProvider } from "@/contexts/UsersContext";
import { OportunitiesProvider } from "@/contexts/OportinitiesContext";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route
          index
          element={
            <OportunitiesProvider>
              <UsersProvider>
                <CustomersProvider>
                  <Dashboard />
                </CustomersProvider>
              </UsersProvider>
            </OportunitiesProvider>
          }
        />
      </Route>

      <Route path="/customers" element={<DashboardLayout />}>
        <Route
          index
          element={
            <CustomersProvider>
              <Customers />
            </CustomersProvider>
          }
        />
      </Route>

      <Route path="/users" element={<DashboardLayout />}>
        <Route
          index
          element={
            <UsersProvider>
              <Users />
            </UsersProvider>
          }
        />
      </Route>

      <Route path="/opportunities" element={<DashboardLayout />}>
        <Route
          index
          element={
            <OportunitiesProvider>
              <UsersProvider>
                <CustomersProvider>
                  <Oportunities />
                </CustomersProvider>
              </UsersProvider>
            </OportunitiesProvider>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
