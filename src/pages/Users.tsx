import { useState } from "react";
import UsersDataTable from "@/components/UsersDatatable";
import { useUsers } from "@/hooks/userUsers";
import { PlusIcon, SpinnerIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { FormUsers } from "@/components/FormUsers";

export function Users() {
  const { users, isLoading } = useUsers();
  const [isForm, setIsForm] = useState(false);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-foreground mb-6">Usuários</h1>
        <Button className="cursor-pointer" onClick={() => setIsForm(!isForm)}>
          {!isForm && <PlusIcon />}
          {isForm ? <p>Listar Usuários</p> : <p> Adicionar Usuários</p>}
        </Button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <SpinnerIcon className="text-white animate-spin" size={54} />
        </div>
      ) : (
        <>
          {isForm ? (
            <FormUsers isEditMode={false} />
          ) : (
            <UsersDataTable users={users} />
          )}
        </>
      )}
    </div>
  );
}
