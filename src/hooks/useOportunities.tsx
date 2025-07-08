import { use } from "react";
import { OportunitiesContext } from "@/contexts/OportinitiesContext";

export function useOportunities() {
  const context = use(OportunitiesContext);

  return context;
}
