import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { EmptyTable } from "../EmptyTable";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!table.getRowModel().rows?.length) {
    return (
      <EmptyTable
        icon="archive-x"
        iconSize={44}
        title="Não há dados disponíveis"
      />
    );
  }

  return (
    <div className="rounded-md border px-5 bg-card">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <DropdownMenu key={row.id}>
              <DropdownMenuTrigger asChild>
                <TableRow
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                side="top"
                className="flex flex-col items-start bg-card border py-4 px-8 space-y-2 rounded-lg"
              >
                <DropdownMenuLabel className="text-base font-semibold">
                  Ações
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => alert(``)}
                  className="flex items-center cursor-pointer hover:text-gray-300 transition-colors w-full"
                >
                  <Edit size={19} className="mr-2" />
                  <span className="text-sm font-medium">Editar</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center text-red-600 cursor-pointer hover:text-red-700 transition-colors w-full"
                  onClick={() => {
                    if (window.confirm(`Tem certeza que deseja remover?`)) {
                      console.log("Remover item com ID:");
                    }
                  }}
                >
                  <Trash2 size={19} className="mr-2" />
                  <span className="text-sm font-medium">Remover</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
