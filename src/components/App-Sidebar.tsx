import { ChartNoAxesCombined } from "lucide-react";

import {
  PulseIcon,
  UsersIcon,
  UsersFourIcon,
  GearIcon,
} from "@phosphor-icons/react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: PulseIcon,
  },
  {
    title: "Clientes",
    url: "customers",
    icon: UsersIcon,
  },
  {
    title: "Oportunidades",
    url: "/opportunities",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Funcionarios",
    url: "/employees",
    icon: UsersFourIcon,
  },
  {
    title: "Configurações",
    url: "/config",
    icon: GearIcon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-background">
      <SidebarHeader>
        <div className="py-4 px-2">
          <h1 className="text-xl font-bold text-primary">ConnectUS</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive ? "bg-accent" : "hover:bg-accent/50"
                      }
                    >
                      <item.icon />
                      <span className="text-sm">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
