import React from "react";
import type { PCB } from "../simulator/models/PCB";

interface SimulationResultsProps {
  processes: PCB[];
}

export const SimulationResults: React.FC<SimulationResultsProps> = ({
  processes,
}) => {
  if (!processes.length) return null;

  // Filtrar solo los procesos terminados
  const finished = processes.filter((p) => p.completionTime > 0);
  if (!finished.length) return null;

  const avgTurnaround = (
    finished.reduce((acc, p) => acc + p.turnaroundTime, 0) / finished.length
  ).toFixed(2);
  const avgWaiting = (
    finished.reduce((acc, p) => acc + p.waitingTime, 0) / finished.length
  ).toFixed(2);

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Resultados de la Simulación</h3>
      <div>
        Procesos finalizados: {finished.length} / {processes.length}
      </div>
      <div>Promedio Turnaround: {avgTurnaround}</div>
      <div>Promedio Waiting: {avgWaiting}</div>
      <table border={1} style={{ width: "100%", marginTop: 10 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Arrival</th>
            <th>Burst</th>
            <th>Completion</th>
            <th>Turnaround</th>
            <th>Waiting</th>
          </tr>
        </thead>
        <tbody>
          {finished.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.arrivalTime}</td>
              <td>{p.burstTime}</td>
              <td>{p.completionTime}</td>
              <td>{p.turnaroundTime}</td>
              <td>{p.waitingTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
