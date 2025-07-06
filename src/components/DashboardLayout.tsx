import { AppSidebar } from "./App-Sidebar";
import { Outlet } from "react-router";
import { SidebarProvider } from "./ui/sidebar";
import Searchbar from "./Searchbar";

export function DashboardLayout() {
  return (
    <main className="w-full md:w-auto">
      <SidebarProvider>
        <AppSidebar />
        <Searchbar />
        <Outlet />
      </SidebarProvider>
    </main>
  );
}
