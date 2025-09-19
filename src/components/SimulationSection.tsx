import { FormNewProcess } from "./simulation/FormNewProcess";
import { ProcessControls } from "./simulation/ProcessControls";
import { ProcessTable } from "./simulation/ProcessTable";
import { AlgorithmSettings } from "./simulation/AlgorithmSettings";
import { ClockDisplay } from "./simulation/ClockDisplay";
import { TableState } from "./ui/TableState";
import { GanttDiagram } from "./ui/GanttDiagram";
import { useSimulation } from "../context/useSimulation";

export function SimulationSection() {
  const { processes, currentTime } = useSimulation();

  return (
    <section className="w-full p-0">
      <div className="w-full h-14 sticky top-0 z-50 bg-gray-900 text-white flex items-center justify-between px-6 shadow-md">
        <h2 className="text-xl font-bold">
          Simulador de Planificación de Procesos
        </h2>
        <div className="flex items-center gap-4">
          <ProcessControls />
          <ClockDisplay />
        </div>
      </div>

      <div className="flex flex-row justify-between items-stretch gap-6 w-full">
        <div className="w-1/2">
          <FormNewProcess />
        </div>
        <div className="w-1/2">
          <AlgorithmSettings />
        </div>
      </div>

      {processes.length > 0 && (
        <div className="space-y-6">
          <div className="mx-6">
            <ProcessTable />
          </div>

          {currentTime > 0 && (
            <>
              <div className="flex flex-row gap-6 justify-between items-start overflow-x-auto">
                <div className="flex-1 min-w-[200px]">
                  <TableState targetState="Ready" />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <TableState targetState="Executing" />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <TableState targetState="Waiting" />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <TableState targetState="Terminated" />
                </div>
              </div>

              <div className="mx-6">
                <GanttDiagram />
              </div>
            </>
          )}
        </div>
      )}
      {processes.length === 0 && (
        <div className="flex items-center justify-center h-64 mx-6">
          <p className="text-2xl font-semibold text-gray-600 text-center">
            No hay procesos en la simulación.
          </p>
        </div>
      )}
    </section>
  );
}
