import {
  BellIcon,
  BellOff,
  Check,
  SearchIcon,
  Trash,
  UserIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Card } from "./ui/card";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationItem } from "./NotificationItem";

export default function Searchbar() {
  const { notifications, markAllAsRead, deleteAll } = useNotifications();
  const notificationCount = notifications.length;

  return (
    <div className="flex h-16 w-full items-center justify-between border-b border-border bg-card px-3 md:px-6">
      <div className="flex flex-1 items-center gap-4">
        <SidebarTrigger className="cursor-pointer text-foreground" />
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar clientes, oportunidades, funcionarios..."
            className="border-border bg-background pl-10"
          />
        </div>
      </div>

      <div className="flex items-center md:gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-foreground"
            >
              <BellIcon className="h-5 w-5" />

              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {notificationCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-80 sm:w-120" align="end">
            {notifications.length == 0 ? (
              <div className="flex flex-col justify-center items-center gap-4 text-gray-300 py-4">
                <BellOff />
                <p>Não há notificações</p>
              </div>
            ) : (
              <>
                <Card className="p-0 max-h-90  overflow-y-auto gap-0">
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                </Card>

                <div className="flex flex-col justify-center items-center mt-4 gap-4">
                  <Button
                    size="lg"
                    className="flex justify-center items-center gap-2 font-bold"
                    onClick={() => markAllAsRead()}
                  >
                    <Check size={22} />
                    <p className="text-md ">Marcar todas como lido</p>
                  </Button>

                  <Button
                    size="lg"
                    className="flex justify-center items-center gap-2 font-bold"
                    onClick={() => deleteAll()}
                  >
                    <Trash size={22} />
                    <p className="text-md">Deletar todas as notificações</p>
                  </Button>
                </div>
              </>
            )}
          </PopoverContent>
        </Popover>

        <Button
          variant="ghost"
          size="icon"
          className="hidden text-foreground md:inline-flex"
        >
          <UserIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
