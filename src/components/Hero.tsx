import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Transforme Seus
          <span className="text-primary"> Relacionamentos</span>
          <br />
          em Resultados
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          A plataforma CRM mais completa e intuitiva do mercado. Gerencie
          contatos, acompanhe vendas e acelere seu crescimento com nossa API
          poderosa.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="h-11 text-lg py-6 cursor-pointer"
            size="lg"
            onClick={() => navigate("/dashboard")}
          >
            Começar Agora
            <ArrowRight size={24} />
          </Button>

          <Button
            className="h-11 text-lg py-6 cursor-pointer test-primary"
            variant="outline"
            onClick={() => navigate("/customers")}
          >
            Ver Demonstração
          </Button>
        </div>
      </div>
    </section>
  );
}
