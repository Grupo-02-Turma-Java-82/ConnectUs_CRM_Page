import type { Oportunities } from "@/models/Oportunities";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./ui/datatable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import type { Customer } from "@/models/Customers";

const PLACEHOLDER_IMG =
  "https://ik.imagekit.io/brunogodoy/placeholder.jpg?updatedAt=1751288384316";

export const columns: ColumnDef<Oportunities>[] = [
  {
    accessorKey: "titulo",
    header: "Título",
    cell: ({ row }) => {
      return <div>{row.getValue("titulo")}</div>;
    },
  },
  {
    accessorKey: "descricao",
    header: "Descrição",
    cell: ({ row }) => {
      const descricao = row.getValue("descricao") as string;

      if (!descricao) {
        return <div className="text-slate-500">-</div>;
      }

      return (
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="truncate max-w-80 cursor-default">
                {descricao}
              </div>
            </TooltipTrigger>
            <TooltipContent
              sideOffset={5}
              className="max-w-sm bg-background border text-primary-foreground data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
            >
              <p className="whitespace-pre-wrap p-2">{descricao}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
    cell: ({ row }) => {
      const customer = row.getValue("cliente") as Customer;

      if (!customer) return null;

      return (
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger>
              <Avatar>
                <AvatarImage
                  src={customer.foto ?? PLACEHOLDER_IMG}
                  alt={`Imagem do cliente ${customer.nome}`}
                  className="h-8 w-8 rounded-full"
                />
                <AvatarFallback>
                  <p className="truncate max-w-18 cursor-default">
                    {customer.nome}
                  </p>
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm bg-background border text-primary-foreground data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
              <p className="whitespace-pre-wrap p-2">{customer.nome}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "usuario",
    header: "Usuario",
    cell: ({ row }) => {
      const user = row.getValue("usuario") as Customer;

      if (!user) return null;

      return (
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger>
              <Avatar>
                <AvatarImage
                  src={user.foto ?? PLACEHOLDER_IMG}
                  alt={`Imagem do cliente ${user.nome}`}
                  className="h-8 w-8 rounded-full"
                />
                <AvatarFallback>
                  <p className="truncate max-w-18 cursor-default">
                    {user.nome}
                  </p>
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm bg-background border text-primary-foreground data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
              <p className="whitespace-pre-wrap p-2">{user.nome}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "valorEstimado",
    header: "Valor Estimado",
    cell: ({ row }) => {
      return <div>{row.getValue("valorEstimado")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <div>{row.getValue("status")}</div>;
    },
  },
  {
    accessorKey: "dataCriacao",
    header: "Data Criação",
    cell: ({ row }) => {
      return <div>{row.getValue("dataCriacao")}</div>;
    },
  },
];

interface Props {
  oportunities: Oportunities[];
  deleteOportunities?: (id: number) => void;
}

export function OportunitiesDataTable({
  oportunities,
  deleteOportunities,
}: Props) {
  return (
    <DataTable<Oportunities, unknown>
      columns={columns}
      data={oportunities}
      handleDelete={deleteOportunities}
      tableFor="Oportunidades"
    />
  );
}
