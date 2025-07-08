import UsersDataTable from "@/components/UsersDatatable";
import { useUsers } from "@/hooks/userUsers";
import { SpinnerIcon } from "@phosphor-icons/react";

export function Users() {
  const { users, isLoading } = useUsers();

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-foreground mb-6">Usuários</h1>
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <SpinnerIcon className="text-white animate-spin" size={54} />
        </div>
      ) : (
        <UsersDataTable users={users} />
      )}
    </div>
  );
}
