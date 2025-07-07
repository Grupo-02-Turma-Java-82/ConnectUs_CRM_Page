import type { ReactNode } from "react";

interface FeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm bg-card border-border hover:bg-card/80 transition-all duration-300 hover:scale-105">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold leading-none tracking-tight text-card-foreground">
          {title}
        </h3>
      </div>
      <div className="p-6 pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
