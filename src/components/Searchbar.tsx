import { BellIcon, UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

import { ControlledInput } from "./ControlledInput";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

const searchSchema = z.object({
  search: z.string().min(1, "Parâmetro de pesquisa é obrigatório"),
});

export default function Searchbar() {
  const searchForm = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  function onSubmit(data: z.infer<typeof searchSchema>) {
    console.log("Busca realizada: ", data.search);
  }

  return (
    <div className="h-16 w-full border-b border-border bg-card px-3 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-foreground cursor-pointer" />
        <Form {...searchForm}>
          <form onSubmit={searchForm.handleSubmit(onSubmit)}>
            <ControlledInput
              control={searchForm.control}
              name="search"
              placeholder="Buscar clientes, oportunidades..."
              icon="search"
            />
          </form>
        </Form>
      </div>
      <div className="relative"></div>

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
