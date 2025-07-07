export function GoDashboard() {
  return (
    <section className="py-20 px-6 bg-primary/5">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-foreground mb-6">
          Pronto para Revolucionar Suas Vendas?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Junte-se a milhares de empresas que já transformaram seus resultados com nossa plataforma CRM.
        </p>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-11 rounded-md bg-primary hover:bg-primary/90 text-lg px-12 py-6">
          Acessar Dashboard Agora
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
            className="lucide lucide-arrow-right ml-2 h-5 w-5">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </section>
  )
}
