import { AppSidebar } from "./App-Sidebar";
import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";

export function DashboardLayout() {
  return (
    <main className="flex w-full md:w-auto">
      <SidebarProvider>
        <SidebarTrigger />
        <AppSidebar />
        <Outlet />
      </SidebarProvider>
    </main>
  );
}
