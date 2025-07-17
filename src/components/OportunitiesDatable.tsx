import type { Oportunities } from "@/models/Oportunities";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./ui/datatable";

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
      return <div>{row.getValue("descricao")}</div>;
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
