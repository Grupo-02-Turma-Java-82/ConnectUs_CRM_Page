import { CustomersProvider } from "./contexts/CustomersContext";
import { OportunitiesProvider } from "./contexts/OportinitiesContext";
import { UsersProvider } from "./contexts/UsersContext";
import { Routes } from "./routes";
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <CustomersProvider>
      <UsersProvider>
        <OportunitiesProvider>
          <Routes />
          <ToastContainer />
        </OportunitiesProvider>
      </UsersProvider>
    </CustomersProvider>
  );
}
