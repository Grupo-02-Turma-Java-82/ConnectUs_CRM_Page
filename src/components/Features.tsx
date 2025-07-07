import { UsersIcon, TrendUpIcon, ChartBarIcon, ShieldIcon, LightningIcon } from "@phosphor-icons/react";
import { Feature } from "./Feature";

export function Features() {
  return (
    <section className="py-20 px-6 bg-card/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Tudo que Você Precisa em Uma Plataforma
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nossa API oferece todas as ferramentas necessárias para gerenciar seu relacionamento com clientes de forma eficiente.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          <Feature             
            icon={<UsersIcon color="#1fa2bd" className="h-8 w-8 text-bittersweet" />}
            title="Gestão de Contatos"
            description="Centralize todos os seus contatos e clientes em um só lugar com informações detalhadas e histórico completo."/>

          <Feature             
            icon={<TrendUpIcon color="#1fa2bd" className="h-8 w-8 text-bittersweet" />}
            title="Pipeline de Vendas"
            description="Visualize e gerencie seu funil de vendas com facilidade, acompanhando cada negócio em tempo real."/>

          <Feature
            icon={<ChartBarIcon color="#1fa2bd" className="h-8 w-8 text-bittersweet" />}
            title="Relatórios Avançados"
            description="Obtenha insights valiosos com relatórios detalhados e análises de performance de vendas."/>

          <Feature
            icon={<ShieldIcon color="#1fa2bd" className="h-8 w-8 text-bittersweet" />}
            title="Seguro e Confiável"
            description="Seus dados estão protegidos com as melhores práticas de segurança e backup automático."/>

          <Feature
            icon={<LightningIcon color="#1fa2bd" className="h-8 w-8 text-bittersweet" />}
            title="Automação Inteligente"
            description="Automatize tarefas repetitivas e foque no que realmente importa: vender mais."/>
        </div>
      </div>
    </section>
  );
}
