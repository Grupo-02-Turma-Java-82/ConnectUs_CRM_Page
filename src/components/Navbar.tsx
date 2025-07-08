import { Link } from "react-router";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
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

        <Button>
          <Link to="/dashboard">Acessar Dashboard</Link>

          <ArrowRight size={24} />
        </Button>
      </div>
    </header>
  );
}
