import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useSimulation } from "../../context/useSimulation";

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
  const [timelineData, setTimelineData] = useState<(TimelineHeader | TimelineRow)[]>([
    [
      { type: "string", id: "Category" },
      { type: "string", id: "Process" },
      { type: "date", id: "Start" },
      { type: "date", id: "End" },
    ],
  ]);
  const [processedIds, setProcessedIds] = useState<Set<number>>(new Set());
  const [processStartTimes, setProcessStartTimes] = useState<Map<number, number>>(new Map());
  const [lastExecutingProcessId, setLastExecutingProcessId] = useState<number | null>(null);

  // Punto inicial fijo de la simulación
  const simulationStart = new Date(2025, 0, 1, 0, 0, 0);

  useEffect(() => {
    console.log(`=== GANTT at t=${currentTime} ===`);
    console.log("Processes:", processes.map(p => `P${p.id}: ${p.state} (completion: ${p.completionTime})`));
    
    const executingProcess = processes.find(p => p.state === "Executing");
    const currentExecutingId = executingProcess?.id ?? null;
    
    console.log("Currently executing:", currentExecutingId);
    console.log("Last executing:", lastExecutingProcessId);
    
    // DETECTAR CAMBIO DE PROCESO EJECUTÁNDOSE
    if (lastExecutingProcessId !== currentExecutingId) {
      console.log(`Process change detected: ${lastExecutingProcessId} -> ${currentExecutingId}`);
      
      // Si había un proceso ejecutándose antes y ahora cambió, "cerrar" el anterior
      if (lastExecutingProcessId !== null) {
        const endTime = currentTime;
        console.log(`Closing process P${lastExecutingProcessId} at t=${endTime}`);
        
        setTimelineData((prev) => {
          const existingIndex = prev.findIndex((entry, index) => 
            index > 0 && (entry as TimelineRow)[1] === `P${lastExecutingProcessId}`
          );
          
          if (existingIndex !== -1) {
            const existingEntry = prev[existingIndex] as TimelineRow;
            const updatedEntry: TimelineRow = [
              existingEntry[0],
              existingEntry[1],
              existingEntry[2], // Mantener inicio
              new Date(simulationStart.getTime() + endTime * 1000), // Cerrar en currentTime
            ];
            const newPrev = [...prev];
            newPrev[existingIndex] = updatedEntry;
            console.log(`Closed P${lastExecutingProcessId} ending at t=${endTime}`);
            return newPrev;
          }
          return prev;
        });
      }
      
      // Actualizar el proceso que está ejecutándose
      setLastExecutingProcessId(currentExecutingId);
    }
    
    // PROCESAR PROCESO EJECUTÁNDOSE ACTUAL
    if (executingProcess) {
      // Registrar cuando empezó si es la primera vez
      if (!processStartTimes.has(executingProcess.id)) {
        setProcessStartTimes(prev => new Map(prev).set(executingProcess.id, currentTime));
        console.log(`P${executingProcess.id} started executing at t=${currentTime}`);
        
        // Crear nueva entrada para el proceso que empieza
        const startTimeMs = simulationStart.getTime() + currentTime * 1000;
        const endTimeMs = simulationStart.getTime() + (currentTime + 1) * 1000;
        
        setTimelineData((prev) => {
          const newEntry: TimelineRow = [
            "Process", 
            `P${executingProcess.id}`, 
            new Date(startTimeMs),
            new Date(endTimeMs)
          ];
          
          console.log(`Adding new P${executingProcess.id} from t=${currentTime} to t=${currentTime + 1}`);
          return [...prev, newEntry];
        });
      } else {
        // Extender el proceso que ya está ejecutándose (solo si es el mismo que antes)
        if (lastExecutingProcessId === executingProcess.id) {
          const endTimeMs = simulationStart.getTime() + (currentTime + 1) * 1000;
          
          setTimelineData((prev) => {
            const existingIndex = prev.findIndex((entry, index) => 
              index > 0 && (entry as TimelineRow)[1] === `P${executingProcess.id}`
            );

            if (existingIndex !== -1) {
              const existingEntry = prev[existingIndex] as TimelineRow;
              const updatedEntry: TimelineRow = [
                existingEntry[0],
                existingEntry[1],
                existingEntry[2], // Mantener inicio
                new Date(endTimeMs), // Extender fin
              ];
              const newPrev = [...prev];
              newPrev[existingIndex] = updatedEntry;
              console.log(`Extending P${executingProcess.id} to t=${currentTime + 1}`);
              return newPrev;
            }
            return prev;
          });
        }
      }
    }
    
    // PROCESAR PROCESOS TERMINADOS
    const newTerminatedProcesses = processes.filter(p => 
      p.state === "Terminated" && 
      !processedIds.has(p.id)
    );
    
    newTerminatedProcesses.forEach(terminatedProcess => {
      setProcessedIds(prev => new Set([...prev, terminatedProcess.id]));
      console.log(`Processing terminated P${terminatedProcess.id}`);
      
      // Si es un proceso que nunca vimos ejecutándose (burst time = 1), agregarlo
      if (!processStartTimes.has(terminatedProcess.id)) {
        const realStartTime = Math.max(0, terminatedProcess.completionTime - terminatedProcess.burstTime);
        const startTimeMs = simulationStart.getTime() + realStartTime * 1000;
        const endTimeMs = simulationStart.getTime() + terminatedProcess.completionTime * 1000;
        
        setTimelineData((prev) => {
          const newEntry: TimelineRow = [
            "Process", 
            `P${terminatedProcess.id}`, 
            new Date(startTimeMs),
            new Date(endTimeMs)
          ];
          
          console.log(`Adding terminated P${terminatedProcess.id} from t=${realStartTime} to t=${terminatedProcess.completionTime}`);
          return [...prev, newEntry];
        });
      }
    });

  }, [currentTime, processes, processStartTimes, lastExecutingProcessId]);

  // Reset cuando la simulación se reinicia
  useEffect(() => {
    if (currentTime === 0 && processes.length === 0) {
      console.log("Resetting timeline");
      setTimelineData([
        [
          { type: "string", id: "Category" },
          { type: "string", id: "Process" },
          { type: "date", id: "Start" },
          { type: "date", id: "End" },
        ],
      ]);
      setProcessedIds(new Set());
      setProcessStartTimes(new Map());
      setLastExecutingProcessId(null);
    }
  }, [currentTime, processes]);

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