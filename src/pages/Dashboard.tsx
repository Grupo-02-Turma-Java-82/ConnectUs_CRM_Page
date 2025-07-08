import React from "react";

export function Dashboard() {
  return (
    <main className="flex-1 p-6">
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-plus mr-2 h-4 w-4"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            Adição Rápida
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Card: Total de Contatos */}
          <div className="rounded-lg border text-card-foreground shadow-sm bg-card border-border hover:bg-card/80 transition-colors">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-card-foreground">
                Total de Contatos
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-contact h-4 w-4 text-primary"
              >
                <path d="M16 2v2"></path>
                <path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"></path>
                <path d="M8 2v2"></path>
                <circle cx="12" cy="11" r="3"></circle>
                <rect x="3" y="4" width="18" height="18" rx="2"></rect>
              </svg>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-card-foreground">
                1.234
              </div>
              <p className="text-xs text-green-400">
                +12% em relação ao mês passado
              </p>
            </div>
          </div>
          {/* Card: Negócios Ativos */}
          <div className="rounded-lg border text-card-foreground shadow-sm bg-card border-border hover:bg-card/80 transition-colors">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-card-foreground">
                Negócios Ativos
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star h-4 w-4 text-primary"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
              </svg>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-card-foreground">89</div>
              <p className="text-xs text-green-400">
                +8% em relação ao mês passado
              </p>
            </div>
          </div>
          {/* Card: Receita Este Mês */}
          <div className="rounded-lg border text-card-foreground shadow-sm bg-card border-border hover:bg-card/80 transition-colors">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-card-foreground">
                Receita Este Mês
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-activity h-4 w-4 text-primary"
              >
                <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
              </svg>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-card-foreground">
                R$ 145.231
              </div>
              <p className="text-xs text-green-400">
                +23% em relação ao mês passado
              </p>
            </div>
          </div>
          {/* Card: Tarefas Para Hoje */}
          <div className="rounded-lg border text-card-foreground shadow-sm bg-card border-border hover:bg-card/80 transition-colors">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-card-foreground">
                Tarefas Para Hoje
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-calendar h-4 w-4 text-primary"
              >
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-card-foreground">12</div>
              <p className="text-xs text-red-400">
                -2 em relação ao mês passado
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Gráfico: Performance de Vendas */}
          <div className="rounded-lg border text-card-foreground shadow-sm bg-card border-border">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight text-card-foreground">
                Performance de Vendas
              </h3>
            </div>
            <div className="p-6 pt-0">
              <div
                className="recharts-responsive-container"
                style={{ width: "100%", height: "300px" }}
              >
                {/* O componente do gráfico (ex: <BarChart ... />) entraria aqui */}
              </div>
            </div>
          </div>
          {/* Gráfico: Pipeline de Vendas */}
          <div className="rounded-lg border text-card-foreground shadow-sm bg-card border-border">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight text-card-foreground">
                Pipeline de Vendas
              </h3>
            </div>
            <div className="p-6 pt-0">
              <div
                className="recharts-responsive-container"
                style={{ width: "100%", height: "300px" }}
              >
                {/* O componente do gráfico (ex: <PieChart ... />) entraria aqui */}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Card: Atividades Recentes */}
          <div className="rounded-lg border text-card-foreground shadow-sm bg-card border-border">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight text-card-foreground">
                Atividades Recentes
              </h3>
            </div>
            <div className="p-6 pt-0">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-card-foreground">
                      Novo contato adicionado: João Silva
                    </p>
                    <p className="text-xs text-muted-foreground">há 2 horas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-card-foreground">
                      Negócio "ABC Corp" movido para negociação
                    </p>
                    <p className="text-xs text-muted-foreground">há 4 horas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-card-foreground">
                      Ligação de acompanhamento concluída
                    </p>
                    <p className="text-xs text-muted-foreground">há 6 horas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-card-foreground">
                      Reunião agendada com Tech Solutions
                    </p>
                    <p className="text-xs text-muted-foreground">há 1 dia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Card: Tarefas de Hoje */}
          <div className="rounded-lg border text-card-foreground shadow-sm bg-card border-border">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight text-card-foreground">
                Tarefas de Hoje
              </h3>
            </div>
            <div className="p-6 pt-0">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-card-foreground">
                    Ligar para João Silva sobre proposta
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-card-foreground">
                    Enviar e-mail de acompanhamento para ABC Corp
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="rounded"
                    readOnly={true}
                    checked={true}
                  />
                  <span className="text-sm text-muted-foreground line-through">
                    Atualizar informações de contato
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-card-foreground">
                    Preparar relatório trimestral
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
