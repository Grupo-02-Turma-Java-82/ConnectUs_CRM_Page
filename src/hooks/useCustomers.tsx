import { use } from "react";
import { CustomersContext } from "@/contexts/CustomersContext";

export function useCustomers() {
  const context = use(CustomersContext);

  return context;
}
