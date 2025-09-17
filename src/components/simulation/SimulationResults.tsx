import { useSimulation } from "../../context/useSimulation";

export function SimulationResults() {
  const { processes } = useSimulation();

  const avgTurnaround = (
    processes.reduce((acc, p) => acc + p.turnaroundTime, 0) /
    processes.length
  ).toFixed(2);
  const avgWaiting = (
    processes.reduce((acc, p) => acc + p.waitingTime, 0) /
    processes.length
  ).toFixed(2);
  

  return (
    <div>
      <h3>Resultados de la Simulación</h3>
      <div>
        Procesos finalizados: {processes.filter(p => p.state === "Terminated").length} / {processes.length}
      </div>
      <div>Promedio Turnaround: {avgTurnaround}</div>
      <div>Promedio Waiting: {avgWaiting}</div>

      <div>Desviacion estandar de </div>
      <table>
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
          {processes.map((p) => (
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
