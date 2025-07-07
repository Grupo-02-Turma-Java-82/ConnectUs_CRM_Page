import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <main className="w-full md:w-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
