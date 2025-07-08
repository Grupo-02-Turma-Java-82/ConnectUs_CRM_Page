export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8 px-6">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">
              <img
                src="https://ik.imagekit.io/brunogodoy/logoConnectUS_zMK4zUiI2?updatedAt=1751742289467"
                className="h-6 w-6"
              />
            </span>
          </div>
          <span className="text-xl font-bold text-foreground">ConnectUS</span>
        </div>
        <p className="text-muted-foreground">
          © 2025 ConnectUS. Transformando relacionamentos em resultados.
        </p>
      </div>
    </footer>
  );
}
