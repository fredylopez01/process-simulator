import { useState } from "react";
import { ProcessControls } from "./simulation/ProcessControls";
import { ClockDisplay } from "./simulation/ClockDisplay";
import { GanttDiagram } from "./ui/GanttDiagram";
import { useSimulation } from "../context/useSimulation";
import { StatsModal } from "./ui/StatsModal";
import { FormNewProcess } from "./simulation/FormNewProcess";
import { AlgorithmSettings } from "./simulation/AlgorithmSettings";
import { ProcessTable } from "./simulation/ProcessTable";
import { QueueVisualization } from "./ui/QueueVisualization";
import { ProcessTurnVisualization } from "./ui/ProcessTurnVisualization";

export function SimulationSection() {
  const { processes, currentTime, running } = useSimulation();
  const [showStats, setShowStats] = useState(false);

  return (
    <div className=" flex flex-col bg-gray-50">
      {/* Header fijo */}
      <div className="h-14 sticky top-0 z-50 bg-gray-900 text-white flex items-center justify-between px-6 shadow-md flex-shrink-0">
        <h2 className="text-xl font-bold">Process Manager Simulator</h2>
        <div className="flex items-center gap-4">
          <ProcessControls />
          <ClockDisplay />
          <button
            onClick={() => setShowStats(true)}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 cursor-pointer transition"
          >
            Statistics
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-h-0 p-4 gap-4">
        {/* Controles superiores - altura fija */}
        <div className="flex gap-4 flex-shrink-0" style={{ height: "120px" }}>
          <div className="flex-1">
            <FormNewProcess />
          </div>
          <div className="flex-1">
            <AlgorithmSettings />
          </div>
        </div>

        {processes.length > 0 ? (
          /* Contenido de simulación */
          <div className="flex-1 flex flex-col min-h-0 gap-4">
            {/* Tabla de procesos con scroll interno */}
            <div className="flex-1 min-h-0">
              <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
                <h3 className="text-lg font-semibold text-gray-700 p-2 border-b flex-shrink-0">
                  Processes
                </h3>
                <div className="flex-1 overflow-auto">
                  <ProcessTable />
                </div>
              </div>
            </div>

            {/* Gantt Diagram - altura fija */}
            {(currentTime > 0 || running) && (
              <div className="flex-shrink-0">
                <div className="bg-white rounded-lg shadow-sm p-2 h-full">
                  <GanttDiagram />
                </div>

                {/* Colas de Planificación */}
                <div className="flex-shrink-0">
                  <QueueVisualization />
                </div>
                {/* Turno de Procesos */}
                <div className="flex-shrink-0">
                  <ProcessTurnVisualization />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Estado vacío */
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="text-6xl text-gray-300 mb-4">⚙️</div>
              <p className="text-xl font-semibold text-gray-600">
                There are no processes in the simulation
              </p>
              <p className="text-gray-500 mt-2">Add a process to start</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal de estadísticas */}
      <StatsModal isOpen={showStats} onClose={() => setShowStats(false)} />
    </div>
  );
}
