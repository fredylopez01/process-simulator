import { FormNewProcess } from "./simulation/FormNewProcess";
import { ProcessControls } from "./simulation/ProcessControls";
import { ProcessTable } from "./simulation/ProcessTable";
import { AlgorithmSettings } from "./simulation/AlgorithmSettings";
import { ClockDisplay } from "./simulation/ClockDisplay";
import { TableState } from "./ui/TableState";

export function SimulationSection() {
  return (
    <section className="max-w-6xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Simulador de Planificación de Procesos
        </h2>
        <ProcessControls />
        <ClockDisplay />
      </div>


      

      <div className="space-y-6">
        <FormNewProcess />
        <AlgorithmSettings />
        <ProcessTable />

        <div className="flex flex-row gap-6 justify-between items-start overflow-x-auto">
          <div className="flex-1 min-w-[200px]">
            <TableState targetState="Ready" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <TableState targetState="Executing" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <TableState targetState="Terminated" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <TableState targetState="Waiting" />
          </div>
        </div>
      </div>
    </section>
  );
}
