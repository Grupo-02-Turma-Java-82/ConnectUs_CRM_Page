import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function GoDashboard() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 bg-primary/5">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-foreground mb-6">
          Pronto para Revolucionar Suas Vendas?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Junte-se a milhares de empresas que já transformaram seus resultados
          com nossa plataforma CRM.
        </p>

        <Button
          size="lg"
          className="px-12 text-lg py-6 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Acessar Dashboard Agora
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
}
