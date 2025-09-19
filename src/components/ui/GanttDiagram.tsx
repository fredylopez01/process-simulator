import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useSimulation } from "../../context/useSimulation";
import type { PCB } from "../../simulator/models/PCB";

// Tipos para el header y las filas
type TimelineHeader = [
  { type: "string"; id: "Category" },
  { type: "string"; id: "Process" },
  { type: "date"; id: "Start" },
  { type: "date"; id: "End" }
];

type TimelineRow = [string, string, Date, Date];

export function GanttDiagram() {
  const { processes, currentTime } = useSimulation();
  const [cpuProcess, setCpuProcess] = useState<PCB>();
  const [timelineData, setTimelineData] = useState<(TimelineHeader | TimelineRow)[]>([
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

    const startTime = new Date(simulationStart.getTime() + currentTime * 1000);
    const endTime = new Date(simulationStart.getTime() + currentTime * 1000);

    setTimelineData((prev) => {
      if (prev.length > 1) {
        const lastEntry = prev[prev.length - 1] as TimelineRow;
        const lastProcess = lastEntry[1];

        if (lastProcess === `P${cpuProcess.id}`) {
          const updatedEntry: TimelineRow = [
            lastEntry[0],
            lastEntry[1],
            lastEntry[2],
            endTime,
          ];
          return [...prev.slice(0, -1), updatedEntry];
        }
      }

      const newEntry: TimelineRow = ["Process", `P${cpuProcess.id}`, startTime, endTime];
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
        height="120px"
      />
    </>
  );
}
