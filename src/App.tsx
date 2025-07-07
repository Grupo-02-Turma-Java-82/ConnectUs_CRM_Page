import { CustomersProvider } from "./contexts/CustomersContext";
import { UsersProvider } from "./contexts/UsersContext";
import { Routes } from "./routes";
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <CustomersProvider>
    <UsersProvider>
      <Routes />
      <ToastContainer />
    </UsersProvider>
    </CustomersProvider>
  );
}
