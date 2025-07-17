import { useState } from "react";
import { OportunitiesDataTable } from "@/components/OportunitiesDatable";
import { useOportunities } from "@/hooks/useOportunities";
import { PlusIcon, SpinnerIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { FormOpportunities } from "@/components/FormOpportunities";

export function Oportunities() {
  const { Oportunities, isLoading, deleteOportunities } = useOportunities();
  const [isForm, setIsForm] = useState(false);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          Oportunidades
        </h1>
        <Button className="cursor-pointer" onClick={() => setIsForm(!isForm)}>
          {!isForm && <PlusIcon />}
          {isForm ? <p>Listar Opotunidades</p> : <p> Adicionar Opotunidade</p>}
        </Button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <SpinnerIcon className="text-white animate-spin" size={54} />
        </div>
      ) : (
        <>
          {isForm ? (
            <FormOpportunities isEditMode={false} />
          ) : (
            <OportunitiesDataTable
              oportunities={Oportunities}
              deleteOportunities={deleteOportunities}
            />
          )}
        </>
      )}
    </div>
  );
}
