import { use } from "react";
import { UsersContext } from "@/contexts/UsersContext";

export function useUsers() {
  const context = use(UsersContext);

  return context;
}
