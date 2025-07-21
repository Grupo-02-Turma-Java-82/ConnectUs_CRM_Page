import { ToastContainer } from "react-toastify";
import { Routes } from "./routes";
import { NotificationsProvider } from "./contexts/NotificationsContext";

export function App() {
  return (
    <>
      <NotificationsProvider>
        <Routes />
      </NotificationsProvider>
      <ToastContainer theme="dark" />
    </>
  );
}
