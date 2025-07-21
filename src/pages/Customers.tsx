import { useState } from "react";
import CustomersDataTable from "@/components/CustomersDatatable";
import { Button } from "@/components/ui/button";
import { useCustomers } from "@/hooks/useCustomers";
import { SpinnerIcon } from "@phosphor-icons/react";
import { PlusIcon } from "lucide-react";
import { FormCustomers } from "@/components/FormCustomers";

export function Customers() {
  const { customers, isLoading, deleteCustomer } = useCustomers();
  const [isForm, setIsForm] = useState(false);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-foreground mb-6">Clientes</h1>
        <Button className="cursor-pointer" onClick={() => setIsForm(!isForm)}>
          {!isForm && <PlusIcon />}
          {isForm ? <p>Listar Clientes</p> : <p> Adicionar Cliente</p>}
        </Button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <SpinnerIcon className="text-white animate-spin" size={54} />
        </div>
      ) : (
        <>
          {isForm ? (
            <FormCustomers isEditMode={false} />
          ) : (
            <CustomersDataTable
              customers={customers}
              deleteCustomer={deleteCustomer}
            />
          )}
        </>
      )}
    </div>
  );
}
