import { use } from "react";
import { NotificationsContext } from "@/contexts/NotificationsContext";

export function useNotifications() {
  const context = use(NotificationsContext);

  return context;
}
