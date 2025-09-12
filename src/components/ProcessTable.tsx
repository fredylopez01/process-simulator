import { useSimulation } from "../context/SimulationContext";

export function ProcessTable() {
  const { processes } = useSimulation();
  return (
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
  );
}
