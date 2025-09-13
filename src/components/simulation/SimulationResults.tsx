import { useSimulation } from "../../context/useSimulation";

export function SimulationResults() {
  const { finalProcesses, processes } = useSimulation();

  const avgTurnaround = (
    finalProcesses.reduce((acc, p) => acc + p.turnaroundTime, 0) /
    finalProcesses.length
  ).toFixed(2);
  const avgWaiting = (
    finalProcesses.reduce((acc, p) => acc + p.waitingTime, 0) /
    finalProcesses.length
  ).toFixed(2);
  

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Resultados de la Simulación</h3>
      <div>
        Procesos finalizados: {finalProcesses.length} / {processes.length}
      </div>
      <div>Promedio Turnaround: {avgTurnaround}</div>
      <div>Promedio Waiting: {avgWaiting}</div>

      <div>Desviacion estandar de </div>
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
          {finalProcesses.map((p) => (
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
}
