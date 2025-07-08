import { CircleCheckBig } from "lucide-react";

export function ChooseUs() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Por Que Escolher Nossa API CRM?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Mais de 10.000 empresas já confiam em nossa plataforma para
              gerenciar seus relacionamentos e impulsionar suas vendas.
            </p>
            <div className="space-y-4">
              {[
                "Aumente suas vendas em até 40%",
                "Economize 3 horas por dia em tarefas administrativas",
                "Tenha visibilidade completa do seu pipeline",
                "Melhore o relacionamento com seus clientes",
                "Tome decisões baseadas em dados reais",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CircleCheckBig size={24} className="text-green-400" />

                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-lg shadow-sm bg-gradient-top-right p-8 text-white border-0">
              <div className="flex flex-col space-y-1.5 p-6 pb-4">
                <h3 className="font-semibold tracking-tight text-2xl text-white">
                  Dashboard Completo
                </h3>
                <p className="text-sm text-white/80">
                  Visualize todos os seus dados em tempo real
                </p>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span>Total de Contatos</span>
                  <span className="font-bold">2,847</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span>Negócios Ativos</span>
                  <span className="font-bold">156</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Receita Este Mês</span>
                  <span className="font-bold">R$ 87.340</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
