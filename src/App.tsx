import { CustomersProvider } from "./contexts/CustomersContext";
import { Routes } from "./routes";
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <CustomersProvider>
      <Routes />
      <ToastContainer />
    </CustomersProvider>
  );
}
