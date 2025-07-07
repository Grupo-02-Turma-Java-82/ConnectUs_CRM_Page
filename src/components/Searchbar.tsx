import { BellIcon, SearchIcon, UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

import { Input } from "./ui/input";

export default function Searchbar() {
  return (
    <div className="h-16 w-full border-b border-border bg-card px-3 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger className="text-foreground cursor-pointer" />
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar clientes, oportunidades, funcionarios..."
            className="pl-10 bg-background border-border"
          />
        </div>
      </div>

      <div className="flex items-center md:gap-3">
        <Button variant="ghost" size="icon" className="text-foreground">
          <BellIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hidden md:inline-flex"
        >
          <UserIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
