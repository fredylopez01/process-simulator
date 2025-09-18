import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useSimulation } from "../../context/useSimulation";
import type { PCB } from "../../simulator/models/PCB";

export function GanttDiagram() {
  const { processes, currentTime } = useSimulation();
  const [cpuProcess, setCpuProcess] = useState<PCB>();
  const [timelineData, setTimelineData] = useState<any[][]>([
    [
      { type: "string", id: "Category" },
      { type: "string", id: "Process" },
      { type: "date", id: "Start" },
      { type: "date", id: "End" },
    ],
  ]);

  const getCpuProcess = () => {
    const result = processes.filter((process) => process.state === "Executing");
    setCpuProcess(result[0]);
  };

  // Punto inicial fijo de la simulación
  const simulationStart = new Date(2025, 0, 1, 0, 0, 0);

  useEffect(() => {
    getCpuProcess();
    if (!cpuProcess) return;

    // Tiempo de inicio y fin
    const startTime = new Date(simulationStart.getTime() + currentTime * 1000);
    const endTime = new Date(simulationStart.getTime() + currentTime * 1000);

    setTimelineData((prev) => {
      if (prev.length > 1) {
        const lastEntry = prev[prev.length - 1];
        const lastProcess = lastEntry[1];

        // Si es el mismo proceso, extendemos su fin
        if (lastProcess === `P${cpuProcess!.id}`) {
          const updatedEntry = [
            lastEntry[0], // "Process"
            lastEntry[1], // nombre del proceso
            lastEntry[2], // start original
            endTime, // extendemos el fin
          ];

          return [...prev.slice(0, -1), updatedEntry];
        }
      }

      // Si es un proceso nuevo, agregamos normalmente
      const newEntry = ["Process", `P${cpuProcess!.id}`, startTime, endTime];
      return [...prev, newEntry];
    });
  }, [currentTime, cpuProcess]);

  return (
    <>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Diagrama de Gantt
      </h3>
      <Chart
        chartType="Timeline"
        data={timelineData}
        width="100%"
        height="100px"
      />
    </>
  );
}
