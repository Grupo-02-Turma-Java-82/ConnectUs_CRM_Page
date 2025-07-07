import { use } from "react";
import { OportunitiesContext } from "@/contexts/OportunitiesContext";

export function useOportunities() {
  const context = use(OportunitiesContext);

  return context;
}
