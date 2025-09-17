import { useSimulation } from "../context/SimulationContext";
import type { PCB } from "../simulator/models/PCB";

export function ProcessUpdatingTable() {
  const { state } = useSimulation();

  // Combinar todos los procesos en una sola lista
  const allProcesses: PCB[] = [
    ...(state?.createdQueue?.map((p) => ({ ...p, status: "Creado" })) || []),
    ...(state?.readyQueue?.map((p) => ({ ...p, status: "Ready" })) || []),
    ...(state?.waitingQueue?.map((p) => ({ ...p, status: "Waiting" })) || []),
    ...(state?.terminatedQueue?.map((p) => ({ ...p, status: "Terminated" })) ||
      []),
    ...(state?.cpuProcess
      ? [{ ...state.cpuProcess, status: "Executing" }]
      : []),
  ];

  // Usar un diccionario para quedarnos con el último estado de cada proceso
  const processesById = allProcesses.reduce<Record<number, PCB>>(
    (acc, proc) => {
      acc[proc.id] = proc;
      return acc;
    },
    {}
  );

  // Convertir a array y ordenar por id
  const processes: PCB[] = Object.values(processesById).sort(
    (a, b) => a.id - b.id
  );

  return (
    <>
      <h1>Procesos</h1>
      <table border={1} style={{ width: "100%", marginTop: 10 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Arrival</th>
            <th>Burst</th>
            <th>Remaining</th>
            <th>State</th>
            <th>Priority</th>
            <th>Completion</th>
            <th>Turnaround</th>
            <th>Waiting</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.arrivalTime}</td>
              <td>{p.burstTime}</td>
              <td>{p.remainingTime}</td>
              <td>{p.state}</td>
              <td>{p.priority}</td>
              <td>{p.completionTime}</td>
              <td>{p.turnaroundTime}</td>
              <td>{p.waitingTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
