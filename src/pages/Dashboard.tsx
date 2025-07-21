import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCustomers } from "@/hooks/useCustomers";
import { useOportunities } from "@/hooks/useOportunities";
import { useUsers } from "@/hooks/userUsers";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import type { Oportunities } from "@/models/Oportunities";
import { UsersIcon, ChartNoAxesCombined } from "lucide-react";
import { SpinnerIcon } from "@phosphor-icons/react";

export function Dashboard() {
  const { customers, isLoading } = useCustomers();
  const { Oportunities } = useOportunities();
  const { users } = useUsers();

  const monthlyNewCustomers = useMemo(() => {
    const monthNames = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    const data = Array.from({ length: 6 })
      .map((_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        return {
          name: `${monthNames[d.getMonth()]}/${String(d.getFullYear()).slice(
            2
          )}`,
          total: 0,
        };
      })
      .reverse();

    customers.forEach((customer) => {
      const regDate = new Date(customer.createdAt);
      const monthKey = `${monthNames[regDate.getMonth()]}/${String(
        regDate.getFullYear()
      ).slice(2)}`;
      const monthData = data.find((d) => d.name === monthKey);
      if (monthData) {
        monthData.total += 1;
      }
    });

    return data;
  }, [customers]);

  const opportunitiesByStatus = useMemo(() => {
    const statusCount = Oportunities.reduce((acc, op: Oportunities) => {
      acc[op.status] = (acc[op.status] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const COLORS = {
      GANHA: "#4ade80",
      PERDIDA: "#f87171",
      EM_NEGOCIACAO: "#facc15",
      ARQUIVADA: "#60a5fa",
    };

    return Object.keys(statusCount).map((status) => {
      const colorKey = status as keyof typeof COLORS;
      return {
        name: status,
        value: statusCount[status as string],
        fill:
          COLORS[colorKey as keyof typeof COLORS] || "oklch(var(--chart-5))",
      };
    });
  }, [Oportunities]);

  const opportunitiesByUser = useMemo(() => {
    const userOppCount = Oportunities.reduce((acc, op) => {
      acc[op.usuario?.id] = (acc[op.usuario?.id] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return users
      .map((user) => ({
        name: user.nome.split(" ")[0],
        total: userOppCount[user.id] || 0,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [Oportunities, users]);

  const monthlyRevenue = useMemo(() => {
    const monthNames = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    const data = Array.from({ length: 6 })
      .map((_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        return {
          name: `${monthNames[d.getMonth()]}/${String(d.getFullYear()).slice(
            2
          )}`,
          total: 0,
        };
      })
      .reverse();

    Oportunities.forEach((op: Oportunities) => {
      if (op.status === "GANHA") {
        const regDate = new Date(op.dataCriacao);
        const monthKey = `${monthNames[regDate.getMonth()]}/${String(
          regDate.getFullYear()
        ).slice(2)}`;
        const monthData = data.find((d) => d.name === monthKey);
        if (monthData) {
          monthData.total += op.valorEstimado;
        }
      }
    });

    return data;
  }, [Oportunities]);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <SpinnerIcon className="text-white animate-spin" size={54} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="rounded-sm p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium">Total de Clientes</h2>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold">{customers.length}</p>
              </div>
            </Card>

            <Card className="rounded-sm p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium">Total de Oportunidades</h2>
                <ChartNoAxesCombined className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold">{Oportunities.length}</p>
              </div>
            </Card>

            <Card className="rounded-sm p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium">Total de Usuários</h2>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Novos Clientes (Últimos 6 Meses)</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-64 w-full">
                  <ResponsiveContainer>
                    <BarChart data={monthlyNewCustomers}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="name"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="total"
                        fill="oklch(var(--chart-1))"
                        radius={4}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pipeline de Oportunidades</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-64 w-full">
                  <ResponsiveContainer>
                    <PieChart>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Pie
                        data={opportunitiesByStatus}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={50}
                      >
                        {opportunitiesByStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartLegend
                        content={<ChartLegendContent payload={undefined} />}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Receita Mensal (Oportunidades Ganhas)</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-64 w-full">
                  <ResponsiveContainer>
                    <AreaChart data={monthlyRevenue}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="name"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <YAxis tickFormatter={(value) => `R$${value / 1000}k`} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="total"
                        fill="oklch(var(--chart-2))"
                        fillOpacity={0.4}
                        stroke="oklch(var(--chart-2))"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top 5 Usuários por Oportunidades Criadas</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-64 w-full">
                  <ResponsiveContainer>
                    <BarChart data={opportunitiesByUser} layout="vertical">
                      <CartesianGrid horizontal={false} />
                      <YAxis
                        dataKey="name"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <XAxis type="number" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="total"
                        fill="oklch(var(--chart-4))"
                        radius={4}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
