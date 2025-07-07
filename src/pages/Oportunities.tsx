import OportunitiesDataTable from "@/components/OportunitiesDatatable";
import { useOportunities } from "@/hooks/useOportunites";
import { SpinnerIcon } from "@phosphor-icons/react";

export function Oportunities() {
  const { Oportunities, isLoading, deleteOportunities } = useOportunities();

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-foreground mb-6">Oportunidades</h1>
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <SpinnerIcon className="text-white animate-spin" size={54} />
        </div>
      ) : (
        <OportunitiesDataTable
          oportunities={Oportunities}
          deleteOportunities={deleteOportunities}
        />
      )}
    </div>
  );
}
