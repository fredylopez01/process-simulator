import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useSimulation } from "../context/SimulationContext";

export function GanttDiagram() {
  const { state, currentTime } = useSimulation();
  const [timelineData, setTimelineData] = useState<any[][]>([
    [
      { type: "string", id: "Category" },
      { type: "string", id: "Process" },
      { type: "date", id: "Start" },
      { type: "date", id: "End" },
    ],
  ]);

  // Punto inicial fijo de la simulación
  const simulationStart = new Date(2025, 0, 1, 0, 0, 0);

  useEffect(() => {
    if (!state?.cpuProcess) return;

    // Tiempo de inicio y fin
    const startTime = new Date(simulationStart.getTime() + currentTime * 1000);
    const endTime = new Date(
      simulationStart.getTime() + (currentTime + 1) * 1000
    );

    setTimelineData((prev) => {
      if (prev.length > 1) {
        const lastEntry = prev[prev.length - 1];
        const lastProcess = lastEntry[1];

        // Si es el mismo proceso, extendemos su fin
        if (lastProcess === `P${state?.cpuProcess?.id}`) {
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
      const newEntry = [
        "Process",
        `P${state?.cpuProcess?.id}`,
        startTime,
        endTime,
      ];
      return [...prev, newEntry];
    });
  }, [currentTime, state?.cpuProcess]);

  return (
    <Chart
      chartType="Timeline"
      data={timelineData}
      width="100%"
      height="400px"
    />
  );
}
