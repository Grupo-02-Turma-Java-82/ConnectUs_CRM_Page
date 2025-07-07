import { CustomersProvider } from "./contexts/CustomersContext";
import { Routes } from "./routes";

export function App() {
  return (
    <CustomersProvider>
      <Routes />
    </CustomersProvider>
  );
}
