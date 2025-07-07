import CustomersDataTable from "@/components/CustomersDatatable";
import { useCustomers } from "@/hooks/useCustomers";
import { SpinnerIcon } from "@phosphor-icons/react";

export function Customers() {
  const { customers, isLoading } = useCustomers();

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-foreground mb-6">Clientes</h1>
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <SpinnerIcon className="text-white animate-spin" size={54} />
        </div>
      ) : (
        <CustomersDataTable customers={customers} />
      )}
    </div>
  );
}
